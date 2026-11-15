<?php

namespace App\Services\Usuarios;

use App\Enums\Role;
use App\Enums\Usuarios\TipoActividad;
use App\Models\User;
use App\Support\GrantGuard;
use App\Support\PermissionEvents;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Guard;
use Spatie\Permission\Models\Permission as PermissionModel;
use Spatie\Permission\Models\Role as RoleModel;

/**
 * Roles y permisos directos de una persona (`PUT /usuarios/{id}/roles`,
 * `PUT /usuarios/{id}/permisos` y `POST /usuarios/roles/bloque`,
 * docs/fases/fase-1-usuarios.md §4.3 y docs/backend/permisos.md).
 *
 * Transacción con la fila releída y bloqueada (`lockForUpdate`) y 422 de dominio
 * `{status, msg}` que vale también para el owner (uno mismo, cuenta dada de
 * baja, último owner). La jerarquía del owner (403) la ponen las Policies en el
 * FormRequest; la delegación (`GrantGuard`, 403) va al final, tras las reglas.
 *
 * Calcula la diferencia y, solo si la hay: aplica `syncRoles`/`syncPermissions`
 * con los eventos de spatie desactivados (si no, el listener avisaría de cada
 * detach/attach), escribe una entrada de bitácora por rol o permiso con el actor
 * y emite un único `PermissionsUpdated` (que sale tras el commit).
 */
class UserAccessService
{
    /** Personas por petición en `POST /usuarios/roles/bloque` (decisión 7 de la fase 1). */
    public const BULK_MAX = 200;

    /**
     * Tope de una lista de roles de entrada: cuántos roles hay en BD (la misma
     * fuente que la regla `exists` de cada elemento). Con `distinct`, una lista
     * legítima nunca lo supera.
     */
    public static function maxRoles(): int
    {
        return RoleModel::where('guard_name', Guard::getDefaultName(User::class))->count();
    }

    /** Como `maxRoles()`, con los permisos de BD (`permissions:sync` borra los huérfanos: BD = enum). */
    public static function maxPermissions(): int
    {
        return PermissionModel::where('guard_name', Guard::getDefaultName(User::class))->count();
    }

    public function __construct(private readonly Bitacora $bitacora) {}

    /**
     * Reemplaza los roles de `$user` (`[]` los quita todos).
     *
     * Si la persona puede perder `owner`, bloquea antes las filas de los owners
     * (en orden de id y antes que la del destino, para no cruzarse con otra
     * petición igual) y comprueba que quede al menos uno: las bajas no cuentan,
     * las suspendidas sí. Así dos owners que se quitan el rol a la vez no dejan
     * Gedure sin ninguno.
     *
     * @param  array<int, string>  $roles
     */
    public function setRoles(User $user, User $actor, array $roles): User
    {
        $roles = array_values(array_unique($roles));

        return DB::transaction(function () use ($user, $actor, $roles) {
            $owners = in_array(Role::Owner->value, $roles, true)
                ? null
                : User::role(Role::Owner)->orderBy('id')->lockForUpdate()->pluck('id');

            $user = $this->lock($user->id);
            $this->ensureNotSelf($user, $actor, 'usuarios.roles_propios');
            $this->ensureNotDeBaja($user);

            $current = $user->getRoleNames()->all();
            $removed = array_diff($current, $roles);

            if (in_array(Role::Owner->value, $removed, true)
                && $owners?->reject(fn ($id) => (int) $id === $user->id)->isEmpty()) {
                $this->fail('usuarios.ultimo_owner');
            }
            $this->ensureCanGrant($actor, roles: array_values(array_diff($roles, $current)));

            $this->applyRoles($user, $actor, $current, $roles);

            return $user;
        });
    }

    /**
     * Reemplaza los permisos **directos** de `$user` (los de sus roles no se
     * tocan; `[]` quita todos los directos).
     *
     * @param  array<int, string>  $permissions
     */
    public function setPermissions(User $user, User $actor, array $permissions): User
    {
        $permissions = array_values(array_unique($permissions));

        return DB::transaction(function () use ($user, $actor, $permissions) {
            $user = $this->lock($user->id);
            $this->ensureNotSelf($user, $actor, 'usuarios.permisos_propios');
            $this->ensureNotDeBaja($user);

            $current = $user->getDirectPermissions()->pluck('name')->all();
            $added = array_values(array_diff($permissions, $current));
            $removed = array_values(array_diff($current, $permissions));

            if ($added === [] && $removed === []) {
                return $user;
            }
            $this->ensureCanGrant($actor, permissions: $added);

            PermissionEvents::withoutEvents(fn () => $user->syncPermissions($permissions));

            foreach ($added as $permission) {
                $this->bitacora->registrar($user, TipoActividad::PermisoAgregado, $actor, ['permiso' => $permission]);
            }
            foreach ($removed as $permission) {
                $this->bitacora->registrar($user, TipoActividad::PermisoQuitado, $actor, ['permiso' => $permission]);
            }
            PermissionEvents::notifyUsers([$user->id]);

            return $user;
        });
    }

    /**
     * Añade `$add` y quita `$remove` a cada persona de `$ids` (nunca `owner`: lo
     * impide el FormRequest, así que aquí no hace falta la regla del último owner).
     *
     * **No es todo o nada:** cada persona va en su propia transacción con las
     * reglas de `PUT /usuarios/{id}/roles` (404, 403 owner ajeno, 422 uno mismo o
     * dada de baja, 403 de delegación); la que no pasa va a `failed` con el
     * `status` y `msg` que habría recibido sola y el resto se guarda. Las que ya
     * estaban así cuentan como actualizadas, sin bitácora ni aviso.
     *
     * @param  array<int, int>  $ids
     * @param  array<int, string>  $add
     * @param  array<int, string>  $remove
     * @return array{updated: Collection<int, User>, failed: list<array{id: int, status: int, msg: string}>, msg: string}
     */
    public function bulkRoles(array $ids, User $actor, array $add, array $remove): array
    {
        $updated = new Collection;
        $failed = [];

        foreach ($ids as $id) {
            try {
                $updated->push(DB::transaction(function () use ($id, $actor, $add, $remove) {
                    $user = User::withTrashed()->whereKey($id)->lockForUpdate()->first()
                        ?? $this->fail('usuarios.no_encontrado', 404);

                    $policy = Gate::forUser($actor)->inspect('manage', $user);
                    if ($policy->denied()) {
                        $this->fail((string) $policy->message(), 403, translate: false);
                    }
                    $this->ensureNotSelf($user, $actor, 'usuarios.roles_propios');
                    $this->ensureNotDeBaja($user);

                    $current = $user->getRoleNames()->all();
                    $this->ensureCanGrant($actor, roles: array_values(array_diff($add, $current)));

                    $roles = array_values(array_unique([...array_diff($current, $remove), ...$add]));
                    $this->applyRoles($user, $actor, $current, $roles);

                    return $user;
                }));
            } catch (HttpResponseException $e) {
                $data = $e->getResponse()->getData(true);
                $failed[] = ['id' => $id, 'status' => $data['status'], 'msg' => $data['msg']];
            }
        }

        return [
            'updated' => $updated,
            'failed' => $failed,
            'msg' => $this->bulkMessage($add, $remove, $updated->count(), count($failed)),
        ];
    }

    /**
     * Guarda `$roles` si difieren de `$current`, con un `rol_cambiado` por rol
     * (`meta {rol, cambio}`) y un solo aviso. Devuelve si hubo cambios.
     *
     * @param  array<int, string>  $current
     * @param  array<int, string>  $roles
     */
    private function applyRoles(User $user, User $actor, array $current, array $roles): bool
    {
        $added = array_values(array_diff($roles, $current));
        $removed = array_values(array_diff($current, $roles));

        if ($added === [] && $removed === []) {
            return false;
        }

        PermissionEvents::withoutEvents(fn () => $user->syncRoles($roles));

        foreach ($added as $role) {
            $this->bitacora->registrar($user, TipoActividad::RolCambiado, $actor, ['rol' => $role, 'cambio' => 'agregado']);
        }
        foreach ($removed as $role) {
            $this->bitacora->registrar($user, TipoActividad::RolCambiado, $actor, ['rol' => $role, 'cambio' => 'quitado']);
        }
        PermissionEvents::notifyUsers([$user->id]);

        return true;
    }

    /**
     * Texto del aviso del bloque: "Rol asignado a 5 personas", "Roles
     * actualizados a 3 personas", "Asignado a 18; 2 no se pudieron actualizar"...
     *
     * @param  array<int, string>  $add
     * @param  array<int, string>  $remove
     */
    private function bulkMessage(array $add, array $remove, int $updated, int $failed): string
    {
        $tipo = $remove === [] ? 'asignado' : ($add === [] ? 'quitado' : 'actualizado');

        if ($failed === 0) {
            $clave = count($add) + count($remove) > 1 ? 'actualizado' : $tipo;

            return __('usuarios.bloque.'.$clave, ['personas' => trans_choice('usuarios.bloque.personas', $updated)]);
        }

        if ($updated === 0) {
            return $failed === 1
                ? __('usuarios.bloque.ninguna_una')
                : __('usuarios.bloque.ninguna', ['fallidas' => $failed]);
        }

        return trans_choice('usuarios.bloque.parcial', $failed, [
            'verbo' => __('usuarios.bloque.verbo.'.$tipo),
            'actualizadas' => $updated,
            'fallidas' => $failed,
        ]);
    }

    /** La fila de `$id` releída y bloqueada (también si está dada de baja). */
    private function lock(int $id): User
    {
        return User::withTrashed()->whereKey($id)->lockForUpdate()->firstOrFail();
    }

    private function ensureNotSelf(User $user, User $actor, string $msg): void
    {
        if ($user->is($actor)) {
            $this->fail($msg);
        }
    }

    private function ensureNotDeBaja(User $user): void
    {
        if ($user->trashed()) {
            $this->fail('usuarios.de_baja');
        }
    }

    /**
     * 403 si `$actor` no puede conceder lo que se añade (`GrantGuard`).
     *
     * @param  array<int, string>  $roles
     * @param  array<int, string>  $permissions
     */
    private function ensureCanGrant(User $actor, array $roles = [], array $permissions = []): void
    {
        if (! GrantGuard::allows($actor, $roles, $permissions)) {
            $this->fail(GrantGuard::message(), 403, translate: false);
        }
    }

    /** `{status, msg}` sin `errors`: no es un error de campo. Deshace la transacción. */
    private function fail(string $msg, int $status = 422, bool $translate = true): never
    {
        throw new HttpResponseException(response()->json([
            'status' => $status,
            'msg' => $translate ? __($msg) : $msg,
        ], $status));
    }
}
