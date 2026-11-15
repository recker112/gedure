<?php

namespace App\Http\Controllers\Usuarios;

use App\Http\Controllers\Controller;
use App\Http\Requests\Usuarios\IndexUsuariosRequest;
use App\Http\Resources\Usuarios\UsuarioResource;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;

/**
 * Personas con acceso a Gedure (docs/fases/fase-1-usuarios.md §4.2): listado y
 * ficha. El permiso `usuarios.usuario.show` lo exige el middleware de la ruta
 * (routes/api/usuarios/usuarios.api.php), antes de validar y de buscar. La
 * lectura no pasa por `UserPolicy`: quien ve personas ve también a los owners.
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
}
