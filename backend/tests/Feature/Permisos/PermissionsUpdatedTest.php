<?php

use App\Enums\Permission;
use App\Enums\Role;
use App\Events\Auth\PermissionsUpdated;
use App\Models\User;
use App\Support\PermissionEvents;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Support\Facades\Event;
use Spatie\Permission\Models\Permission as PermissionModel;
use Spatie\Permission\Models\Role as RoleModel;

/**
 * Evento de Reverb `permissions.updated` (App\Events\Auth\PermissionsUpdated):
 * los eventos de spatie (`permission.events_enabled`) llegan a
 * App\Listeners\Auth\NotifyPermissionsChanged, que lo emite para cada usuario
 * afectado. La cola es `sync` en los tests.
 */

/** Ids de los usuarios para los que se ha emitido el evento, ordenados. */
function notificados(): array
{
    return Event::dispatched(PermissionsUpdated::class)
        ->map(fn (array $args) => $args[0]->user->id)
        ->sort()->values()->all();
}

function ids(User ...$users): array
{
    return collect($users)->map->id->sort()->values()->all();
}

beforeEach(function () {
    Event::fake([PermissionsUpdated::class]);
});

test('dar o quitar un permiso directo a un usuario lo notifica a él', function () {
    $user = User::factory()->create();

    $user->givePermissionTo(Permission::UsuariosUsuarioShow);
    $user->revokePermissionTo(Permission::UsuariosUsuarioShow);

    expect(notificados())->toBe([$user->id, $user->id]);
});

test('dar o quitar un rol a un usuario lo notifica a él', function () {
    $user = User::factory()->create();

    $user->assignRole(Role::Profesor);
    $user->removeRole(Role::Profesor);

    expect(notificados())->toBe([$user->id, $user->id]);
});

test('cambiar los permisos de un rol notifica a todos sus usuarios y a nadie más', function () {
    $a = usuarioCon(Role::Profesor);
    $b = usuarioCon(Role::Profesor, Role::Representante);
    usuarioCon(Role::Representante);
    Event::fake([PermissionsUpdated::class]);

    RoleModel::findByName(Role::Profesor->value, 'web')->givePermissionTo(Permission::UsuariosUsuarioShow);

    expect(notificados())->toBe(ids($a, $b));
});

test('asignar roles a un permiso notifica a los usuarios de esos roles', function () {
    $user = usuarioCon(Role::Representante);
    usuarioCon(Role::Profesor);
    Event::fake([PermissionsUpdated::class]);

    PermissionModel::findByName(Permission::UsuariosUsuarioShow->value, 'web')->assignRole(Role::Representante);

    expect(notificados())->toBe([$user->id]);
});

test('con los eventos desactivados no se notifica y se restaura la configuración', function () {
    $user = User::factory()->create();

    PermissionEvents::withoutEvents(fn () => $user->assignRole(Role::Admin));

    expect(notificados())->toBe([])
        ->and(config('permission.events_enabled'))->toBeTrue();
});

test('viaja por el canal privado del usuario con el payload de sesión', function () {
    $user = usuarioCon(Role::Admin);
    $evento = new PermissionsUpdated($user);

    expect($evento->broadcastOn())->toEqual([new PrivateChannel('App.Models.User.'.$user->id)])
        ->and($evento->broadcastAs())->toBe('permissions.updated')
        ->and($evento->broadcastWith()['roles'])->toBe([Role::Admin->value])
        ->and($evento->broadcastWith()['is_owner'])->toBeFalse()
        ->and(array_keys((array) $evento->broadcastWith()['permissions']))->toEqualCanonicalizing(Permission::values());
});
