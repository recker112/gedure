<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Support\GrantGuard;
use Spatie\Permission\Models\Role as RoleModel;

/**
 * Regla de delegación (App\Support\GrantGuard): solo se concede lo que uno
 * tiene. La usarán los endpoints de roles y permisos (fase 1).
 */
test('sin nada que conceder no falta nada', function () {
    expect(GrantGuard::missing(usuarioCon()))->toBe([])
        ->and(GrantGuard::allows(usuarioCon()))->toBeTrue();
});

test('quien solo puede asignar roles no puede dar el rol admin ni permisos que no tiene', function () {
    $secretaria = usuarioCon(Permission::UsuariosRolUpdate);

    expect(GrantGuard::missing($secretaria, roles: [Role::Admin->value]))
        ->toEqualCanonicalizing(array_values(array_diff(Permission::values(), [Permission::UsuariosRolUpdate->value])))
        ->and(GrantGuard::missing($secretaria, permissions: [Permission::UsuariosPermisoUpdate->value]))
        ->toBe([Permission::UsuariosPermisoUpdate->value])
        ->and(GrantGuard::allows($secretaria, permissions: [Permission::UsuariosRolUpdate->value]))->toBeTrue();
});

test('puede dar un rol cuyos permisos tiene todos (o que no tiene ninguno)', function () {
    $secretaria = usuarioCon(Permission::UsuariosRolUpdate, Permission::MisEstudiantesEstudianteShow);

    expect(GrantGuard::allows($secretaria, roles: [Role::Representante->value, Role::Profesor->value]))->toBeTrue()
        ->and(GrantGuard::allows(usuarioCon(Role::Admin), roles: [Role::Admin->value]))->toBeTrue();
});

test('el rol representante solo lo da quien tiene mis-estudiantes.estudiante.show', function () {
    expect(GrantGuard::missing(usuarioCon(Permission::UsuariosRolUpdate), roles: [Role::Representante->value]))
        ->toBe([Permission::MisEstudiantesEstudianteShow->value]);
});

test('un rol exige sus permisos actuales en BD, no los iniciales del enum', function () {
    RoleModel::findByName(Role::Representante->value, 'web')->givePermissionTo(Permission::UsuariosPermisoUpdate);
    $secretaria = usuarioCon(Permission::UsuariosRolUpdate, Permission::MisEstudiantesEstudianteShow);

    expect(GrantGuard::missing($secretaria, roles: [Role::Representante->value]))
        ->toBe([Permission::UsuariosPermisoUpdate->value]);
});

test('el owner puede conceder cualquier cosa', function () {
    expect(GrantGuard::allows(usuarioCon(Role::Owner), roles: Role::values(), permissions: Permission::values()))->toBeTrue();
});

test('los roles y permisos que no existen se ignoran', function () {
    expect(GrantGuard::missing(usuarioCon(), roles: ['no_existe'], permissions: ['usuarios.nada.show']))->toBe([]);
});

test('el mensaje del 403 está en español', function () {
    expect(GrantGuard::message())->toBe('No puedes conceder permisos que no tienes');
});
