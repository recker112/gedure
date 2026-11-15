<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Enums\Usuarios\EstadoCuenta;
use App\Enums\Usuarios\TipoActividad;
use App\Mail\Auth\TfaCodeMail;
use App\Models\Auth\PersonalAccessToken;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use App\Services\Usuarios\EstadoCuentaService;
use Illuminate\Database\QueryException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Mail;

/**
 * Estado de la cuenta (docs/fases/fase-1-usuarios.md §2.1 y §6): estado derivado,
 * login de una suspendida (403, nunca 401) o dada de baja (credenciales
 * incorrectas), el middleware `account.active` en las rutas privadas y las
 * acciones de la administración (§4.2): suspender, reactivar, baja, restaurar y
 * cerrar todas sus sesiones. `lockForUpdate` no bloquea en SQLite: la carrera
 * del último owner se simula con dos llamadas seguidas al Service.
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

/*
| Acciones de la administración sobre el estado (PR #4, §4.2 y decisiones 4 y 8):
| suspender, reactivar, baja, restaurar y cerrar todas sus sesiones.
*/

/** Una persona con un token definitivo y uno temporal (dos sesiones). */
function conDosSesiones(?User $user = null): User
{
    $user ??= User::factory()->create();
    tokenDefinitivo($user);
    tokenTemporal($user);

    return $user;
}

describe('suspender', function () {
    test('suspende con motivo, revoca sus sesiones y no envía correo', function () {
        $this->freezeSecond();
        $admin = usuarioCon(Role::Admin);
        $user = conDosSesiones(usuarioCon(Role::Representante));

        comoUsuario($admin)
            ->postJson(route('usuarios.usuarios.suspender', $user->id), ['motivo' => 'Deuda pendiente'])
            ->assertOk()
            ->assertJsonPath('status', 200)
            ->assertJsonPath('msg', 'Cuenta suspendida')
            ->assertJsonPath('data.estado', 'suspendido')
            ->assertJsonPath('data.suspended_reason', 'Deuda pendiente')
            ->assertJsonPath('data.suspended_by', ['id' => $admin->id, 'name' => $admin->name])
            // Conserva sus roles (y, desde el PR #8, sus vínculos)
            ->assertJsonPath('data.roles', ['representante']);

        expect($user->tokens()->count())->toBe(0);

        $evento = $user->actividades()->sole();
        expect($evento->tipo)->toBe(TipoActividad::Suspension)
            ->and($evento->actor_id)->toBe($admin->id)
            ->and($evento->meta)->toBe(['motivo' => 'Deuda pendiente']);

        Mail::assertNothingQueued();
    });

    test('sin motivo también', function () {
        $user = User::factory()->create();

        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.suspender', $user->id))
            ->assertOk()
            ->assertJsonPath('data.suspended_reason', null);

        expect($user->actividades()->sole()->meta)->toBeNull();
    });

    test('la suspendida ya no entra: su token deja de servir y el login da 403', function () {
        $user = User::factory()->create();
        $token = tokenDefinitivo($user);

        comoUsuario(usuarioCon(Role::Admin))->postJson(route('usuarios.usuarios.suspender', $user->id))->assertOk();

        rutaPrivadaDePrueba($token)->assertUnauthorized();
        $this->postJson(route('auth.login'), ['login' => $user->username, 'password' => 'password'])
            ->assertForbidden()
            ->assertExactJson(CUENTA_SUSPENDIDA);
    });

    test('422: uno mismo, ya suspendida, de baja', function (Closure $destino, string $msg) {
        $admin = usuarioCon(Role::Admin);
        $user = $destino($admin);

        comoUsuario($admin)
            ->postJson(route('usuarios.usuarios.suspender', $user->id))
            ->assertUnprocessable()
            ->assertExactJson(['status' => 422, 'msg' => $msg]);
    })->with([
        'uno mismo' => [fn (User $admin) => $admin, 'No puedes suspender tu propia cuenta'],
        'ya suspendida' => [fn () => User::factory()->suspendido()->create(), 'La cuenta ya está suspendida'],
        'de baja' => [fn () => User::factory()->deBaja()->create(), 'La cuenta está dada de baja: restáurala antes de editarla'],
    ]);

    test('un owner tampoco se suspende a sí mismo', function () {
        $owner = usuarioCon(Role::Owner);

        comoUsuario($owner)->postJson(route('usuarios.usuarios.suspender', $owner->id))->assertUnprocessable();
    });

    test('motivo de 120 caracteres como mucho', function () {
        $user = User::factory()->create();

        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.suspender', $user->id), ['motivo' => str_repeat('a', 121)])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['motivo']);
    });
});

describe('reactivar', function () {
    test('quita la suspensión y lo registra', function () {
        $admin = usuarioCon(Role::Admin);
        $user = User::factory()->suspendido($admin, 'Motivo')->create();

        comoUsuario($admin)
            ->postJson(route('usuarios.usuarios.reactivar', $user->id))
            ->assertOk()
            ->assertJsonPath('msg', 'Cuenta reactivada')
            ->assertJsonPath('data.estado', 'activo')
            ->assertJsonPath('data.suspended_at', null)
            ->assertJsonPath('data.suspended_reason', null)
            ->assertJsonPath('data.suspended_by', null);

        expect($user->actividades()->sole())->tipo->toBe(TipoActividad::Reactivacion)->actor_id->toBe($admin->id);

        $this->postJson(route('auth.login'), ['login' => $user->username, 'password' => 'password'])->assertOk();
    });

    test('una pendiente suspendida vuelve a pendiente', function () {
        $user = User::factory()->pendiente()->suspendido()->create();

        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.reactivar', $user->id))
            ->assertJsonPath('data.estado', 'pendiente');
    });

    test('422: no suspendida, de baja', function (Closure $crear, string $msg) {
        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.reactivar', $crear()->id))
            ->assertUnprocessable()
            ->assertExactJson(['status' => 422, 'msg' => $msg]);
    })->with([
        'activa' => [fn () => User::factory()->create(), 'La cuenta no está suspendida'],
        'de baja y suspendida' => [fn () => User::factory()->suspendido()->deBaja()->create(), 'La cuenta está dada de baja: restáurala antes de editarla'],
    ]);
});

describe('baja', function () {
    test('da de baja sin borrar, revoca sus sesiones y lo registra', function () {
        $admin = usuarioCon(Role::Admin);
        $user = conDosSesiones();

        comoUsuario($admin)
            ->deleteJson(route('usuarios.usuarios.destroy', $user->id))
            ->assertOk()
            ->assertJsonPath('msg', 'Cuenta dada de baja')
            ->assertJsonPath('data.estado', 'baja')
            ->assertJsonPath('data.deleted_by', ['id' => $admin->id, 'name' => $admin->name]);

        expect(User::find($user->id))->toBeNull()
            ->and(User::withTrashed()->find($user->id))->not->toBeNull()
            ->and($user->tokens()->count())->toBe(0)
            ->and(User::withTrashed()->find($user->id)->actividades()->sole())->tipo->toBe(TipoActividad::Baja)->actor_id->toBe($admin->id);

        $this->postJson(route('auth.login'), ['login' => $user->username, 'password' => 'password'])->assertStatus(400);
    });

    test('422: uno mismo, ya de baja', function (Closure $destino, string $msg) {
        $admin = usuarioCon(Role::Admin);

        comoUsuario($admin)
            ->deleteJson(route('usuarios.usuarios.destroy', $destino($admin)->id))
            ->assertUnprocessable()
            ->assertExactJson(['status' => 422, 'msg' => $msg]);
    })->with([
        'uno mismo' => [fn (User $admin) => $admin, 'No puedes dar de baja tu propia cuenta'],
        'ya de baja' => [fn () => User::factory()->deBaja()->create(), 'La cuenta ya está dada de baja'],
    ]);

    test('un owner da de baja a otro owner, pero no al último', function () {
        $owner = usuarioCon(Role::Owner);
        $otro = usuarioCon(Role::Owner);

        comoUsuario($owner)->deleteJson(route('usuarios.usuarios.destroy', $otro->id))->assertOk();

        // Queda solo $owner; a sí mismo no puede (uno mismo), y otro owner no hay.
        // El último owner se comprueba también por el Service, sin la regla de uno mismo:
        $ultimo = fn () => app(EstadoCuentaService::class)->baja($owner, usuarioCon(Role::Admin));
        expect($ultimo)->toThrow(HttpResponseException::class);
        expect($owner->fresh()->trashed())->toBeFalse();
    });

    test('el último owner: 422 aunque haya owners de baja; los suspendidos cuentan', function () {
        $owner = usuarioCon(Role::Owner);
        $deBaja = usuarioCon(Role::Owner);
        $deBaja->delete();
        $actor = usuarioCon(Role::Owner);
        $actor->forceFill(['suspended_at' => now()])->save();

        // Con $actor suspendido aún quedan dos: se puede
        $servicio = app(EstadoCuentaService::class);
        $servicio->baja($owner, $actor);

        try {
            $servicio->baja($actor, usuarioCon(Role::Admin));
            $this->fail('Debía fallar: es el último owner');
        } catch (HttpResponseException $e) {
            expect($e->getResponse()->getData(true))->toBe(['status' => 422, 'msg' => 'Debe quedar al menos un owner']);
        }
    });

    test('un no-owner no da de baja a un owner (403)', function () {
        $owner = usuarioCon(Role::Owner);
        usuarioCon(Role::Owner);

        comoUsuario(usuarioCon(Role::Admin))
            ->deleteJson(route('usuarios.usuarios.destroy', $owner->id))
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'Solo un owner puede gestionar a otro owner']);
    });
});

describe('restaurar', function () {
    test('restaura la baja y limpia también la suspensión', function () {
        $admin = usuarioCon(Role::Admin);
        $user = User::factory()->suspendido($admin, 'x')->deBaja($admin)->create();

        comoUsuario($admin)
            ->postJson(route('usuarios.usuarios.restaurar', $user->id))
            ->assertOk()
            ->assertJsonPath('msg', 'Cuenta restaurada')
            ->assertJsonPath('data.estado', 'activo')
            ->assertJsonPath('data.deleted_at', null)
            ->assertJsonPath('data.deleted_by', null)
            ->assertJsonPath('data.suspended_at', null);

        expect($user->actividades()->sole())->tipo->toBe(TipoActividad::Restauracion)->actor_id->toBe($admin->id);
        $this->postJson(route('auth.login'), ['login' => $user->username, 'password' => 'password'])->assertOk();
    });

    test('422 si no está de baja', function () {
        comoUsuario(usuarioCon(Role::Admin))
            ->postJson(route('usuarios.usuarios.restaurar', User::factory()->create()->id))
            ->assertUnprocessable()
            ->assertExactJson(['status' => 422, 'msg' => 'La cuenta no está dada de baja']);
    });
});

describe('cerrar todas sus sesiones', function () {
    test('revoca todos sus tokens y lo registra con cuántos', function () {
        $admin = usuarioCon(Role::Admin);
        $user = conDosSesiones();
        $otro = User::factory()->create();
        tokenDefinitivo($otro);

        comoUsuario($admin)
            ->deleteJson(route('usuarios.sesiones.destroy', $user->id))
            ->assertOk()
            ->assertExactJson(['status' => 200, 'msg' => 'Se cerraron 2 sesiones']);

        expect($user->tokens()->count())->toBe(0)
            ->and($otro->tokens()->count())->toBe(1)
            ->and($user->fresh()->estado())->toBe(EstadoCuenta::Activo);

        $evento = $user->actividades()->sole();
        expect($evento->tipo)->toBe(TipoActividad::SesionesCerradas)
            ->and($evento->actor_id)->toBe($admin->id)
            ->and($evento->meta)->toBe(['tokens' => 2]);
    });

    test('sin sesiones abiertas también responde 200', function () {
        comoUsuario(usuarioCon(Role::Admin))
            ->deleteJson(route('usuarios.sesiones.destroy', User::factory()->create()->id))
            ->assertOk()
            ->assertJsonPath('msg', 'No tenía sesiones abiertas');
    });

    test('una suspendida también', function () {
        $user = User::factory()->suspendido()->create();
        tokenTemporal($user);

        comoUsuario(usuarioCon(Role::Admin))
            ->deleteJson(route('usuarios.sesiones.destroy', $user->id))
            ->assertOk()
            ->assertJsonPath('msg', 'Se cerró 1 sesión');
    });

    test('422: uno mismo, de baja', function (Closure $destino, string $msg) {
        $admin = usuarioCon(Role::Admin);

        comoUsuario($admin)
            ->deleteJson(route('usuarios.sesiones.destroy', $destino($admin)->id))
            ->assertUnprocessable()
            ->assertExactJson(['status' => 422, 'msg' => $msg]);
    })->with([
        'uno mismo' => [fn (User $admin) => $admin, 'Tus propias sesiones se cierran desde tu cuenta'],
        'de baja' => [fn () => User::factory()->deBaja()->create(), 'La cuenta está dada de baja: restáurala antes de editarla'],
    ]);
});

describe('permisos de las acciones de estado', function () {
    dataset('acciones de estado', [
        'suspender' => ['POST', 'usuarios.usuarios.suspender', Permission::UsuariosUsuarioUpdate],
        'reactivar' => ['POST', 'usuarios.usuarios.reactivar', Permission::UsuariosUsuarioUpdate],
        'cerrar sesiones' => ['DELETE', 'usuarios.sesiones.destroy', Permission::UsuariosUsuarioUpdate],
        'baja' => ['DELETE', 'usuarios.usuarios.destroy', Permission::UsuariosUsuarioDestroy],
        'restaurar' => ['POST', 'usuarios.usuarios.restaurar', Permission::UsuariosUsuarioDestroy],
    ]);

    test('sin el permiso de la acción es 403 aunque la persona no exista', function (string $metodo, string $ruta, Permission $permiso) {
        // Todos los permisos de usuarios menos el de la acción
        $otros = array_filter(Permission::cases(), fn (Permission $p) => $p !== $permiso);

        comoUsuario(usuarioCon(...$otros))
            ->json($metodo, route($ruta, 999999))
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'No tienes permiso para realizar esta acción']);
    })->with('acciones de estado');

    test('con el permiso, 404 si no existe', function (string $metodo, string $ruta, Permission $permiso) {
        comoUsuario(usuarioCon($permiso))
            ->json($metodo, route($ruta, 999999))
            ->assertNotFound()
            ->assertExactJson(['status' => 404, 'msg' => 'La persona no existe']);
    })->with('acciones de estado');

    test('un no-owner no actúa sobre un owner (403 antes que el 422)', function (string $metodo, string $ruta, Permission $permiso) {
        $owner = usuarioCon(Role::Owner);

        comoUsuario(usuarioCon($permiso))
            ->json($metodo, route($ruta, $owner->id))
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'Solo un owner puede gestionar a otro owner']);
    })->with('acciones de estado');

    test('con solo el permiso de la acción basta', function () {
        $user = User::factory()->create();

        comoUsuario(usuarioCon(Permission::UsuariosUsuarioUpdate))
            ->postJson(route('usuarios.usuarios.suspender', $user->id))
            ->assertOk();
        comoUsuario(usuarioCon(Permission::UsuariosUsuarioDestroy))
            ->deleteJson(route('usuarios.usuarios.destroy', $user->id))
            ->assertOk();
    });
});
