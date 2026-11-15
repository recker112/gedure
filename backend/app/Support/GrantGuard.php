<?php

namespace App\Support;

use App\Models\User;
use Spatie\Permission\Guard;
use Spatie\Permission\Models\Permission as PermissionModel;
use Spatie\Permission\Models\Role as RoleModel;

/**
 * Regla de delegación: quien actúa solo puede **conceder** roles y permisos
 * cuyos permisos efectivos tenga él mismo. Es la regla única de asignar roles,
 * asignar permisos directos, la asignación en bloque y (si llegan) las
 * invitaciones. Ver docs/backend/permisos.md.
 *
 * - Un rol exige sus permisos **actuales** en BD (no los iniciales de
 *   `App\Enums\Role`); un permiso directo, él mismo.
 * - Se comprueba con `can()`: el owner pasa por `Gate::before`.
 * - El llamador pasa solo lo que **se añade** (en un sync, lo nuevo respecto a
 *   lo que ya tiene la persona): quitar reduce privilegios y no se restringe.
 * - Los roles y permisos que no existen se ignoran: no conceden nada.
 *
 * El rol `owner` no tiene permisos, así que aquí pasa siempre: lo protegen las
 * reglas propias de owner (solo otro owner lo da o lo quita).
 */
final class GrantGuard
{
    /**
     * Permisos que exigen `$roles` y `$permissions` y que `$actor` no tiene
     * (vacío si puede concederlos).
     *
     * @param  array<int, string>  $roles
     * @param  array<int, string>  $permissions
     * @return list<string>
     */
    public static function missing(User $actor, array $roles = [], array $permissions = []): array
    {
        if ($roles === [] && $permissions === []) {
            return [];
        }

        $guard = Guard::getDefaultName(User::class);

        $fromRoles = $roles === [] ? collect() : RoleModel::query()
            ->where('guard_name', $guard)
            ->whereIn('name', $roles)
            ->with('permissions:id,name')
            ->get()
            ->flatMap(fn (RoleModel $role) => $role->permissions->pluck('name'));

        $direct = $permissions === [] ? collect() : PermissionModel::query()
            ->where('guard_name', $guard)
            ->whereIn('name', $permissions)
            ->pluck('name');

        return $fromRoles->merge($direct)
            ->unique()
            ->reject(fn (string $permission) => $actor->can($permission))
            ->values()
            ->all();
    }

    /**
     * `true` si `$actor` puede conceder `$roles` y `$permissions`.
     *
     * @param  array<int, string>  $roles
     * @param  array<int, string>  $permissions
     */
    public static function allows(User $actor, array $roles = [], array $permissions = []): bool
    {
        return self::missing($actor, $roles, $permissions) === [];
    }

    /** Mensaje del 403 `{status, msg}` cuando no puede. */
    public static function message(): string
    {
        return __('permission.grant_denied');
    }
}
