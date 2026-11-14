<?php

namespace App\Console\Commands;

use App\Models\Auth\PersonalAccessToken;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;

/**
 * Borra los tokens que ya no autentican: los que llevan más tiempo sin usarse
 * que su ventana de inactividad (config/sanctum.php, `idle_remember` /
 * `idle_session`) y los que superan el tope absoluto `expiration` o su
 * `expires_at` (incluido el temporal del 2FA que nunca se canjeó). Solo limpia
 * la tabla: ninguno de ellos autentica (ver AppServiceProvider). Sustituye a
 * `sanctum:prune-expired`; se programa en routes/console.php.
 */
#[Signature('auth:prune-idle-tokens')]
#[Description('Borra los tokens de Sanctum inactivos o caducados')]
class PruneIdleTokens extends Command
{
    public function handle(): int
    {
        $deleted = 0;

        // Prefiltro en SQL; la ventana exacta de cada token se comprueba después.
        // Se recorre por lotes, sin cargar todo en memoria.
        PersonalAccessToken::query()
            ->where(fn (Builder $q) => $q->maybeIdle()->orWhere(fn (Builder $q) => $this->expired($q)))
            ->chunkById(500, function ($tokens) use (&$deleted) {
                $purgeable = $tokens->filter(fn (PersonalAccessToken $t) => $t->isIdle() || $t->isExpired());

                if ($purgeable->isNotEmpty()) {
                    $deleted += PersonalAccessToken::whereKey($purgeable->modelKeys())->delete();
                }
            });

        $this->info("Tokens caducados o inactivos borrados: {$deleted}");

        return self::SUCCESS;
    }

    /**
     * Prefiltro SQL de `isExpired()`: `expires_at` pasado o tope `expiration`.
     */
    private function expired(Builder $query): void
    {
        $expiration = (int) config('sanctum.expiration');

        $query
            ->where('expires_at', '<', now())
            ->when($expiration > 0, fn (Builder $q) => $q->orWhere('created_at', '<=', now()->subMinutes($expiration)));
    }
}
