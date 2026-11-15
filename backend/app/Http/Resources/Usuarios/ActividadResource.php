<?php

namespace App\Http\Resources\Usuarios;

use App\Models\Usuarios\Actividad;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Evento de la bitácora: `{id, tipo, titulo, actor, meta, created_at}`.
 * `titulo` se calcula desde `tipo` y `meta` (no se guarda); `actor` es
 * `{id, name}` o `null` (el sistema o la propia persona). Espera cargada la
 * relación `actor`.
 *
 * @mixin Actividad
 */
class ActividadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tipo' => $this->tipo->value,
            'titulo' => $this->titulo(),
            'actor' => $this->actor ? ['id' => $this->actor->id, 'name' => $this->actor->name] : null,
            'meta' => $this->meta,
            'created_at' => $this->created_at->toJSON(),
        ];
    }
}
