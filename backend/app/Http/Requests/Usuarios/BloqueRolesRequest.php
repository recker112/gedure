<?php

namespace App\Http\Requests\Usuarios;

use App\Enums\Role;
use App\Models\User;
use App\Services\Usuarios\UserAccessService;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use Spatie\Permission\Guard;

/**
 * `POST /usuarios/roles/bloque` `{user_ids: int[], add?: string[], remove?: string[]}`.
 * Valida el cuerpo entero (422 de campo); cada persona se comprueba después en
 * `UserAccessService::bulkRoles`. El permiso (`usuarios.rol.update`) lo exige el
 * middleware de la ruta.
 *
 * `add` y `remove` son opcionales, pero no pueden ir los dos vacíos (error en
 * `roles`); `owner` no se da ni se quita en bloque y un rol no puede estar en
 * los dos. Como mucho `UserAccessService::BULK_MAX` personas.
 */
class BloqueRolesRequest extends FormRequest
{
    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        $exists = Rule::exists('roles', 'name')->where('guard_name', Guard::getDefaultName(User::class));

        return [
            'user_ids' => ['required', 'array', 'max:'.UserAccessService::BULK_MAX],
            'user_ids.*' => ['integer'],
            'add' => ['sometimes', 'array', 'max:'.UserAccessService::maxRoles()],
            'add.*' => ['bail', 'string', 'distinct', $exists, $this->notOwner('usuarios.bloque.owner_agregar')],
            'remove' => ['sometimes', 'array', 'max:'.UserAccessService::maxRoles()],
            'remove.*' => ['bail', 'string', 'distinct', $exists, $this->notOwner('usuarios.bloque.owner_quitar'), $this->notInAdd()],
        ];
    }

    /** @return array<int, Closure(Validator): void> */
    public function after(): array
    {
        return [function (Validator $validator) {
            $add = $this->input('add', []);
            $remove = $this->input('remove', []);

            if (is_array($add) && is_array($remove) && $add === [] && $remove === []) {
                $validator->errors()->add('roles', __('usuarios.bloque.vacio'));
            }
        }];
    }

    /** @return array<int, int> ids sin repetir, en el orden recibido */
    public function userIds(): array
    {
        return array_values(array_unique(array_map('intval', $this->validated('user_ids'))));
    }

    /** @return array<int, string> */
    public function rolesToAdd(): array
    {
        return array_values($this->validated('add') ?? []);
    }

    /** @return array<int, string> */
    public function rolesToRemove(): array
    {
        return array_values($this->validated('remove') ?? []);
    }

    private function notOwner(string $msg): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail) use ($msg) {
            if ($value === Role::Owner->value) {
                $fail(__($msg));
            }
        };
    }

    /** El rol no puede estar también en `add`. */
    private function notInAdd(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail) {
            if (in_array($value, (array) $this->input('add', []), true)) {
                $fail(__('usuarios.bloque.ambos', ['rol' => $value]));
            }
        };
    }
}
