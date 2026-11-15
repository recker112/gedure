<?php

namespace App\Http\Requests\Usuarios;

/** `POST /usuarios/{id}/suspender` `{motivo?: string(120)}`. */
class SuspenderUsuarioRequest extends UsuarioTargetRequest
{
    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [
            'motivo' => ['nullable', 'string', 'max:120'],
        ];
    }
}
