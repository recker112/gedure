<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Enums\Usuarios\EstadoCuenta;
use App\Enums\Usuarios\TipoActividad;
use App\Mail\Usuarios\ActivacionCuentaMail;
use App\Models\User;
use App\Models\Usuarios\Activacion;
use Illuminate\Mail\MailManager;
use Illuminate\Mail\SendQueuedMailable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;

/**
 * Alta de personas (`POST /usuarios`, docs/fases/fase-1-usuarios.md §4.2): cuenta
 * pendiente con contraseña aleatoria, roles y permisos con `GrantGuard`, owner
 * solo por owner, cédula para profesores y representantes, y el enlace de
 * activación en la cola `high` si se pide.
 *
 * Orden: middleware 403 → Policy 403 (owner) → `rules()` 422 → `GrantGuard` 403.
 */
beforeEach(function () {
    Mail::fake();
});

/** Cuerpo válido de un alta, con `$cambios` encima. */
function cuerpoAlta(array $cambios = []): array
{
    return [
        'name' => 'Ana Pérez',
        'username' => '20123456',
        'email' => 'ana@example.com',
        'telefono' => '0412-1234567',
        'direccion' => 'Calle 1, Barquisimeto',
        'sexo' => 'F',
        'roles' => ['representante'],
        'enviar_activacion' => false,
        ...$cambios,
    ];
}

describe('caso feliz', function () {
    test('crea una cuenta pendiente con sus datos, roles y permisos directos', function () {
        $admin = usuarioCon(Role::Admin);

        $respuesta = comoUsuario($admin)
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta([
                'roles' => ['profesor'],
                'permissions' => ['usuarios.estudiante.show'],
            ]))
            ->assertCreated()
            ->assertJsonPath('status', 201)
            ->assertJsonPath('msg', 'Usuario creado')
            ->assertJsonPath('data.username', '20123456')
            ->assertJsonPath('data.estado', 'pendiente')
            ->assertJsonPath('data.roles', ['profesor'])
            ->assertJsonPath('data.direct_permissions', ['usuarios.estudiante.show'])
            ->assertJsonPath('data.telefono', '0412-1234567')
            ->assertJsonPath('data.sexo', 'F')
            ->assertJsonPath('data.activated_at', null);

        $user = User::findOrFail($respuesta->json('data.id'));
        expect($user->estado())->toBe(EstadoCuenta::Pendiente)
            ->and($user->email_verified_at)->toBeNull()
            ->and(Hash::check('password', $user->password))->toBeFalse()
            ->and($user->activacion)->toBeNull();

        $evento = $user->actividades()->sole();
        expect($evento->tipo)->toBe(TipoActividad::CuentaCreada)
            ->and($evento->actor_id)->toBe($admin->id);

        Mail::assertNothingQueued();
    });

    test('con enviar_activacion envía el enlace y lo registra en la bitácora', function () {
        $admin = usuarioCon(Role::Admin);

        $respuesta = comoUsuario($admin)
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta(['enviar_activacion' => true]))
            ->assertCreated()
            ->assertJsonPath('msg', 'Usuario creado. Le enviamos el enlace de activación a su correo');

        $user = User::findOrFail($respuesta->json('data.id'));
        $activacion = $user->activacion;
        expect($activacion)->not->toBeNull()
            ->and($activacion->enviada_por)->toBe($admin->id)
            ->and($activacion->used_at)->toBeNull()
            ->and($activacion->expires_at->diffInDays($activacion->sent_at, true))->toEqual(7);

        expect($user->actividades()->orderBy('id')->pluck('tipo')->all())
            ->toBe([TipoActividad::CuentaCreada, TipoActividad::ActivacionEnviada]);

        Mail::assertQueued(ActivacionCuentaMail::class, function (ActivacionCuentaMail $mail) use ($activacion, $admin) {
            $token = str($mail->url)->afterLast('/')->value();

            return $mail->hasTo('ana@example.com')
                && $mail->url === rtrim(config('app.frontend_url'), '/').'/auth/activar/'.$token
                && Activacion::hash($token) === $activacion->fresh()->getAttributes()['token_hash']
                && $mail->enviadaPor === $admin->name
                && $mail->username === '20123456'
                && $mail->caduca === 'dentro de 7 días';
        });
    });

    test('el enlace de activación va a la cola high', function () {
        // Sin el Mail::fake() del beforeEach: el correo debe llegar a la cola
        Mail::swap(new MailManager(app()));
        Queue::fake();

        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta(['enviar_activacion' => true]))
            ->assertCreated();

        Queue::assertPushedOn('high', SendQueuedMailable::class, fn ($job) => $job->mailable instanceof ActivacionCuentaMail);
    });

    test('el correo usa FRONTEND_URL para el enlace', function () {
        config(['app.frontend_url' => 'https://gedure.example/']);

        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta(['enviar_activacion' => true]))
            ->assertCreated();

        Mail::assertQueued(ActivacionCuentaMail::class, fn ($mail) => str_starts_with($mail->url, 'https://gedure.example/auth/activar/')
            && preg_match('/\/[A-Za-z0-9]{64}$/', $mail->url) === 1);
    });

    test('el correo de activación se renderiza en español con el enlace', function () {
        $mail = new ActivacionCuentaMail('https://gedure.example/auth/activar/abc', 'Ana Pérez', '20123456', 'Luis', 'dentro de 7 días');

        $mail->assertHasSubject('Activa tu cuenta de Gedure');
        $mail->assertSeeInHtml('https://gedure.example/auth/activar/abc');
        $mail->assertSeeInHtml('Activar mi cuenta');
        $mail->assertSeeInText('Luis, de la administración de la U.E.P. La Candelaria, creó tu cuenta');
        $mail->assertSeeInText('dentro de 7 días');
        $mail->assertDontSeeInText('contraseña:');
    });

    test('normaliza la cédula y el teléfono escritos a mano', function () {
        $respuesta = comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta(['username' => 'V-20.123.456', 'telefono' => '+58 412 123 45 67']))
            ->assertCreated();

        expect($respuesta->json('data.username'))->toBe('20123456')
            ->and($respuesta->json('data.telefono'))->toBe('0412-1234567');
    });

    test('sin roles ni datos opcionales también se crea', function () {
        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.store'), [
                'name' => 'Directora',
                'username' => 'direccion',
                'email' => 'direccion@example.com',
                'roles' => [],
                'enviar_activacion' => false,
            ])
            ->assertCreated()
            ->assertJsonPath('data.roles', [])
            ->assertJsonPath('data.telefono', null);
    });

    test('un owner puede crear otro owner', function () {
        comoUsuario(usuarioCon(Role::Owner))
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta(['username' => 'dueno', 'roles' => ['owner']]))
            ->assertCreated()
            ->assertJsonPath('data.roles', ['owner']);
    });
});

describe('autorización', function () {
    test('sin usuarios.usuario.create es 403', function () {
        comoUsuario(usuarioCon(Permission::UsuariosUsuarioShow, Permission::UsuariosUsuarioUpdate))
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta())
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'No tienes permiso para realizar esta acción']);

        expect(User::count())->toBe(1);
    });

    test('dar owner sin ser owner es 403 antes de validar', function () {
        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.store'), ['roles' => ['owner']])
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'Solo un owner puede dar o quitar el rol de owner']);
    });

    test('GrantGuard: no puede conceder roles cuyos permisos no tiene (403 tras validar)', function () {
        // Una "secretaria": puede crear y tiene lo del rol representante, pero no lo de admin
        $secretaria = usuarioCon(Permission::UsuariosUsuarioCreate, Permission::MisEstudiantesEstudianteShow);

        comoUsuario($secretaria)
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta(['roles' => ['admin'], 'username' => 'otro']))
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'No puedes conceder permisos que no tienes']);

        comoUsuario($secretaria)
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta())
            ->assertCreated();

        expect(User::where('username', 'otro')->exists())->toBeFalse();
    });

    test('GrantGuard: tampoco permisos directos que no tiene', function () {
        $secretaria = usuarioCon(Permission::UsuariosUsuarioCreate, Permission::MisEstudiantesEstudianteShow);

        comoUsuario($secretaria)
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta(['permissions' => ['usuarios.usuario.destroy']]))
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'No puedes conceder permisos que no tienes']);

        expect(User::count())->toBe(1);
        Mail::assertNothingQueued();
    });

    test('un error de campo sale antes que el 403 de GrantGuard', function () {
        $secretaria = usuarioCon(Permission::UsuariosUsuarioCreate);

        comoUsuario($secretaria)
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta(['roles' => ['admin'], 'email' => 'no-es-correo']))
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email']);
    });
});

describe('validación', function () {
    test('obligatorios', function () {
        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.store'), [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'username', 'email', 'roles', 'enviar_activacion'])
            ->assertJsonPath('errors.name.0', 'El campo nombre es obligatorio.');
    });

    test('cédula y correo únicos, también frente a las bajas', function () {
        User::factory()->deBaja()->create(['username' => '20123456', 'email' => 'ana@example.com']);

        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta())
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['username', 'email']);
    });

    test('profesores y representantes usan la cédula como usuario', function (string $rol, string $username, bool $valido) {
        $respuesta = comoUsuario(usuarioCon(Role::Owner))
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta(['roles' => [$rol], 'username' => $username]));

        $valido
            ? $respuesta->assertCreated()
            : $respuesta->assertUnprocessable()->assertJsonValidationErrors(['username']);
    })->with([
        'representante con cédula' => ['representante', '12345678', true],
        'profesor extranjero' => ['profesor', 'E84123456', true],
        'representante con usuario' => ['representante', 'ana.perez', false],
        'profesor con letras' => ['profesor', '1234A', false],
        'admin con usuario' => ['admin', 'ana.perez', true],
        'admin con cédula' => ['admin', '12345678', true],
        'admin con @' => ['admin', 'ana@x', false],
        'owner con espacios' => ['owner', 'ana perez', false],
    ]);

    test('mensaje de la cédula en español', function () {
        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta(['username' => 'abc']))
            ->assertJsonPath('errors.username.0', 'El campo usuario o cédula debe ser una cédula: solo dígitos (hasta 10), con E delante si es extranjera.');
    });

    test('formatos de los campos', function (array $cambios, string $campo) {
        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.store'), cuerpoAlta($cambios))
            ->assertUnprocessable()
            ->assertJsonValidationErrors([$campo]);
    })->with([
        'correo' => [['email' => 'no-es-correo'], 'email'],
        'teléfono' => [['telefono' => '12345'], 'telefono'],
        'sexo' => [['sexo' => 'X'], 'sexo'],
        'dirección larga' => [['direccion' => str_repeat('a', 256)], 'direccion'],
        'rol inexistente' => [['roles' => ['director']], 'roles.0'],
        'rol repetido' => [['roles' => ['representante', 'representante']], 'roles.0'],
        'roles no lista' => [['roles' => 'representante'], 'roles'],
        'permiso inexistente' => [['permissions' => ['usuarios.todo']], 'permissions.0'],
        'enviar_activacion no booleano' => [['enviar_activacion' => 'quizá'], 'enviar_activacion'],
    ]);
});
