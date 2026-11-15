<?php

namespace App\Http\Requests\Auth;

use Illuminate\Validation\Rules\Password;

/**
 * `POST /auth/activacion/{token}` `{password, password_confirmation}`: las mismas
 * reglas que el cambio de contraseña con código (`UpdatePasswordRequest`):
 * `Password::defaults()` y confirmación.
 */
class ActivarCuentaRequest extends ActivacionTokenRequest
{
    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [
            'password' => ['required', 'string', 'confirmed', Password::defaults()],
        ];
    }
}
