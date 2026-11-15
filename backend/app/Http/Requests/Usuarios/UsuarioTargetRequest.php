<?php

namespace App\Http\Requests\Usuarios;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

/**
 * Base de las acciones sobre una cuenta `/usuarios/{id}`. Con el permiso por
 * acción en el middleware de la ruta, el orden de las respuestas queda:
 *
 *   middleware 403 → 404 (aquí) → Policy 403 (aquí) → `rules()` 422 → Service 422
 *
 * Busca con `withTrashed()`: las acciones deben encontrar a las bajas para
 * responder su 422 (o restaurarlas). El usuario cargado se lee con `target()`.
 * Las lecturas (`show`, bitácora) no la usan: no pasan por la Policy.
 */
class UsuarioTargetRequest extends FormRequest
{
    private ?User $target = null;

    public function authorize(): Response
    {
        $this->target = User::withTrashed()->find($this->route('id')) ?? abort(response()->json([
            'status' => 404,
            'msg' => __('usuarios.no_encontrado'),
        ], 404));

        return Gate::forUser($this->user())->inspect('manage', $this->target);
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [];
    }

    /** La cuenta de `{id}`, ya autorizada (también si está dada de baja). */
    public function target(): User
    {
        return $this->target;
    }
}
