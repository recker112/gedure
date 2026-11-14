<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Rechaza los tokens que todavía no han superado el doble factor.
 *
 * El login emite un token temporal con la ability `2fa_required` que solo sirve
 * para `/auth/2fa`, `/auth/2fa/resend`, `/auth/relogin` y `/auth/logout`. El token
 * definitivo no lleva esa ability (solo, opcionalmente, `remember_me`), así que
 * aquí se comprueba en negativo: no se puede exigir una ability de "acceso
 * completo" porque los tokens definitivos no la tienen.
 *
 * Responde 403 y no 401: el frontend trata el 401 como sesión expirada y cierra
 * la sesión, y aquí la sesión es válida pero está a medio verificar.
 *
 * Ojo: `can()` devuelve true para cualquier ability en un token con `*` y en un
 * TransientToken (sesión web). La app no emite ninguno de los dos, y si se
 * emitieran se tratarían como no verificados, que es el lado seguro.
 */
class EnsureTwoFactorCompleted
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->user()?->currentAccessToken();

        if ($token === null || $token->can('2fa_required')) {
            abort(response()->json([
                'status' => 403,
                'msg' => 'Completa la verificación en dos pasos para continuar',
            ], 403));
        }

        return $next($request);
    }
}
