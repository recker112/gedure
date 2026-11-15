<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;

/**
 * Owner por `Gate::before` (AppServiceProvider) y respuestas 403 `{status, msg}`
 * de spatie y de las políticas (bootstrap/app.php). Nunca 401: el frontend
 * cierra la sesión con cualquier 401.
 */
const SIN_PERMISO = ['status' => 403, 'msg' => 'No tienes permiso para realizar esta acción'];

test('owner pasa cualquier can() sin tener permisos asignados', function () {
    $owner = usuarioCon(Role::Owner);
    Gate::define('cualquier-cosa', fn () => false);

    expect($owner->getAllPermissions())->toBeEmpty()
        ->and($owner->can(Permission::UsuariosPermisoUpdate->value))->toBeTrue()
        ->and($owner->can('permiso.que.no_existe'))->toBeTrue()
        ->and($owner->can('cualquier-cosa'))->toBeTrue()
        ->and(usuarioCon(Role::Profesor)->can(Permission::UsuariosPermisoUpdate->value))->toBeFalse();
});

test('admin tiene todo el catálogo por su rol, pero no pasa lo que no es un permiso', function () {
    $admin = usuarioCon(Role::Admin);
    Gate::define('cualquier-cosa', fn () => false);

    foreach (Permission::cases() as $permiso) {
        expect($admin->can($permiso->value))->toBeTrue();
    }
    expect($admin->can('cualquier-cosa'))->toBeFalse();
});

describe('middleware permission:', function () {
    test('deja pasar a quien tiene el permiso por rol, directo o por ser owner', function (Closure $usuario) {
        rutaProtegidaDePrueba($usuario(), 'permission:'.Permission::UsuariosRolUpdate->value)->assertOk();
    })->with([
        'por rol' => [fn () => usuarioCon(Role::Admin)],
        'directo' => [fn () => usuarioCon(Permission::UsuariosRolUpdate)],
        'owner' => [fn () => usuarioCon(Role::Owner)],
    ]);

    test('sin el permiso responde 403 con {status, msg} en español', function (Closure $usuario) {
        rutaProtegidaDePrueba($usuario(), 'permission:'.Permission::UsuariosRolUpdate->value)
            ->assertForbidden()
            ->assertExactJson(SIN_PERMISO);
    })->with([
        'sin roles' => [fn () => usuarioCon()],
        'profesor' => [fn () => usuarioCon(Role::Profesor)],
        'representante' => [fn () => usuarioCon(Role::Representante)],
        'otro permiso' => [fn () => usuarioCon(Permission::UsuariosUsuarioShow)],
    ]);

    test('role: también responde 403 con {status, msg}', function () {
        rutaProtegidaDePrueba(usuarioCon(Role::Profesor), 'role:'.Role::Admin->value)
            ->assertForbidden()
            ->assertExactJson(SIN_PERMISO);
    });

    test('con el token temporal del 2FA responde 403 antes de mirar permisos y sin token 401', function () {
        $owner = usuarioCon(Role::Owner);
        rutaProtegidaDePrueba($owner, 'permission:'.Permission::UsuariosRolUpdate->value)->assertOk();

        conToken(tokenTemporal($owner))->getJson('/api/v1/__test/autorizacion')->assertForbidden();
        app('auth')->forgetGuards();
        $this->withoutToken()->getJson('/api/v1/__test/autorizacion')->assertUnauthorized();
    });
});

describe('políticas y Gate', function () {
    test('una denegación por defecto responde 403 con el mensaje en español', function () {
        Gate::define('ver-prueba', fn () => false);

        rutaProtegidaDePrueba(usuarioCon(), 'can:ver-prueba')
            ->assertForbidden()
            ->assertExactJson(SIN_PERMISO);
    });

    test('una denegación con mensaje propio lo conserva', function () {
        Gate::define('ver-prueba', fn () => Response::deny('La sección no es tuya'));

        rutaProtegidaDePrueba(usuarioCon(Role::Profesor), 'can:ver-prueba')
            ->assertForbidden()
            ->assertExactJson(['status' => 403, 'msg' => 'La sección no es tuya']);
    });

    test('owner pasa la política', function () {
        Gate::define('ver-prueba', fn () => false);

        rutaProtegidaDePrueba(usuarioCon(Role::Owner), 'can:ver-prueba')->assertOk();
    });
});

test('el token sin la ability de la ruta sigue respondiendo su propio 403', function () {
    $user = User::factory()->create();

    conToken(tokenDefinitivo($user))
        ->postJson(route('auth.2fa'), ['otp' => 'ABCDEF'])
        ->assertForbidden()
        ->assertExactJson(['status' => 403, 'msg' => 'Este token no permite realizar esta acción']);
});
