<?php

namespace App\Http\Requests\Usuarios;

use App\Models\User;
use App\Services\Usuarios\UserAccessService;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Spatie\Permission\Guard;

/**
 * `POST /usuarios` `{name, username, email, telefono?, direccion?, sexo?,
 * roles: string[], permissions?: string[], enviar_activacion: bool}`.
 *
 * Orden: middleware 403 → `UserPolicy::create` 403 (dar `owner` sin serlo) →
 * `rules()` 422 → `GrantGuard` 403 (en `UsuarioService::crear`).
 */
class StoreUsuarioRequest extends FormRequest
{
    use ReglasUsuario;

    public function authorize(): Response
    {
        return Gate::forUser($this->user())->inspect('create', [User::class, $this->roleNames()]);
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        $guard = Guard::getDefaultName(User::class);

        return [
            ...$this->reglasDatos($this->roleNames()),
            'roles' => ['present', 'array', 'max:'.UserAccessService::maxRoles()],
            'roles.*' => ['string', 'distinct', Rule::exists('roles', 'name')->where('guard_name', $guard)],
            'permissions' => ['sometimes', 'array', 'max:'.UserAccessService::maxPermissions()],
            'permissions.*' => ['string', 'distinct', Rule::exists('permissions', 'name')->where('guard_name', $guard)],
            'enviar_activacion' => ['required', 'boolean'],
        ];
    }

    /** @return array<int, string> */
    private function roleNames(): array
    {
        return array_values(array_filter((array) $this->input('roles'), 'is_string'));
    }
}
