<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Persona de la sesión (`user` de login, 2FA y relogin): lo mínimo que pinta la
 * interfaz. Se arma campo a campo para no serializar relaciones ni columnas
 * internas.
 *
 * @mixin User
 */
class SessionUserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
        ];
    }
}
