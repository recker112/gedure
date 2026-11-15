<?php

use App\Enums\Usuarios\EstadoCuenta;
use App\Mail\Auth\TfaCodeMail;
use App\Models\Auth\PersonalAccessToken;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Mail;

/**
 * Estado de la cuenta (docs/fases/fase-1-usuarios.md §2.1 y §6): estado derivado,
 * login de una suspendida (403, nunca 401) o dada de baja (credenciales
 * incorrectas) y el middleware `account.active` en las rutas privadas.
 */
const CUENTA_SUSPENDIDA = ['status' => 403, 'msg' => 'Tu cuenta está suspendida'];

beforeEach(function () {
    Mail::fake();
});

describe('estado derivado', function () {
    test('baja manda sobre suspendido, suspendido sobre pendiente y si no, activo', function (Closure $crear, EstadoCuenta $estado) {
        $user = $crear();

        expect(User::withTrashed()->findOrFail($user->id)->estado())->toBe($estado);
    })->with([
        'activo' => [fn () => User::factory()->create(), EstadoCuenta::Activo],
        'pendiente' => [fn () => User::factory()->pendiente()->create(), EstadoCuenta::Pendiente],
        'suspendido' => [fn () => User::factory()->suspendido()->create(), EstadoCuenta::Suspendido],
        'suspendido y pendiente' => [fn () => User::factory()->pendiente()->suspendido()->create(), EstadoCuenta::Suspendido],
        'baja' => [fn () => User::factory()->deBaja()->create(), EstadoCuenta::Baja],
        'baja y suspendido' => [fn () => User::factory()->suspendido()->deBaja()->create(), EstadoCuenta::Baja],
    ]);

    test('las factories guardan la autoría y el motivo', function () {
        $admin = User::factory()->create();

        $suspendido = User::factory()->suspendido($admin, 'Fin de curso')->create();
        $baja = User::factory()->deBaja($admin)->create();

        expect($suspendido->suspendedBy->is($admin))->toBeTrue()
            ->and($suspendido->suspended_reason)->toBe('Fin de curso')
            ->and(User::withTrashed()->find($baja->id)->deletedBy->is($admin))->toBeTrue();
    });

    test('la autoría se ve aunque quien suspendió esté de baja', function () {
        $admin = User::factory()->deBaja()->create();
        $user = User::factory()->suspendido($admin)->create();

        expect($user->fresh()->suspendedBy?->id)->toBe($admin->id);
    });

    test('una baja queda fuera de las consultas normales y conserva su cédula y su correo', function () {
        $user = User::factory()->deBaja()->create(['username' => '20111222', 'email' => 'baja@example.com']);

        expect(User::find($user->id))->toBeNull()
            ->and(User::withTrashed()->find($user->id))->not->toBeNull();

        expect(fn () => User::factory()->create(['email' => 'baja@example.com']))->toThrow(QueryException::class);
    });
});

describe('login', function () {
    test('una cuenta suspendida recibe 403 tras la contraseña correcta, sin token ni código', function () {
        $user = User::factory()->suspendido()->create();

        $this->postJson(route('auth.login'), ['login' => $user->username, 'password' => 'password'])
            ->assertForbidden()
            ->assertExactJson(CUENTA_SUSPENDIDA);

        expect($user->tokens()->count())->toBe(0)
            ->and(SecurityCode::count())->toBe(0);
        Mail::assertNothingQueued();
    });

    test('una suspendida con la contraseña incorrecta sigue recibiendo 400', function () {
        $user = User::factory()->suspendido()->create();

        $this->postJson(route('auth.login'), ['login' => $user->username, 'password' => 'otra-cosa'])
            ->assertStatus(400)
            ->assertExactJson(['status' => 400, 'msg' => 'Usuario o contraseña incorrectos']);
    });

    test('una cuenta dada de baja recibe credenciales incorrectas (400)', function (Closure $login) {
        $user = User::factory()->deBaja()->create();

        $this->postJson(route('auth.login'), ['login' => $login($user), 'password' => 'password'])
            ->assertStatus(400)
            ->assertExactJson(['status' => 400, 'msg' => 'Usuario o contraseña incorrectos']);

        expect(PersonalAccessToken::count())->toBe(0);
        Mail::assertNothingQueued();
    })->with([
        'usuario/cédula' => [fn (User $u) => $u->username],
        'correo' => [fn (User $u) => $u->email],
    ]);

    test('una cuenta pendiente con la contraseña correcta entra (el bloqueo es no conocerla)', function () {
        $user = User::factory()->pendiente()->create();

        $this->postJson(route('auth.login'), ['login' => $user->email, 'password' => 'password'])->assertOk();
        Mail::assertQueued(TfaCodeMail::class, 1);
    });
});

describe('2FA', function () {
    test('con el token temporal de una cuenta ya suspendida responde 403 y lo revoca', function () {
        $user = User::factory()->create();
        $codigo = SecurityCode::factory()->for($user)->twoFactor()->create();
        $temporal = tokenTemporal($user);
        $user->forceFill(['suspended_at' => now()])->save();

        conToken($temporal)->postJson(route('auth.2fa'), ['otp' => $codigo->code])
            ->assertForbidden()
            ->assertExactJson(CUENTA_SUSPENDIDA);

        expect($user->tokens()->count())->toBe(0)
            ->and($user->fresh()->last_login_at)->toBeNull()
            ->and($user->actividades()->count())->toBe(0);
    });

    test('con el token temporal de una cuenta ya dada de baja responde 401', function () {
        $user = User::factory()->create();
        $codigo = SecurityCode::factory()->for($user)->twoFactor()->create();
        $temporal = tokenTemporal($user);
        $user->delete();

        conToken($temporal)->postJson(route('auth.2fa'), ['otp' => $codigo->code])->assertUnauthorized();

        expect(PersonalAccessToken::where('tokenable_id', $user->id)->count())->toBe(1);
    });

    test('una suspensión o una baja que llega durante el canje no emite el definitivo', function (array $cambio, int $estado) {
        $user = User::factory()->create();
        $codigo = SecurityCode::factory()->for($user)->twoFactor()->create();
        $temporal = tokenTemporal($user);

        // Sanctum carga al usuario sin el cambio y, antes de la transacción, otro
        // proceso lo hace commit: la relectura con lock lo ve
        User::retrieved(function (User $u) use ($cambio) {
            static $hecho = false;
            if (! $hecho) {
                $hecho = true;
                User::query()->toBase()->where('id', $u->id)->update($cambio);
            }
        });

        conToken($temporal)->postJson(route('auth.2fa'), ['otp' => $codigo->code])->assertStatus($estado);

        expect(PersonalAccessToken::where('tokenable_id', $user->id)->count())->toBe(0)
            ->and(User::withTrashed()->find($user->id)->last_login_at)->toBeNull()
            ->and($user->actividades()->count())->toBe(0);
    })->with([
        'suspensión (403)' => [['suspended_at' => '2026-01-01 00:00:00'], 403],
        'baja (401)' => [['deleted_at' => '2026-01-01 00:00:00'], 401],
    ]);
});

describe('account.active', function () {
    test('una suspendida con un token definitivo recibe 403 en las rutas privadas', function (string $metodo, string $uri, Closure $datos) {
        $user = User::factory()->create();
        $token = tokenDefinitivo($user);
        $user->forceFill(['suspended_at' => now()])->save();

        conToken($token)->json($metodo, $uri, $datos($user))
            ->assertForbidden()
            ->assertExactJson(CUENTA_SUSPENDIDA);
    })->with('rutas privadas');

    test('una baja con un token definitivo recibe 401 en las rutas privadas', function (string $metodo, string $uri, Closure $datos) {
        $user = User::factory()->create();
        $token = tokenDefinitivo($user);
        $user->delete();

        conToken($token)->json($metodo, $uri, $datos($user))->assertUnauthorized();
    })->with('rutas privadas');

    test('la ruta privada de prueba también pasa por account.active', function () {
        $user = User::factory()->create();
        $token = tokenDefinitivo($user);

        rutaPrivadaDePrueba($token)->assertOk();

        $user->forceFill(['suspended_at' => now()])->save();
        rutaPrivadaDePrueba($token)->assertForbidden()->assertExactJson(CUENTA_SUSPENDIDA);
    });

    test('una cuenta pendiente con token definitivo no es una suspendida', function () {
        rutaPrivadaDePrueba(tokenDefinitivo(User::factory()->pendiente()->create()))->assertOk();
    });

    test('una suspendida todavía puede hacer relogin y cerrar su sesión', function () {
        $user = User::factory()->suspendido()->create();
        $token = tokenDefinitivo($user);

        conToken($token)->postJson(route('auth.relogin'))->assertOk();
        conToken($token)->postJson(route('auth.logout'))->assertOk();

        expect($user->tokens()->count())->toBe(0);
    });
});
