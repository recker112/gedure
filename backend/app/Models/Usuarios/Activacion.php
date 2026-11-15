<?php

namespace App\Models\Usuarios;

use App\Models\User;
use Database\Factories\Usuarios\ActivacionFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\MassPrunable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Enlace de un solo uso para que una cuenta creada por administración elija su
 * contraseña (docs/fases/fase-1-usuarios.md §2.2). Una fila por persona
 * (`user_id` único): reenviar rota el token en la misma fila, así que el
 * enlace anterior deja de valer.
 *
 * En BD solo se guarda `token_hash` (`sha256` del token de 64 caracteres); el
 * claro solo va en el correo. Se busca por el hash con `Activacion::hash()`.
 * La escribe `App\Services\Usuarios\ActivacionService`.
 */
#[Table('activaciones')]
#[Fillable(['user_id', 'token_hash', 'enviada_por', 'sent_at', 'expires_at', 'used_at'])]
#[Hidden(['token_hash'])]
class Activacion extends Model
{
    /** @use HasFactory<ActivacionFactory> */
    use HasFactory, MassPrunable;

    /** Longitud del token en claro (`[A-Za-z0-9]{64}`, la que acepta la ruta pública). */
    public const TOKEN_LENGTH = 64;

    /** `sha256` del token en claro: lo que se guarda y por lo que se busca. */
    public static function hash(string $token): string
    {
        return hash('sha256', $token);
    }

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'sent_at' => 'datetime',
            'expires_at' => 'datetime',
            'used_at' => 'datetime',
        ];
    }

    public function isUsed(): bool
    {
        return $this->used_at !== null;
    }

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    /**
     * `model:prune` (routes/console.php): usadas o caducadas hace más de
     * `usuarios.activacion.conservar_dias` días.
     */
    public function prunable(): Builder
    {
        $limite = now()->subDays((int) config('usuarios.activacion.conservar_dias'));

        return static::where(fn (Builder $q) => $q
            ->where('used_at', '<', $limite)
            ->orWhere('expires_at', '<', $limite));
    }

    /**
     * La cuenta que se activa, también dada de baja (para responder 410).
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    /**
     * Quien la envió por última vez, también dado de baja.
     *
     * @return BelongsTo<User, $this>
     */
    public function enviadaPor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'enviada_por')->withTrashed();
    }
}
