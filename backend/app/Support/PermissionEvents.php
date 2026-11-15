<?php

namespace App\Support;

use App\Events\Auth\PermissionsUpdated;
use App\Models\User;
use Closure;

/**
 * Utilidades sobre los eventos de spatie y el aviso `PermissionsUpdated`.
 * Las usan el listener `NotifyPermissionsChanged`, `permissions:sync` y los seeders.
 */
final class PermissionEvents
{
    /**
     * Ejecuta `$callback` con los eventos de spatie desactivados
     * (`permission.events_enabled`), para no emitir un `PermissionsUpdated` por
     * cada cambio. Restaura el valor previo aunque falle.
     *
     * @template T
     *
     * @param  Closure(): T  $callback
     * @return T
     */
    public static function withoutEvents(Closure $callback): mixed
    {
        $previous = config('permission.events_enabled');
        config(['permission.events_enabled' => false]);

        try {
            return $callback();
        } finally {
            config(['permission.events_enabled' => $previous]);
        }
    }

    /**
     * Emite un `PermissionsUpdated` por usuario único: los de `$userIds` y los
     * que tengan alguno de `$roleIds`. Va por lotes. Devuelve cuántos avisó.
     *
     * La notificación persistente («tus permisos han cambiado») llegará con las
     * notificaciones (fase 7); de momento solo se emite el evento silencioso.
     *
     * @param  array<int|string>  $userIds
     * @param  array<int|string>  $roleIds
     */
    public static function notifyUsers(array $userIds = [], array $roleIds = []): int
    {
        if ($userIds === [] && $roleIds === []) {
            return 0;
        }

        $notified = 0;

        User::query()
            ->where(fn ($q) => $q
                ->whereKey(array_unique($userIds))
                ->orWhereHas('roles', fn ($r) => $r->whereKey(array_unique($roleIds))))
            ->chunkById(200, function ($users) use (&$notified) {
                foreach ($users as $user) {
                    PermissionsUpdated::dispatch($user);
                    $notified++;
                }
            });

        return $notified;
    }
}
