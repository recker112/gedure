<?php

use App\Enums\Permission;
use App\Enums\Role;

/**
 * Catálogo de permisos y roles (App\Enums). Sin base de datos: lo que llega a
 * ella lo prueba Feature/Permisos/SyncPermissionsTest.
 */
const MODULOS = ['usuarios', 'mis-estudiantes', 'academico', 'notas', 'documentos', 'finanzas', 'pagos', 'comunicacion', 'preseleccion'];

test('todos los permisos siguen modulo.recurso.accion', function (Permission $permiso) {
    expect($permiso->value)->toMatch('/^[a-z]+(-[a-z]+)*\.[a-z]+\.(show|create|update|destroy|[a-z]+(_[a-z]+)*)$/')
        ->and(MODULOS)->toContain($permiso->modulo());
})->with(Permission::cases());

test('no hay permisos <modulo>.access: Gedure es una sola app', function () {
    expect(array_filter(Permission::values(), fn (string $p) => str_ends_with($p, '.access')))->toBe([]);
});

test('los nombres del catálogo no se repiten', function () {
    expect(Permission::values())->toBe(array_values(array_unique(Permission::values())))
        ->and(Role::values())->toBe(array_values(array_unique(Role::values())));
});

test('los roles son exactamente owner, admin, profesor y representante', function () {
    expect(Role::values())->toBe(['owner', 'admin', 'profesor', 'representante']);
});

test('los permisos iniciales de cada rol son casos del enum y no se repiten', function (Role $rol) {
    expect($rol->permissions())->each->toBeInstanceOf(Permission::class)
        ->and($rol->permissionNames())->toBe(array_values(array_unique($rol->permissionNames())))
        ->and($rol->label())->not->toBe('')
        ->and($rol->description())->not->toBe('');
})->with(Role::cases());

test('owner no tiene permisos iniciales', function () {
    expect(Role::Owner->permissions())->toBe([]);
});

test('admin tiene todo el catálogo', function () {
    expect(Role::Admin->permissionNames())->toBe(Permission::values());
});
