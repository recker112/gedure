<?php

namespace App\Models\Usuarios;

use App\Enums\Usuarios\TipoActividad;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Evento de la bitácora de una persona. Solo se crea (sin `updated_at`) y se
 * escribe con `App\Services\Usuarios\Bitacora`. El título se calcula con
 * `TipoActividad::title($meta)`.
 */
#[Table('actividades')]
#[Fillable(['user_id', 'actor_id', 'tipo', 'meta', 'created_at'])]
class Actividad extends Model
{
    public const UPDATED_AT = null;

    /** @return array<string, string> */
    protected function casts(): array
    {
        // `json:unicode` guarda "Martínez" sin escapar (búsquedas con LIKE sobre `meta`)
        return [
            'tipo' => TipoActividad::class,
            'meta' => 'json:unicode',
            'created_at' => 'datetime',
        ];
    }

    /** Título del evento (no se guarda). */
    public function titulo(): string
    {
        return $this->tipo->title($this->meta ?? []);
    }

    /**
     * Sujeto del evento, también dado de baja: las bajas conservan su bitácora.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    /**
     * Quien hizo la acción (`null` si fue el sistema o la propia persona), también
     * dado de baja: su nombre no se pierde.
     *
     * @return BelongsTo<User, $this>
     */
    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id')->withTrashed();
    }
}
