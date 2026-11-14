<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

/**
 * Token de Sanctum con la caducidad por inactividad (config/sanctum.php,
 * `idle_remember` / `idle_session`). Se registra en AppServiceProvider.
 */
class PersonalAccessToken extends SanctumPersonalAccessToken
{
    /**
     * Minutos de inactividad que aguanta el token. No se usa `can()` porque
     * devuelve true con la ability `*`.
     */
    public function idleMinutes(): int
    {
        return in_array('remember_me', $this->abilities ?? [], true)
            ? (int) config('sanctum.idle_remember')
            : (int) config('sanctum.idle_session');
    }

    /**
     * Si el último uso (o la creación) queda fuera de su ventana de inactividad.
     */
    public function isIdle(): bool
    {
        return ($this->last_used_at ?? $this->created_at)
            ->lte(now()->subMinutes($this->idleMinutes()));
    }

    /**
     * Token temporal del login, pendiente del 2FA (ability `2fa_required`). No
     * se usa `can()` porque devuelve true con la ability `*`.
     */
    public function isTemporary(): bool
    {
        return in_array('2fa_required', $this->abilities ?? [], true);
    }

    /**
     * Caducado por su `expires_at` o por el tope absoluto `sanctum.expiration`
     * desde su creación: las mismas dos comprobaciones que hace
     * `Laravel\Sanctum\Guard::isValidAccessToken()` antes de llamar al callback
     * de AppServiceProvider.
     */
    public function isExpired(): bool
    {
        $expiration = (int) config('sanctum.expiration');

        return ($expiration > 0 && $this->created_at->lte(now()->subMinutes($expiration)))
            || ($this->expires_at !== null && $this->expires_at->isPast());
    }

    /**
     * Prefiltro en SQL con la ventana más corta; la exacta de cada token se
     * comprueba después con `isIdle()`.
     */
    #[Scope]
    protected function maybeIdle(Builder $query): void
    {
        $minWindow = min((int) config('sanctum.idle_session'), (int) config('sanctum.idle_remember'));

        $query->whereRaw('COALESCE(last_used_at, created_at) < ?', [now()->subMinutes($minWindow)->toDateTimeString()]);
    }
}
