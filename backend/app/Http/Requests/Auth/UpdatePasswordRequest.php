<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdatePasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * `new_password` sigue `Password::defaults()` (sin configurar: mínimo 8
     * caracteres) y exige `new_password_confirmation`.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'login' => ['required', 'string', 'max:255'],
            'otp' => ['required', 'string', 'size:6'],
            'new_password' => ['required', 'string', 'confirmed', Password::defaults()],
        ];
    }
}
