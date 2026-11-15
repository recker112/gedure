<?php

namespace App\Listeners\Auth;

use App\Enums\QueueName;
use App\Events\Auth\PermissionsUpdated;
use App\Models\User;
use App\Support\PermissionEvents;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Queue\Attributes\Queue;
use Spatie\Permission\Events\PermissionAttachedEvent;
use Spatie\Permission\Events\PermissionDetachedEvent;
use Spatie\Permission\Events\RoleAttachedEvent;
use Spatie\Permission\Events\RoleDetachedEvent;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

/**
 * Traduce los eventos de spatie/laravel-permission (`permission.events_enabled`)
 * en `PermissionsUpdated` para cada usuario afectado:
 *
 * - Permiso o rol dado/quitado a un User → ese usuario.
 * - Permiso dado/quitado a un Role → todos los usuarios con ese rol.
 * - Rol dado/quitado a un Permission (`$permission->assignRole()`) → los
 *   usuarios de esos roles.
 *
 * Va en cola y tras el commit: buscar los usuarios de un rol puede recorrer
 * muchas filas y no debe frenar la petición que edita el rol.
 */
#[Queue(QueueName::Events)]
class NotifyPermissionsChanged implements ShouldQueue
{
    public bool $afterCommit = true;

    public function handle(
        PermissionAttachedEvent|PermissionDetachedEvent|RoleAttachedEvent|RoleDetachedEvent $event,
    ): void {
        $model = $event->model;

        if ($model instanceof User) {
            PermissionsUpdated::dispatch($model);

            return;
        }

        $roleIds = match (true) {
            $model instanceof Role => [$model->getKey()],
            $model instanceof Permission && ($event instanceof RoleAttachedEvent || $event instanceof RoleDetachedEvent) => self::ids($event->rolesOrIds),
            default => [],
        };

        if ($roleIds !== []) {
            PermissionEvents::notifyUsers(roleIds: $roleIds);
        }
    }

    /**
     * Spatie pasa ids, modelos o colecciones según el método: se normaliza a ids.
     *
     * @return array<int|string>
     */
    private static function ids(mixed $items): array
    {
        return collect($items instanceof Model ? [$items] : $items)
            ->map(fn ($item) => $item instanceof Model ? $item->getKey() : $item)
            ->filter()
            ->values()
            ->all();
    }
}
