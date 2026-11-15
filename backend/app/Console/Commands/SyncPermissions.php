<?php

namespace App\Console\Commands;

use App\Enums\Permission;
use App\Enums\Role;
use App\Models\User;
use App\Support\PermissionEvents;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Console\ConfirmableTrait;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\PermissionRegistrar;

/**
 * Lleva a la base de datos el catálogo de App\Enums\Permission y App\Enums\Role.
 *
 * - Crea los permisos que faltan (guard `web`) y borra los que ya no están en el
 *   catálogo (huérfanos), con sus asignaciones.
 * - Crea los roles que faltan con sus permisos iniciales. Un rol que ya existe
 *   NO se toca (sus permisos se editan desde la administración), salvo para
 *   darle los permisos que este mismo sync acaba de crear y figuran en su
 *   definición: un permiso recién creado no puede haberlo quitado nadie.
 * - `owner` se queda sin permisos (los pasa todos por `Gate::before`).
 * - Los roles que no están en el catálogo no se tocan; solo se avisa.
 *
 * Es idempotente y va en una transacción. Los eventos de spatie se desactivan
 * mientras dura, para no emitir un `PermissionsUpdated` por cada cambio: al
 * terminar se emite uno por usuario afectado. Ver docs/backend/permisos.md.
 */
#[Signature('permissions:sync {--force : Ejecutar en producción sin pedir confirmación}')]
#[Description('Sincroniza los permisos y roles del catálogo (App\Enums) con la base de datos')]
class SyncPermissions extends Command
{
    use ConfirmableTrait;

    private const GUARD = 'web';

    public function handle(PermissionRegistrar $registrar): int
    {
        if (! $this->confirmToProceed()) {
            return self::FAILURE;
        }

        $permissionModel = $registrar->getPermissionClass();
        $roleModel = $registrar->getRoleClass();
        $tables = config('permission.table_names');
        $pivotPermission = $registrar->pivotPermission;
        $pivotRole = $registrar->pivotRole;

        $result = PermissionEvents::withoutEvents(fn () => DB::transaction(function () use ($registrar, $permissionModel, $roleModel, $tables, $pivotPermission, $pivotRole) {
            $catalog = Permission::values();

            // ── Permisos ────────────────────────────────────────────────
            $existing = $permissionModel::query()
                ->where('guard_name', self::GUARD)
                ->whereIn('name', $catalog)
                ->pluck('name')
                ->all();

            $created = array_values(array_diff($catalog, $existing));
            $now = now();
            $permissionModel::query()->insert(array_map(fn (string $name) => [
                'name' => $name,
                'guard_name' => self::GUARD,
                'created_at' => $now,
                'updated_at' => $now,
            ], $created));

            $orphans = $permissionModel::query()
                ->where(fn ($q) => $q->where('guard_name', '!=', self::GUARD)->orWhereNotIn('name', $catalog))
                ->pluck('name', 'id');
            $orphanIds = $orphans->keys()->all();

            $affectedUsers = DB::table($tables['model_has_permissions'])
                ->whereIn($pivotPermission, $orphanIds)
                ->where('model_type', (new User)->getMorphClass())
                ->pluck('model_id')
                ->all();
            $affectedRoles = DB::table($tables['role_has_permissions'])
                ->whereIn($pivotPermission, $orphanIds)
                ->pluck($pivotRole)
                ->all();

            if ($orphanIds !== []) {
                DB::table($tables['model_has_permissions'])->whereIn($pivotPermission, $orphanIds)->delete();
                DB::table($tables['role_has_permissions'])->whereIn($pivotPermission, $orphanIds)->delete();
                $permissionModel::query()->whereKey($orphanIds)->delete();
            }

            // `givePermissionTo()` busca los permisos por nombre en la caché
            // de spatie, que aún no conoce los recién insertados.
            $registrar->forgetCachedPermissions();

            // ── Roles ───────────────────────────────────────────────────
            $createdRoles = [];
            $updatedRoles = [];

            foreach (Role::cases() as $case) {
                $role = $roleModel::query()
                    ->where('name', $case->value)
                    ->where('guard_name', self::GUARD)
                    ->first();

                if (! $role) {
                    $role = $roleModel::create(['name' => $case->value, 'guard_name' => self::GUARD]);
                    $role->givePermissionTo($case->permissionNames());
                    $createdRoles[] = $case->value;

                    continue;
                }

                if ($case === Role::Owner) {
                    if ($role->permissions()->exists()) {
                        $role->permissions()->detach();
                        $updatedRoles[$case->value] = ['(se quitan todos: owner no lleva permisos)'];
                        $affectedRoles[] = $role->getKey();
                    }

                    continue;
                }

                $toAdd = array_values(array_intersect($case->permissionNames(), $created));
                if ($toAdd !== []) {
                    $role->givePermissionTo($toAdd);
                    $updatedRoles[$case->value] = $toAdd;
                    $affectedRoles[] = $role->getKey();
                }
            }

            $outsideCatalog = $roleModel::query()
                ->whereNotIn('name', array_column(Role::cases(), 'value'))
                ->pluck('name')
                ->all();

            return compact('created', 'orphans', 'createdRoles', 'updatedRoles', 'outsideCatalog', 'affectedUsers', 'affectedRoles');
        }));

        $registrar->forgetCachedPermissions();

        $notified = PermissionEvents::notifyUsers($result['affectedUsers'], $result['affectedRoles']);

        $this->report($result, $notified);

        return self::SUCCESS;
    }

    private function report(array $result, int $notified): void
    {
        $list = fn (array $items) => $items === [] ? '' : ': '.implode(', ', $items);

        $this->info('Permisos creados: '.count($result['created']).$list($result['created']));
        $this->info('Permisos borrados (huérfanos): '.$result['orphans']->count().$list($result['orphans']->values()->all()));
        $this->info('Roles creados: '.count($result['createdRoles']).$list($result['createdRoles']));

        foreach ($result['updatedRoles'] as $role => $permissions) {
            $this->info("Rol {$role} actualizado".$list($permissions));
        }

        if ($result['outsideCatalog'] !== []) {
            $this->warn('Roles fuera del catálogo (no se tocan)'.$list($result['outsideCatalog']));
        }

        $this->info("Usuarios notificados: {$notified}");
    }
}
