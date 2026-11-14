<?php

namespace App\Models\Auth;

use App\Models\User;
use Database\Factories\Auth\SecurityCodeFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Código de un solo uso enviado por correo. `type` distingue el del doble factor
 * (`two_factor_auth`) del de restablecer la contraseña (`password_reset`).
 *
 * Un código está vigente mientras no se haya usado (`used_at` nulo) y no haya
 * caducado (`expire_at` futuro). Además deja de aceptarse cuando acumula
 * MAX_ATTEMPTS intentos fallidos, aunque luego llegue el valor correcto.
 *
 * En la BD solo se guarda `token_hash` (HMAC del código, ver hash()), nunca el
 * código en claro. `code` es un atributo virtual: al asignarlo (create, factory)
 * calcula `token_hash` y guarda el claro solo en memoria, en esa instancia, para
 * el correo y los tests. Una instancia leída de la BD (incluido `fresh()`) tiene
 * `code` a null.
 */
#[Fillable(['user_id', 'code', 'type', 'attempts', 'used_at', 'expire_at'])]
#[Hidden(['token_hash'])]
class SecurityCode extends Model
{
    /** @use HasFactory<SecurityCodeFactory> */
    use HasFactory, Prunable;

    const UPDATED_AT = null;

    /** Tipos de código. */
    public const TYPE_TWO_FACTOR = 'two_factor_auth';

    public const TYPE_PASSWORD_RESET = 'password_reset';

    /** Intentos fallidos que invalidan el código. */
    public const MAX_ATTEMPTS = 5;

    /** Minutos de validez de un código. */
    public const TTL_MINUTES = 15;

    protected $attributes = [
        'attempts' => 0,
    ];

    /** Código en claro: solo en memoria y solo en la instancia que lo creó. */
    private ?string $plainCode = null;

    /**
     * HMAC-SHA256 del código con APP_KEY, con la misma normalización con la que
     * se acepta al compararlo (sin espacios y en mayúsculas). Fuente única
     * para guardarlo y para verificarlo; rotar APP_KEY invalida los vigentes.
     */
    public static function hash(string $code): string
    {
        return hash_hmac('sha256', strtoupper(trim($code)), config('app.key'));
    }

    /**
     * Atributo virtual `code`: no es columna. Al asignarlo solo se persiste
     * `token_hash`; al leerlo devuelve el claro si esta instancia lo asignó.
     */
    protected function code(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->plainCode,
            set: function (string $value) {
                $this->plainCode = $value;

                return ['token_hash' => static::hash($value)];
            },
        );
    }

    protected function casts(): array
    {
        return [
            'attempts' => 'integer',
            'expire_at' => 'datetime',
            'used_at' => 'datetime',
        ];
    }

    /**
     * Sin usar y sin caducar (incluye los que agotaron los intentos, para poder
     * distinguir "agotado" de "no existe").
     */
    #[Scope]
    protected function pending(Builder $query): void
    {
        $query->whereNull('used_at')->where('expire_at', '>', now());
    }

    public function isExhausted(): bool
    {
        return $this->attempts >= self::MAX_ATTEMPTS;
    }

    /**
     * `model:prune` (routes/console.php): usados o caducados hace más de un día.
     */
    public function prunable(): Builder
    {
        return static::where(fn (Builder $q) => $q
            ->where('expire_at', '<', now()->subDay())
            ->orWhere('used_at', '<', now()->subDay()));
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
