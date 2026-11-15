<?php

namespace App\Http\Controllers\Usuarios;

use App\Http\Controllers\Controller;
use App\Http\Requests\Usuarios\BloqueRolesRequest;
use App\Http\Requests\Usuarios\UpdateUsuarioPermisosRequest;
use App\Http\Requests\Usuarios\UpdateUsuarioRolesRequest;
use App\Http\Resources\Usuarios\UsuarioResource;
use App\Services\Usuarios\UserAccessService;
use Illuminate\Http\JsonResponse;

/**
 * Roles y permisos directos de una persona (docs/fases/fase-1-usuarios.md §4.3).
 * El permiso de cada ruta lo exige su middleware (`usuarios.rol.update` /
 * `usuarios.permiso.update`); después, 404 y Policies en el FormRequest, la
 * validación y las reglas de dominio (422) y de delegación (403) en
 * `UserAccessService`.
 */
class UserAccessController extends Controller
{
    public function __construct(private readonly UserAccessService $access) {}

    /** `PUT /usuarios/{id}/roles`: reemplaza los roles. */
    public function roles(UpdateUsuarioRolesRequest $request): JsonResponse
    {
        $user = $this->access->setRoles($request->target(), $request->user(), $request->validated('roles'));

        return response()->json([
            'status' => 200,
            'msg' => __('usuarios.roles_actualizados'),
            'data' => UsuarioResource::make($user->load(UsuarioResource::RELACIONES))->resolve(),
        ]);
    }

    /** `PUT /usuarios/{id}/permisos`: reemplaza los permisos directos. */
    public function permisos(UpdateUsuarioPermisosRequest $request): JsonResponse
    {
        $user = $this->access->setPermissions($request->target(), $request->user(), $request->validated('permissions'));

        return response()->json([
            'status' => 200,
            'msg' => __('usuarios.permisos_actualizados'),
            'data' => UsuarioResource::make($user->load(UsuarioResource::RELACIONES))->resolve(),
        ]);
    }

    /**
     * `POST /usuarios/roles/bloque`: 200 aunque fallen algunas personas, con
     * `data: {updated: Usuario[], failed: [{id, status, msg}]}`.
     */
    public function bloque(BloqueRolesRequest $request): JsonResponse
    {
        $result = $this->access->bulkRoles($request->userIds(), $request->user(), $request->rolesToAdd(), $request->rolesToRemove());

        return response()->json([
            'status' => 200,
            'msg' => $result['msg'],
            'data' => [
                'updated' => UsuarioResource::collection($result['updated']->load(UsuarioResource::RELACIONES))->resolve(),
                'failed' => $result['failed'],
            ],
        ]);
    }
}
