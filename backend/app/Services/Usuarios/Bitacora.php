<?php

namespace App\Services\Usuarios;

use App\Enums\Usuarios\TipoActividad;
use App\Models\User;
use App\Models\Usuarios\Actividad;

/**
 * Escritura explícita de la bitácora (`actividades`). La llaman los Services,
 * que conocen al actor y el cambio; nunca los eventos de spatie.
 *
 * Sin transacción propia: se llama dentro de la del Service, así que si esta se
 * deshace, el evento también.
 */
class Bitacora
{
    /**
     * Registra un evento en la bitácora de `$sujeto`. `$actor` null = el sistema
     * o la propia persona.
     *
     * @param  array<string, mixed>  $meta
     */
    public function registrar(User $sujeto, TipoActividad $tipo, ?User $actor = null, array $meta = []): Actividad
    {
        return Actividad::create([
            'user_id' => $sujeto->getKey(),
            'actor_id' => $actor?->getKey(),
            'tipo' => $tipo,
            'meta' => $meta ?: null,
        ]);
    }
}
