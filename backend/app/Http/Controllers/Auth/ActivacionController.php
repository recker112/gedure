<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ActivacionTokenRequest;
use App\Http\Requests\Auth\ActivarCuentaRequest;
use App\Services\Usuarios\ActivacionService;
use App\Support\EmailMask;
use Illuminate\Http\JsonResponse;

/**
 * Página pública de activación (docs/fases/fase-1-usuarios.md §4.4), sin sesión:
 * la persona ve a qué cuenta corresponde el enlace y elige su contraseña. 404 y
 * 410 los resuelve `ActivacionTokenRequest` antes de validar.
 */
class ActivacionController extends Controller
{
    public function __construct(private readonly ActivacionService $activaciones) {}

    /** `{status, data: {name, email}}`, con el correo enmascarado. */
    public function show(ActivacionTokenRequest $request): JsonResponse
    {
        $user = $request->target()->user;

        return response()->json([
            'status' => 200,
            'data' => [
                'name' => $user->name,
                'email' => EmailMask::mask($user->email),
            ],
        ]);
    }

    /** Activa la cuenta sin abrir sesión: la persona entra después por el login (y el 2FA). */
    public function store(ActivarCuentaRequest $request): JsonResponse
    {
        $this->activaciones->activar($request->target(), $request->validated('password'));

        return response()->json([
            'status' => 200,
            'msg' => __('usuarios.activacion.activada'),
        ]);
    }
}
