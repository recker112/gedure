<?php

namespace App\Http\Controllers\Usuarios;

use App\Http\Controllers\Controller;
use App\Http\Requests\Usuarios\IndexUsuariosRequest;
use App\Http\Requests\Usuarios\StoreUsuarioRequest;
use App\Http\Requests\Usuarios\SuspenderUsuarioRequest;
use App\Http\Requests\Usuarios\UpdateUsuarioRequest;
use App\Http\Requests\Usuarios\UsuarioTargetRequest;
use App\Http\Resources\Usuarios\UsuarioResource;
use App\Models\User;
use App\Services\Usuarios\ActivacionService;
use App\Services\Usuarios\EstadoCuentaService;
use App\Services\Usuarios\UsuarioService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;

/**
 * Personas con acceso a Gedure (docs/fases/fase-1-usuarios.md §4.2): listado,
 * ficha, alta, edición, activación y estado de la cuenta. El permiso de cada
 * ruta lo exige su middleware (routes/api/usuarios/usuarios.api.php), antes de
 * validar y de buscar. La lectura no pasa por `UserPolicy`: quien ve personas
 * ve también a los owners. Las acciones sobre `/usuarios/{id}` pasan por
 * `UsuarioTargetRequest` (404 y `UserPolicy::manage`) y sus reglas de dominio
 * están en los Services (422).
 */
class UsuarioController extends Controller
{
    /**
     * Página de personas (`paginate`, 25 por defecto). Filtra por `q` (nombre,
     * cédula/usuario o correo), `rol` (`none` = sin roles) y `estado`
     * (`actuales` por defecto: sin bajas); `orden` `nombre` o `-last_login_at`,
     * con el id como desempate para que las páginas sean estables.
     */
    public function index(IndexUsuariosRequest $request): JsonResponse
    {
        $q = trim((string) $request->validated('q'));
        $rol = $request->validated('rol');

        $pagina = User::query()
            ->conEstado($request->validated('estado') ?? 'actuales')
            ->when($q !== '', function (Builder $query) use ($q) {
                // `%` y `_` como texto (MariaDB escapa con `\`; SQLite de los tests no)
                $like = '%'.addcslashes($q, '\\%_').'%';
                $query->where(fn (Builder $w) => $w
                    ->where('name', 'like', $like)
                    ->orWhere('username', 'like', $like)
                    ->orWhere('email', 'like', $like));
            })
            ->when($rol === 'none', fn (Builder $query) => $query->doesntHave('roles'))
            ->when(filled($rol) && $rol !== 'none', fn (Builder $query) => $query->whereHas('roles', fn (Builder $r) => $r->where('name', $rol)))
            ->when(
                ($request->validated('orden') ?? 'nombre') === '-last_login_at',
                fn (Builder $query) => $query->orderByDesc('last_login_at'),
                fn (Builder $query) => $query->orderBy('name'),
            )
            ->orderBy('id')
            ->with(UsuarioResource::RELACIONES)
            ->paginate($request->integer('per_page', IndexUsuariosRequest::POR_PAGINA));

        return response()->json([
            'status' => 200,
            'data' => UsuarioResource::collection($pagina->getCollection())->resolve(),
            'meta' => [
                'current_page' => $pagina->currentPage(),
                'last_page' => $pagina->lastPage(),
                'per_page' => $pagina->perPage(),
                'total' => $pagina->total(),
                'from' => $pagina->firstItem(),
                'to' => $pagina->lastItem(),
            ],
        ]);
    }

    /** Ficha de una persona, también si está dada de baja. */
    public function show(int $id): JsonResponse
    {
        $user = User::withTrashed()->with(UsuarioResource::RELACIONES)->find($id) ?? abort(response()->json([
            'status' => 404,
            'msg' => __('usuarios.no_encontrado'),
        ], 404));

        return response()->json([
            'status' => 200,
            'data' => UsuarioResource::make($user)->resolve(),
        ]);
    }

    /** `POST /usuarios`: alta de una cuenta pendiente (201). */
    public function store(StoreUsuarioRequest $request, UsuarioService $usuarios): JsonResponse
    {
        $user = $usuarios->crear($request->validated(), $request->user());

        return response()->json([
            'status' => 201,
            'msg' => __($request->boolean('enviar_activacion') ? 'usuarios.creado_con_activacion' : 'usuarios.creado'),
            'data' => $this->usuario($user),
        ], 201);
    }

    /** `PATCH /usuarios/{id}`: solo los campos enviados. */
    public function update(UpdateUsuarioRequest $request, UsuarioService $usuarios): JsonResponse
    {
        $user = $usuarios->actualizar($request->target(), $request->user(), $request->validated());

        return $this->conUsuario('usuarios.actualizado', $user);
    }

    /** `POST /usuarios/{id}/activacion`: (re)envía el enlace; el anterior deja de valer. */
    public function reenviarActivacion(UsuarioTargetRequest $request, ActivacionService $activaciones): JsonResponse
    {
        $activaciones->reenviar($request->target(), $request->user());

        return response()->json([
            'status' => 200,
            'msg' => __('usuarios.activacion_enviada'),
        ]);
    }

    /** `POST /usuarios/{id}/suspender` `{motivo?}`. */
    public function suspender(SuspenderUsuarioRequest $request, EstadoCuentaService $estado): JsonResponse
    {
        $user = $estado->suspender($request->target(), $request->user(), $request->validated('motivo'));

        return $this->conUsuario('usuarios.suspendida', $user);
    }

    /** `POST /usuarios/{id}/reactivar`. */
    public function reactivar(UsuarioTargetRequest $request, EstadoCuentaService $estado): JsonResponse
    {
        return $this->conUsuario('usuarios.reactivada', $estado->reactivar($request->target(), $request->user()));
    }

    /** `DELETE /usuarios/{id}`: baja (nunca se borra). */
    public function destroy(UsuarioTargetRequest $request, EstadoCuentaService $estado): JsonResponse
    {
        return $this->conUsuario('usuarios.dada_de_baja', $estado->baja($request->target(), $request->user()));
    }

    /** `POST /usuarios/{id}/restaurar`. */
    public function restaurar(UsuarioTargetRequest $request, EstadoCuentaService $estado): JsonResponse
    {
        return $this->conUsuario('usuarios.restaurada', $estado->restaurar($request->target(), $request->user()));
    }

    /** `DELETE /usuarios/{id}/sesiones`: "Cerrar todas sus sesiones". */
    public function cerrarSesiones(UsuarioTargetRequest $request, EstadoCuentaService $estado): JsonResponse
    {
        $tokens = $estado->cerrarSesiones($request->target(), $request->user());

        return response()->json([
            'status' => 200,
            'msg' => trans_choice('usuarios.sesiones_cerradas', $tokens),
        ]);
    }

    /** `{status: 200, msg, data: Usuario}`. */
    private function conUsuario(string $msg, User $user): JsonResponse
    {
        return response()->json([
            'status' => 200,
            'msg' => __($msg),
            'data' => $this->usuario($user),
        ]);
    }

    /** @return array<string, mixed> */
    private function usuario(User $user): array
    {
        return UsuarioResource::make($user->load(UsuarioResource::RELACIONES))->resolve();
    }
}
