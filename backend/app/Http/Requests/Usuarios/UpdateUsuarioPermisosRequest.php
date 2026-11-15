<?php

namespace App\Http\Requests\Usuarios;

use App\Models\User;
use App\Services\Usuarios\UserAccessService;
use Illuminate\Validation\Rule;
use Spatie\Permission\Guard;

/**
 * `PUT /usuarios/{id}/permisos` `{permissions: string[]}`: la lista completa de
 * permisos **directos** que quedan (`[]` los quita todos); los de los roles no
 * se tocan. Cada permiso debe existir en la BD (= el catálogo).
 */
class UpdateUsuarioPermisosRequest extends UsuarioTargetRequest
{
    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [
            'permissions' => ['present', 'array', 'max:'.UserAccessService::maxPermissions()],
            'permissions.*' => ['string', 'distinct', Rule::exists('permissions', 'name')->where('guard_name', Guard::getDefaultName(User::class))],
        ];
    }
}
