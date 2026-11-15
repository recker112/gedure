<?php

namespace App\Http\Requests\Usuarios;

use App\Enums\Role;
use App\Enums\Usuarios\Sexo;
use App\Rules\Cedula;
use App\Support\Telefono;
use Illuminate\Validation\Rule;

/**
 * Reglas de los datos de una persona, comunes al alta (`StoreUsuarioRequest`) y a
 * la edición (`UpdateUsuarioRequest`), y su normalización previa.
 *
 * `username` es la cédula (`App\Rules\Cedula`) para profesores y
 * representantes; admin y owner pueden tener otro usuario (letras, números,
 * `.`, `_`, `-`; nunca `@`, que el login reserva para el correo). Cédula y
 * correo son únicos también frente a las bajas (siguen ocupándolos).
 */
trait ReglasUsuario
{
    /** Roles cuyo usuario debe ser la cédula. */
    private const ROLES_CON_CEDULA = [Role::Profesor, Role::Representante];

    /** Normaliza cédula y teléfono antes de validar (`V-12.345.678` → `12345678`). */
    protected function prepareForValidation(): void
    {
        $normalizado = [];

        if ($this->has('username')) {
            $normalizado['username'] = Cedula::normalizar($this->input('username'));
        }
        if ($this->has('telefono')) {
            $normalizado['telefono'] = Telefono::normalizar($this->input('telefono'));
        }

        $this->merge($normalizado);
    }

    /**
     * @param  array<int, string>  $roles  Roles que tendrá la persona.
     * @return array<string, array<int, mixed>>
     */
    private function reglasDatos(array $roles, ?int $ignorar = null): array
    {
        $conCedula = array_intersect($roles, array_map(fn (Role $r) => $r->value, self::ROLES_CON_CEDULA)) !== [];

        return [
            'name' => ['required', 'string', 'max:255'],
            'username' => [
                'required', 'string', 'max:50',
                $conCedula ? new Cedula : 'regex:/^[A-Za-z0-9._-]{3,50}$/D',
                Rule::unique('users', 'username')->ignore($ignorar),
            ],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($ignorar)],
            'telefono' => ['nullable', 'string', 'regex:'.Telefono::REGEX],
            'direccion' => ['nullable', 'string', 'max:255'],
            'sexo' => ['nullable', Rule::enum(Sexo::class)],
        ];
    }
}
