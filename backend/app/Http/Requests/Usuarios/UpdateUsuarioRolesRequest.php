<?php

namespace App\Http\Requests\Usuarios;

use App\Models\User;
use App\Services\Usuarios\UserAccessService;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Spatie\Permission\Guard;

/**
 * `PUT /usuarios/{id}/roles` `{roles: string[]}`: la lista completa de roles que
 * quedan (`[]` los quita todos). Tras el 404 y `UserPolicy::manage`, comprueba
 * `UserPolicy::changeOwnerRole` (403) antes de validar el cuerpo: con un cuerpo
 * mal formado solo cuentan los nombres que sean texto.
 */
class UpdateUsuarioRolesRequest extends UsuarioTargetRequest
{
    public function authorize(): Response
    {
        $response = parent::authorize();

        return $response->allowed()
            ? Gate::forUser($this->user())->inspect('changeOwnerRole', [$this->target(), $this->roleNames()])
            : $response;
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [
            'roles' => ['present', 'array', 'max:'.UserAccessService::maxRoles()],
            'roles.*' => ['string', 'distinct', Rule::exists('roles', 'name')->where('guard_name', Guard::getDefaultName(User::class))],
        ];
    }

    /** @return array<int, string> */
    private function roleNames(): array
    {
        return array_values(array_filter((array) $this->input('roles'), 'is_string'));
    }
}
