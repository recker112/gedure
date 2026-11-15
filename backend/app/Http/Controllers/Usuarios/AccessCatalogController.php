<?php

namespace App\Http\Controllers\Usuarios;

use App\Enums\Permission;
use App\Enums\Role;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Spatie\Permission\Models\Role as RoleModel;

/**
 * Catálogo de roles y permisos para la administración de personas
 * (docs/backend/permisos.md). El permiso `usuarios.usuario.show` lo exige el
 * middleware de la ruta (routes/api/usuarios/catalogo.api.php).
 */
class AccessCatalogController extends Controller
{
    /**
     * Roles de la base de datos con sus permisos ACTUALES (no los iniciales del
     * enum: la administración los edita), en el orden del catálogo. Primero los
     * de `App\Enums\Role`, en su orden, y después los ajenos a él.
     */
    public function roles(): JsonResponse
    {
        $ordenPermisos = array_flip(Permission::values());
        $ordenRoles = array_flip(Role::values());

        $roles = RoleModel::query()->where('guard_name', 'web')->with('permissions')->get()
            ->sortBy(fn (RoleModel $rol) => [$ordenRoles[$rol->name] ?? count($ordenRoles), $rol->id])
            ->map(function (RoleModel $rol) use ($ordenPermisos) {
                $enum = Role::tryFrom($rol->name);

                return [
                    'name' => $rol->name,
                    'label' => $enum?->label() ?? $rol->name,
                    'description' => $enum?->description() ?? '',
                    'permissions' => $rol->permissions->pluck('name')
                        ->sortBy(fn (string $nombre) => $ordenPermisos[$nombre] ?? PHP_INT_MAX)
                        ->values(),
                ];
            })
            ->values();

        return response()->json(['status' => 200, 'data' => $roles]);
    }

    /** Catálogo de permisos agrupado por módulo, en el orden del enum. */
    public function permisos(): JsonResponse
    {
        $grupos = collect(Permission::cases())
            ->groupBy(fn (Permission $permiso) => $permiso->modulo())
            ->map(fn ($permisos, string $modulo) => [
                'modulo' => $modulo,
                'permissions' => $permisos->map->value->values(),
            ])
            ->values();

        return response()->json(['status' => 200, 'data' => $grupos]);
    }
}
