<?php

namespace App\Providers;

use App\Models\Auth\PersonalAccessToken;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
        $this->configureTokenExpiration();
    }

    /**
     * Caducidad por inactividad de los tokens de Sanctum (config/sanctum.php,
     * `idle_remember` / `idle_session`).
     *
     * Sanctum ya ha comprobado el tope absoluto (`expiration`) y el `expires_at`
     * del token al llamar al callback (`$isValid`), y actualiza `last_used_at`
     * DESPUÉS de él (Laravel\Sanctum\Guard), así que aquí se ve el último uso
     * anterior a esta petición.
     */
    protected function configureTokenExpiration(): void
    {
        Sanctum::authenticateAccessTokensUsing(function (PersonalAccessToken $token, bool $isValid): bool {
            if (! $isValid) {
                return false;
            }

            return ! $token->isIdle();
        });
    }

    /**
     * Limitadores de las rutas de autenticación (`throttle:<nombre>`).
     *
     * La clave es SOLO la IP del cliente, nunca el usuario, la cédula ni el
     * correo: con una clave por cuenta, un atacante podría agotar a propósito el
     * cupo de una víctima y bloquearle el login o el restablecimiento de
     * contraseña. Laravel antepone el nombre del limitador a la clave, así que no
     * chocan entre sí; dentro de un mismo limitador, en cambio, dos límites con la
     * misma clave comparten contador, por eso los límites por hora llevan el
     * prefijo `hora|`.
     *
     * Depende de que `$request->ip()` sea la IP real detrás de Nginx Proxy Manager
     * y Caddy: ver `trustProxies` en bootstrap/app.php.
     */
    protected function configureRateLimiting(): void
    {
        // Credenciales: tras la contraseña aún hace falta el 2FA, así que 10/min
        // basta para frenar la fuerza bruta sin molestar a un aula tras NAT
        RateLimiter::for('auth.login', fn (Request $request) => [
            $this->limit(Limit::perMinute(10)->by($request->ip())),
        ]);

        // Código del 2FA: 6 caracteres de 31 símbolos (~887 M combinaciones) que
        // caducan a los 15 min y admiten 5 fallos; 10/min por IP lo hace inalcanzable
        RateLimiter::for('auth.2fa', fn (Request $request) => [
            $this->limit(Limit::perMinute(10)->by($request->ip())),
        ]);

        // Reenvío del código del 2FA: manda correos, así que se limita también por hora
        RateLimiter::for('auth.2fa.resend', fn (Request $request) => [
            $this->limit(Limit::perMinute(3)->by($request->ip())),
            $this->limit(Limit::perHour(20)->by('hora|'.$request->ip())),
        ]);

        // Envío del código para restablecer la contraseña (pública): manda correos
        RateLimiter::for('auth.security.email', fn (Request $request) => [
            $this->limit(Limit::perMinute(3)->by($request->ip())),
            $this->limit(Limit::perHour(20)->by('hora|'.$request->ip())),
        ]);

        // Cambio de contraseña con el código (pública): el tope por hora frena la
        // fuerza bruta sostenida desde una IP; un usuario legítimo no pasa de unos pocos
        RateLimiter::for('auth.security.password', fn (Request $request) => [
            $this->limit(Limit::perMinute(10)->by($request->ip())),
            $this->limit(Limit::perHour(40)->by('hora|'.$request->ip())),
        ]);
    }

    /**
     * Respuesta 429 en el mismo formato que el resto de la API.
     */
    protected function limit(Limit $limit): Limit
    {
        return $limit->response(fn (Request $request, array $headers) => response()->json([
            'status' => 429,
            'msg' => 'Demasiados intentos. Espera un momento e inténtalo de nuevo',
        ], 429, $headers));
    }
}
