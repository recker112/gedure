<?php

namespace App\Http\Controllers\Usuarios;

use App\Http\Controllers\Controller;
use App\Http\Requests\Usuarios\IndexActividadRequest;
use App\Http\Resources\Usuarios\ActividadResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;

/**
 * Bitácora de una persona, solo lectura (docs/fases/fase-1-usuarios.md §4.2 y
 * §9, decisión 13: no hay bitácora general). El permiso `usuarios.usuario.show`
 * lo exige el middleware de la ruta, antes de validar y de buscar.
 */
class ActividadController extends Controller
{
    public const POR_PAGINA = 20;

    /**
     * 20 por página con `cursorPaginate`, `created_at desc, id desc` (índice
     * `(user_id, created_at, id)`), filtrable por `tipo`. Las bajas conservan su
     * bitácora: también se encuentran.
     */
    public function index(IndexActividadRequest $request, int $id): JsonResponse
    {
        $user = User::withTrashed()->find($id) ?? abort(response()->json([
            'status' => 404,
            'msg' => __('usuarios.no_encontrado'),
        ], 404));

        $pagina = $user->actividades()
            ->when($request->validated('tipo'), fn ($query, string $tipo) => $query->where('tipo', $tipo))
            ->with('actor:id,name')
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->cursorPaginate(self::POR_PAGINA);

        return response()->json([
            'status' => 200,
            'data' => ActividadResource::collection($pagina->getCollection())->resolve(),
            'next_cursor' => $pagina->nextCursor()?->encode(),
        ]);
    }
}
