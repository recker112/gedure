<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Events\Auth\PermissionsUpdated;
use App\Models\User;
use Illuminate\Support\Facades\Event;
use Spatie\Permission\Models\Permission as PermissionModel;
use Spatie\Permission\Models\Role as RoleModel;

/**
 * `permissions:sync`: lleva el catálogo (App\Enums) a la base de datos. El
 * seeder de los tests (PermissionsSeeder) ya lo ejecuta, así que cada test
 * parte del catálogo aplicado.
 */

/** Nombres de los permisos de un rol, ordenados. */
function permisosDelRol(Role|string $rol): array
{
    $nombre = $rol instanceof Role ? $rol->value : $rol;

    return RoleModel::findByName($nombre, 'web')->permissions()->pluck('name')->sort()->values()->all();
}

function ordenados(array $nombres): array
{
    sort($nombres);

    return $nombres;
}

test('crea los permisos del catálogo con el guard web y los roles con sus permisos iniciales', function () {
    expect(PermissionModel::pluck('name')->sort()->values()->all())->toBe(ordenados(Permission::values()))
        ->and(PermissionModel::where('guard_name', '!=', 'web')->exists())->toBeFalse()
        ->and(RoleModel::pluck('name')->sort()->values()->all())->toBe(ordenados(Role::values()));

    foreach (Role::cases() as $rol) {
        expect(permisosDelRol($rol))->toBe(ordenados($rol->permissionNames()));
    }
});

test('es idempotente', function () {
    $antes = [PermissionModel::pluck('name', 'id')->all(), RoleModel::with('permissions')->get()->toArray()];

    $this->artisan('permissions:sync')
        ->expectsOutput('Permisos creados: 0')
        ->expectsOutput('Permisos borrados (huérfanos): 0')
        ->expectsOutput('Roles creados: 0')
        ->expectsOutput('Usuarios notificados: 0')
        ->assertSuccessful();

    expect([PermissionModel::pluck('name', 'id')->all(), RoleModel::with('permissions')->get()->toArray()])->toBe($antes);
});

test('borra los permisos que no están en el catálogo con sus asignaciones', function () {
    $viejo = PermissionModel::create(['name' => 'usuarios.usuario.viejo', 'guard_name' => 'web']);
    RoleModel::findByName(Role::Admin->value, 'web')->givePermissionTo($viejo);
    $user = User::factory()->create();
    $user->givePermissionTo($viejo);
    $otroGuard = PermissionModel::create(['name' => Permission::UsuariosUsuarioShow->value, 'guard_name' => 'api']);

    $this->artisan('permissions:sync')
        ->expectsOutputToContain('Permisos borrados (huérfanos): 2')
        ->assertSuccessful();

    expect(PermissionModel::find($viejo->id))->toBeNull()
        ->and(PermissionModel::find($otroGuard->id))->toBeNull()
        ->and($user->fresh()->getAllPermissions())->toBeEmpty()
        ->and(permisosDelRol(Role::Admin))->toBe(ordenados(Role::Admin->permissionNames()));
});

test('no toca los permisos de un rol existente que se ha editado', function () {
    $rol = RoleModel::findByName(Role::Admin->value, 'web');
    $rol->revokePermissionTo(Permission::UsuariosPermisoUpdate);
    RoleModel::findByName(Role::Profesor->value, 'web')->givePermissionTo(Permission::UsuariosUsuarioShow);
    $admin = permisosDelRol(Role::Admin);

    $this->artisan('permissions:sync')->assertSuccessful();

    expect(permisosDelRol(Role::Admin))->toBe($admin)
        ->and($admin)->not->toContain(Permission::UsuariosPermisoUpdate->value)
        ->and(permisosDelRol(Role::Profesor))->toBe([Permission::UsuariosUsuarioShow->value]);
});

test('da a los roles existentes los permisos que el sync acaba de crear y figuran en su definición', function () {
    // Simula un permiso nuevo en el catálogo: no existe en la base de datos
    PermissionModel::findByName(Permission::UsuariosRolUpdate->value, 'web')->delete();
    RoleModel::findByName(Role::Admin->value, 'web')->revokePermissionTo(Permission::UsuariosPermisoUpdate);

    $this->artisan('permissions:sync')
        ->expectsOutput('Permisos creados: 1: '.Permission::UsuariosRolUpdate->value)
        ->expectsOutput('Rol admin actualizado: '.Permission::UsuariosRolUpdate->value)
        ->assertSuccessful();

    // Recibe el nuevo, pero el que se le quitó a mano sigue quitado
    expect(permisosDelRol(Role::Admin))->toContain(Permission::UsuariosRolUpdate->value)
        ->and(permisosDelRol(Role::Admin))->not->toContain(Permission::UsuariosPermisoUpdate->value)
        ->and(permisosDelRol(Role::Profesor))->not->toContain(Permission::UsuariosRolUpdate->value);
});

test('vuelve a crear un rol del catálogo borrado con sus permisos iniciales', function () {
    RoleModel::findByName(Role::Admin->value, 'web')->delete();

    $this->artisan('permissions:sync')
        ->expectsOutput('Roles creados: 1: '.Role::Admin->value)
        ->assertSuccessful();

    expect(permisosDelRol(Role::Admin))->toBe(ordenados(Role::Admin->permissionNames()));
});

test('deja a owner sin permisos', function () {
    RoleModel::findByName(Role::Owner->value, 'web')->givePermissionTo(Permission::values());

    $this->artisan('permissions:sync')->assertSuccessful();

    expect(permisosDelRol(Role::Owner))->toBe([]);
});

test('no toca los roles que no están en el catálogo y avisa de ellos', function () {
    RoleModel::create(['name' => 'coordinacion', 'guard_name' => 'web'])->givePermissionTo(Permission::UsuariosUsuarioShow);

    $this->artisan('permissions:sync')
        ->expectsOutputToContain('Roles fuera del catálogo (no se tocan): coordinacion')
        ->assertSuccessful();

    expect(permisosDelRol('coordinacion'))->toBe([Permission::UsuariosUsuarioShow->value]);
});

test('notifica una sola vez a cada usuario afectado y a nadie más', function () {
    $viejo = PermissionModel::create(['name' => 'usuarios.usuario.legacy', 'guard_name' => 'web']);
    RoleModel::findByName(Role::Admin->value, 'web')->givePermissionTo($viejo);
    $directo = usuarioCon();
    $directo->givePermissionTo($viejo);
    $admin = usuarioCon(Role::Admin);
    $ambos = usuarioCon(Role::Admin);
    $ambos->givePermissionTo($viejo);
    $ajeno = usuarioCon(Role::Profesor);

    Event::fake([PermissionsUpdated::class]);

    $this->artisan('permissions:sync')
        ->expectsOutput('Usuarios notificados: 3')
        ->assertSuccessful();

    Event::assertDispatchedTimes(PermissionsUpdated::class, 3);
    foreach ([$directo, $admin, $ambos] as $user) {
        Event::assertDispatched(PermissionsUpdated::class, fn ($e) => $e->user->is($user));
    }
    Event::assertNotDispatched(PermissionsUpdated::class, fn ($e) => $e->user->is($ajeno));
});

test('sin cambios no notifica a nadie', function () {
    usuarioCon(Role::Admin);
    Event::fake([PermissionsUpdated::class]);

    $this->artisan('permissions:sync')->assertSuccessful();

    Event::assertNotDispatched(PermissionsUpdated::class);
});
