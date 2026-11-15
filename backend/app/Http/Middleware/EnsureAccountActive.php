<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Rechaza a las cuentas suspendidas en las rutas `auth.full` con 403
 * `{status, msg}` (el mismo mensaje que el login de una suspendida).
 *
 * Defensa en profundidad: suspender revocará todos los tokens y el canje del
 * 2FA vuelve a comprobarlo con la fila bloqueada, pero un token definitivo que
 * sobreviviera (una suspensión hecha a mano, una carrera no prevista) no debe
 * servir para nada privado, tampoco para autorizar canales de broadcasting.
 *
 * Va en `auth.full` y no en el guard de Sanctum: allí solo podría responder "no
 * autenticado" (401), que el frontend trata como sesión caducada. `/auth/relogin`
 * y `/auth/logout` usan `auth:sanctum` a secas, así que una suspendida todavía
 * puede cerrar su sesión. Las bajas ni llegan aquí: el global scope de
 * SoftDeletes las saca de Sanctum (401).
 *
 * `suspended_at` sale del usuario que Sanctum ya cargó: no añade consultas.
 */
class EnsureAccountActive
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user instanceof User && $user->isSuspended()) {
            abort(response()->json([
                'status' => 403,
                'msg' => __('auth.suspended'),
            ], 403));
        }

        return $next($request);
    }
}
