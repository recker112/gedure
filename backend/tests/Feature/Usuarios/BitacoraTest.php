<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Enums\Usuarios\TipoActividad;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use App\Models\Usuarios\Actividad;
use App\Services\Usuarios\Bitacora;
use Illuminate\Support\Facades\Mail;

/**
 * Bitácora de cada persona (`actividades`, docs/fases/fase-1-usuarios.md §2.5).
 * Se escribe `login` al canjear el 2FA; se lee con `GET /usuarios/{id}/actividad`.
 */
beforeEach(function () {
    Mail::fake();
});

describe('login', function () {
    test('el canje del 2FA escribe un evento propio y actualiza last_login_at', function () {
        $this->freezeSecond();
        $user = User::factory()->create();
        $codigo = SecurityCode::factory()->for($user)->twoFactor()->create();

        conToken(tokenTemporal($user))->postJson(route('auth.2fa'), ['otp' => $codigo->code])->assertOk();

        $evento = Actividad::where('user_id', $user->id)->sole();
        expect($evento->tipo)->toBe(TipoActividad::Login)
            ->and($evento->actor_id)->toBeNull()
            ->and($evento->meta)->toBeNull()
            ->and($evento->created_at->toDateTimeString())->toBe(now()->toDateTimeString())
            ->and($evento->titulo())->toBe('Inició sesión')
            ->and($user->fresh()->last_login_at->toDateTimeString())->toBe(now()->toDateTimeString());
    });

    test('la contraseña sola (token temporal) no escribe nada', function () {
        $user = User::factory()->create();

        $this->postJson(route('auth.login'), ['login' => $user->email, 'password' => 'password'])->assertOk();

        expect(Actividad::count())->toBe(0)
            ->and($user->fresh()->last_login_at)->toBeNull();
    });

    test('un código incorrecto no escribe nada', function () {
        $user = User::factory()->create();
        SecurityCode::factory()->for($user)->twoFactor()->create();

        conToken(tokenTemporal($user))->postJson(route('auth.2fa'), ['otp' => 'XXXXXX'])->assertStatus(422);

        expect(Actividad::count())->toBe(0)
            ->and($user->fresh()->last_login_at)->toBeNull();
    });
});

describe('Bitacora::registrar', function () {
    test('guarda sujeto, actor, tipo y meta (sin escapar los acentos)', function () {
        $admin = User::factory()->create();
        $user = User::factory()->create();

        $evento = app(Bitacora::class)->registrar($user, TipoActividad::RolCambiado, $admin, ['rol' => 'representante', 'cambio' => 'agregado']);

        expect($evento->fresh())
            ->user_id->toBe($user->id)
            ->actor_id->toBe($admin->id)
            ->tipo->toBe(TipoActividad::RolCambiado)
            ->meta->toBe(['rol' => 'representante', 'cambio' => 'agregado'])
            ->and($evento->titulo())->toBe('Rol Representante asignado')
            ->and($user->actividades()->count())->toBe(1);

        app(Bitacora::class)->registrar($user, TipoActividad::EstudianteVinculado, $admin, ['nombre' => 'José Núñez']);
        expect(Actividad::query()->toBase()->latest('id')->value('meta'))->toContain('José Núñez');
    });

    test('sin meta guarda null', function () {
        $user = User::factory()->create();

        expect(app(Bitacora::class)->registrar($user, TipoActividad::Suspension)->fresh()->meta)->toBeNull();
    });

    test('sujeto y actor se ven aunque estén de baja', function () {
        $admin = User::factory()->create();
        $user = User::factory()->create();
        $evento = app(Bitacora::class)->registrar($user, TipoActividad::Baja, $admin);

        $user->delete();
        $admin->delete();

        $evento = $evento->fresh();
        expect($evento->user->id)->toBe($user->id)
            ->and($evento->actor->id)->toBe($admin->id);
    });

    test('el borrado físico del actor deja el evento sin actor', function () {
        $admin = User::factory()->create();
        $user = User::factory()->create();
        $evento = app(Bitacora::class)->registrar($user, TipoActividad::Suspension, $admin);

        $admin->forceDelete();

        expect($evento->fresh()->actor_id)->toBeNull();
    });
});

/** `$n` eventos de `$user`, uno por segundo hacia atrás desde ahora (el último creado, el más antiguo). */
function eventosDe(User $user, int $n, TipoActividad $tipo = TipoActividad::Login, ?User $actor = null): void
{
    foreach (range(0, $n - 1) as $i) {
        Actividad::create(['user_id' => $user->id, 'actor_id' => $actor?->id, 'tipo' => $tipo, 'created_at' => now()->subSeconds($i)]);
    }
}

describe('GET /usuarios/{id}/actividad', function () {
    test('sin usuarios.usuario.show responde 403, aunque la persona no exista', function () {
        comoUsuario(usuarioCon(Role::Representante))
            ->getJson(route('usuarios.actividad.index', 999))
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'No tienes permiso para realizar esta acción']);
    });

    test('responde 404 si la persona no existe', function () {
        comoUsuario(usuarioCon(Permission::UsuariosUsuarioShow))
            ->getJson(route('usuarios.actividad.index', 999))
            ->assertNotFound()
            ->assertExactJson(['status' => 404, 'msg' => 'La persona no existe']);
    });

    test('devuelve los eventos con título y actor, del más reciente al más antiguo', function () {
        $this->freezeSecond();
        $admin = User::factory()->create(['name' => 'Admin Uno']);
        $user = User::factory()->create();
        $otro = User::factory()->create();
        $antiguo = Actividad::create(['user_id' => $user->id, 'tipo' => TipoActividad::Login, 'created_at' => now()->subMinute()]);
        $reciente = app(Bitacora::class)->registrar($user, TipoActividad::RolCambiado, $admin, ['rol' => 'representante', 'cambio' => 'agregado']);
        app(Bitacora::class)->registrar($otro, TipoActividad::Login);

        comoUsuario(usuarioCon(Permission::UsuariosUsuarioShow))
            ->getJson(route('usuarios.actividad.index', $user->id))
            ->assertOk()
            ->assertExactJson([
                'status' => 200,
                'data' => [
                    [
                        'id' => $reciente->id,
                        'tipo' => 'rol_cambiado',
                        'titulo' => 'Rol Representante asignado',
                        'actor' => ['id' => $admin->id, 'name' => 'Admin Uno'],
                        'meta' => ['rol' => 'representante', 'cambio' => 'agregado'],
                        'created_at' => now()->toJSON(),
                    ],
                    [
                        'id' => $antiguo->id,
                        'tipo' => 'login',
                        'titulo' => 'Inició sesión',
                        'actor' => null,
                        'meta' => null,
                        'created_at' => now()->subMinute()->toJSON(),
                    ],
                ],
                'next_cursor' => null,
            ]);
    });

    test('pagina de 20 en 20 con cursor, sin repetir ni perder eventos (también con la misma fecha)', function () {
        $this->freezeSecond();
        $user = User::factory()->create();
        eventosDe($user, 25);
        // Cinco en el mismo segundo: el id desempata
        foreach (range(1, 5) as $i) {
            Actividad::create(['user_id' => $user->id, 'tipo' => TipoActividad::Login, 'created_at' => now()->subSeconds(10)]);
        }
        $esperados = Actividad::where('user_id', $user->id)->orderByDesc('created_at')->orderByDesc('id')->pluck('id')->all();
        $lector = usuarioCon(Permission::UsuariosUsuarioShow);

        $primera = comoUsuario($lector)->getJson(route('usuarios.actividad.index', $user->id))->assertOk();
        expect($primera->json('data'))->toHaveCount(20)
            ->and($primera->json('next_cursor'))->toBeString();

        $segunda = comoUsuario($lector)->getJson(route('usuarios.actividad.index', ['id' => $user->id, 'cursor' => $primera->json('next_cursor')]))->assertOk();
        expect($segunda->json('data'))->toHaveCount(10)
            ->and($segunda->json('next_cursor'))->toBeNull()
            ->and([...array_column($primera->json('data'), 'id'), ...array_column($segunda->json('data'), 'id')])->toBe($esperados);
    });

    test('filtra por tipo, también al pasar de página', function () {
        $user = User::factory()->create();
        eventosDe($user, 22, TipoActividad::Suspension);
        eventosDe($user, 5);
        $lector = usuarioCon(Permission::UsuariosUsuarioShow);

        $primera = comoUsuario($lector)->getJson(route('usuarios.actividad.index', ['id' => $user->id, 'tipo' => 'suspension']))->assertOk();
        $segunda = comoUsuario($lector)->getJson(route('usuarios.actividad.index', ['id' => $user->id, 'tipo' => 'suspension', 'cursor' => $primera->json('next_cursor')]))->assertOk();

        expect(array_unique(array_column([...$primera->json('data'), ...$segunda->json('data')], 'tipo')))->toBe(['suspension'])
            ->and($segunda->json('data'))->toHaveCount(2)
            ->and($segunda->json('next_cursor'))->toBeNull();
    });

    test('valida tipo y cursor', function (array $query, string $campo) {
        $user = User::factory()->create();

        comoUsuario(usuarioCon(Permission::UsuariosUsuarioShow))
            ->getJson(route('usuarios.actividad.index', ['id' => $user->id, ...$query]))
            ->assertUnprocessable()
            ->assertJsonValidationErrors($campo);
    })->with([
        'tipo desconocido' => [['tipo' => 'inventado'], 'tipo'],
        'cursor ilegible' => [['cursor' => 'no-es-un-cursor'], 'cursor'],
        'cursor de otro listado' => [['cursor' => base64_encode(json_encode(['name' => 'Ana', '_pointsToNextItems' => true]))], 'cursor'],
    ]);

    test('las bajas conservan y muestran su bitácora', function () {
        $user = User::factory()->create();
        app(Bitacora::class)->registrar($user, TipoActividad::Baja);
        $user->delete();

        comoUsuario(usuarioCon(Permission::UsuariosUsuarioShow))
            ->getJson(route('usuarios.actividad.index', $user->id))
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.tipo', 'baja');
    });
});
