<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Enums\Usuarios\TipoActividad;
use App\Mail\Usuarios\CorreoCambiadoMail;
use App\Models\User;
use App\Models\Usuarios\Activacion;
use Illuminate\Support\Facades\Mail;

/**
 * Edición de datos (`PATCH /usuarios/{id}`, docs/fases/fase-1-usuarios.md §4.2):
 * solo lo enviado, 422 de baja y del propio correo, y el cambio de correo
 * (revoca sus sesiones, avisa al anterior en `emails` e invalida la activación
 * de una cuenta pendiente).
 */
beforeEach(function () {
    Mail::fake();
});

describe('caso feliz', function () {
    test('guarda solo lo enviado y lo registra en la bitácora', function () {
        $admin = usuarioCon(Role::Admin);
        $user = User::factory()->create(['name' => 'Ana', 'telefono' => '0412-1234567', 'direccion' => 'Calle 1']);

        comoUsuario($admin)
            ->patchJson(route('usuarios.usuarios.update', $user->id), ['name' => 'Ana María', 'sexo' => 'F', 'telefono' => '0414 765 43 21'])
            ->assertOk()
            ->assertJsonPath('status', 200)
            ->assertJsonPath('msg', 'Datos actualizados')
            ->assertJsonPath('data.name', 'Ana María')
            ->assertJsonPath('data.sexo', 'F')
            ->assertJsonPath('data.telefono', '0414-7654321')
            ->assertJsonPath('data.direccion', 'Calle 1');

        $evento = $user->actividades()->sole();
        expect($evento->tipo)->toBe(TipoActividad::DatosActualizados)
            ->and($evento->actor_id)->toBe($admin->id)
            ->and($evento->meta['campos'])->toEqualCanonicalizing(['name', 'sexo', 'telefono']);
        Mail::assertNothingQueued();
    });

    test('sin cambios no escribe nada', function () {
        $user = User::factory()->create(['name' => 'Ana']);

        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', $user->id), ['name' => 'Ana'])
            ->assertOk();

        expect($user->actividades()->count())->toBe(0);
    });

    test('puede vaciar los campos opcionales', function () {
        $user = User::factory()->create(['telefono' => '0412-1234567', 'sexo' => 'M']);

        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', $user->id), ['telefono' => null, 'sexo' => null, 'direccion' => null])
            ->assertOk()
            ->assertJsonPath('data.telefono', null)
            ->assertJsonPath('data.sexo', null);
    });

    test('uno mismo puede editar sus datos salvo el correo', function () {
        $admin = usuarioCon(Role::Admin);

        comoUsuario($admin)->patchJson(route('usuarios.usuarios.update', $admin->id), ['name' => 'Yo'])->assertOk();
        comoUsuario($admin)
            ->patchJson(route('usuarios.usuarios.update', $admin->id), ['name' => 'Otro', 'email' => 'nuevo@example.com'])
            ->assertUnprocessable()
            ->assertExactJson(['status' => 422, 'msg' => 'Tu propio correo se cambia desde tu cuenta']);

        expect($admin->fresh()->name)->toBe('Yo');
    });

    test('una suspendida se puede editar', function () {
        $user = User::factory()->suspendido()->create();

        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', $user->id), ['name' => 'Nuevo'])
            ->assertOk();
    });
});

describe('cambio de correo', function () {
    test('revoca sus sesiones, avisa al correo anterior y queda en la bitácora', function () {
        $admin = usuarioCon(Role::Admin);
        $user = User::factory()->create(['email' => 'ana@example.com', 'name' => 'Ana']);
        tokenDefinitivo($user);
        tokenTemporal($user);

        comoUsuario($admin)
            ->patchJson(route('usuarios.usuarios.update', $user->id), ['email' => 'ana.nueva@example.com'])
            ->assertOk()
            ->assertJsonPath('data.email', 'ana.nueva@example.com');

        expect($user->tokens()->count())->toBe(0);

        $evento = $user->actividades()->sole();
        expect($evento->tipo)->toBe(TipoActividad::CorreoCambiado)
            ->and($evento->actor_id)->toBe($admin->id)
            ->and($evento->meta)->toMatchArray(['anterior' => 'a***@example.com', 'nuevo' => 'ana.nueva@example.com', 'tokens' => 2]);

        Mail::assertQueued(CorreoCambiadoMail::class, fn (CorreoCambiadoMail $mail) => $mail->hasTo('ana@example.com')
            && ! $mail->hasTo('ana.nueva@example.com')
            && $mail->nuevo === 'a***@example.com'
            && $mail->name === 'Ana');
    });

    test('con otros datos escribe las dos entradas', function () {
        $user = User::factory()->create();

        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', $user->id), ['name' => 'Nuevo', 'email' => 'otro@example.com'])
            ->assertOk();

        expect($user->actividades()->orderBy('id')->pluck('tipo')->all())
            ->toBe([TipoActividad::DatosActualizados, TipoActividad::CorreoCambiado]);
    });

    test('en una cuenta pendiente invalida su enlace de activación', function () {
        $activacion = Activacion::factory()->create();

        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', $activacion->user_id), ['email' => 'otro@example.com'])
            ->assertOk();

        expect(Activacion::count())->toBe(0);
    });

    test('el correo se renderiza en español sin el correo nuevo completo', function () {
        $mail = new CorreoCambiadoMail('Ana', 'a***@example.com');

        $mail->assertHasSubject('El correo de tu cuenta ha cambiado');
        $mail->assertSeeInText('a***@example.com');
        $mail->assertSeeInText('Se cerraron todas tus sesiones abiertas');
    });
});

describe('autorización y reglas', function () {
    test('sin usuarios.usuario.update es 403', function () {
        $user = User::factory()->create();

        comoUsuario(usuarioCon(Permission::UsuariosUsuarioShow, Permission::UsuariosUsuarioCreate))
            ->patchJson(route('usuarios.usuarios.update', $user->id), ['name' => 'X'])
            ->assertForbidden();
    });

    test('404 si no existe', function () {
        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', 999999), ['name' => 'X'])
            ->assertNotFound()
            ->assertExactJson(['status' => 404, 'msg' => 'La persona no existe']);
    });

    test('un no-owner no edita a un owner (403 antes de validar)', function () {
        $owner = usuarioCon(Role::Owner);

        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', $owner->id), ['email' => 'no-es-correo'])
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'Solo un owner puede gestionar a otro owner']);
    });

    test('un owner edita a otro owner', function () {
        $owner = usuarioCon(Role::Owner);

        comoUsuario(usuarioCon(Role::Owner))
            ->patchJson(route('usuarios.usuarios.update', $owner->id), ['name' => 'Otro owner'])
            ->assertOk();
    });

    test('422 si está de baja', function () {
        $user = User::factory()->deBaja()->create();

        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', $user->id), ['name' => 'X'])
            ->assertUnprocessable()
            ->assertExactJson(['status' => 422, 'msg' => 'La cuenta está dada de baja: restáurala antes de editarla']);
    });

    test('cédula y correo únicos frente a otras personas, no frente a sí misma', function () {
        $otra = User::factory()->deBaja()->create(['username' => '20111222', 'email' => 'otra@example.com']);
        $user = User::factory()->create(['username' => '20333444', 'email' => 'ana@example.com']);

        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', $user->id), ['username' => $otra->username, 'email' => $otra->email])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['username', 'email']);

        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', $user->id), ['username' => '20333444', 'email' => 'ana@example.com'])
            ->assertOk();
    });

    test('la cédula se exige según los roles que ya tiene', function () {
        $representante = usuarioCon(Role::Representante);
        $admin = usuarioCon(Role::Admin);

        comoUsuario(usuarioCon(Role::Owner))
            ->patchJson(route('usuarios.usuarios.update', $representante->id), ['username' => 'ana.perez'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['username']);

        comoUsuario(usuarioCon(Role::Owner))
            ->patchJson(route('usuarios.usuarios.update', $representante->id), ['username' => 'V-9.876.543'])
            ->assertOk()
            ->assertJsonPath('data.username', '9876543');

        comoUsuario(usuarioCon(Role::Owner))
            ->patchJson(route('usuarios.usuarios.update', $admin->id), ['username' => 'ana.perez'])
            ->assertOk();
    });

    test('lo enviado no puede venir vacío', function (string $campo) {
        $user = User::factory()->create();

        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', $user->id), [$campo => ''])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([$campo]);
    })->with(['name', 'username', 'email']);

    test('no toca columnas de estado aunque se envíen', function () {
        $user = User::factory()->pendiente()->create();

        comoUsuario(usuarioCon(Role::Admin))
            ->patchJson(route('usuarios.usuarios.update', $user->id), ['activated_at' => now()->toJSON(), 'suspended_at' => now()->toJSON(), 'password' => 'x'])
            ->assertOk();

        $user->refresh();
        expect($user->activated_at)->toBeNull()
            ->and($user->suspended_at)->toBeNull();
    });
});
