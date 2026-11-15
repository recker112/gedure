<?php

use App\Http\Middleware\EnsureAccountActive;
use App\Http\Middleware\EnsureTwoFactorCompleted;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Laravel\Sanctum\Exceptions\MissingAbilityException;
use Laravel\Sanctum\Http\Middleware\CheckAbilities;
use Laravel\Sanctum\Http\Middleware\CheckForAnyAbility;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;
use Spatie\Permission\Middleware\RoleOrPermissionMiddleware;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withBroadcasting(
        __DIR__.'/../routes/channels.php',
        // POST /api/broadcasting/auth con `Authorization: Bearer <token>`. Solo
        // los tokens que ya superaron el 2FA pueden autorizar canales privados.
        ['prefix' => 'api', 'middleware' => ['auth.full']],
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // La app corre detrás de Nginx Proxy Manager -> Caddy (FrankenPHP), ambos
        // en redes privadas de Docker. Solo los rangos privados son proxies.
        // No usar '*': en Laravel equivale a confiar en 0.0.0.0/0, con lo que todas
        // las entradas de X-Forwarded-For pasan por proxies y `ip()` devuelve la de
        // más a la izquierda, que la escribe el cliente (se saltaría el rate
        // limiting por IP). Así `ip()` es la primera IP pública empezando por la
        // derecha: la que añade Nginx Proxy Manager. Mismos rangos que
        // `trusted_proxies static private_ranges` en docker/prod/Caddyfile.
        $middleware->trustProxies(at: [
            '10.0.0.0/8',
            '172.16.0.0/12',
            '192.168.0.0/16',
            '127.0.0.0/8',
            'fd00::/8',
            '::1',
        ]);

        // Un solo alias(): cada llamada REEMPLAZA los alias de la anterior.
        $middleware->alias([
            // Spatie Permission (docs/backend/permisos.md)
            'role' => RoleMiddleware::class,
            'permission' => PermissionMiddleware::class,
            'role_or_permission' => RoleOrPermissionMiddleware::class,

            // Sanctum: abilities de los tokens y token con el 2FA completado
            'abilities' => CheckAbilities::class,
            'ability' => CheckForAnyAbility::class,
            'tfa.completed' => EnsureTwoFactorCompleted::class,

            // Cuenta no suspendida (403 `{status, msg}`), dentro de `auth.full`
            'account.active' => EnsureAccountActive::class,
        ]);

        // Acceso completo: autenticado, con el 2FA superado y la cuenta no suspendida.
        // Es el middleware por defecto de cualquier ruta privada; el token temporal
        // del login solo pasa por las rutas que usan `auth:sanctum` a secas (ver
        // routes/api/auth/auth.api.php). Las bajas no llegan: Sanctum no las
        // encuentra (SoftDeletes) y responde 401.
        $middleware->group('auth.full', ['auth:sanctum', 'tfa.completed', 'account.active']);

        // Sin `Accept: application/json`, `Authenticate` llama a esta redirección y,
        // por defecto, a `route('login')`, que no existe (500). En `api/*` se devuelve
        // null: el handler responde 401 JSON (`shouldRenderJsonWhen`). Fuera de la
        // API, el login es de la SPA.
        $middleware->redirectGuestsTo(
            fn (Request $request) => $request->is('api/*') ? null : '/login',
        );
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        // 403 de autorización, siempre `{status: 403, msg}` y nunca 401 (el frontend
        // reserva el 401 para la sesión expirada). Solo en la API / JSON.
        //
        // AccessDeniedHttpException llega de dos sitios: una AuthorizationException
        // (política o Gate denegados, `authorize()`, `can:`) que el handler convierte
        // antes de llamar a los callbacks, y que se reconoce por getPrevious(); y la
        // denegación de un canal en /api/broadcasting/auth.
        // - MissingAbilityException (es una AuthorizationException): el token no tiene
        //   la ability que pide la ruta (p. ej. un token definitivo en /auth/2fa).
        // - Una política que deniega con mensaje propio (`Response::deny('...')`)
        //   conserva su mensaje; la denegación por defecto se traduce.
        $exceptions->render(function (AccessDeniedHttpException $e, Request $request) {
            if (! ($request->is('api/*') || $request->expectsJson())) {
                return null;
            }

            $previous = $e->getPrevious();

            if ($previous instanceof MissingAbilityException) {
                $msg = __('permission.token_ability');
            } elseif ($previous instanceof AuthorizationException
                && ! in_array($previous->getMessage(), ['', 'This action is unauthorized.'], true)) {
                $msg = $previous->getMessage();
            } else {
                $msg = __('permission.forbidden');
            }

            return response()->json(['status' => 403, 'msg' => $msg], 403);
        });

        // Middleware `permission:`, `role:` y `role_or_permission:` de spatie. El
        // mensaje del paquete (en inglés y con los permisos que faltan) no se expone.
        $exceptions->render(function (UnauthorizedException $e, Request $request) {
            if (! ($request->is('api/*') || $request->expectsJson())) {
                return null;
            }

            return response()->json(['status' => 403, 'msg' => __('permission.forbidden')], 403);
        });
    })->create();
