<?php

namespace App\Http\Requests\Auth;

use App\Models\Usuarios\Activacion;
use App\Services\Usuarios\ActivacionService;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Base de las rutas públicas `/auth/activacion/{token}` (ver y activar), sin
 * sesión. `authorize()` corre antes que la validación, así que el orden queda:
 *
 *   throttle 429 → token 404 → 410 (usado, caducado, cuenta de baja o suspendida) → 422 de campo
 *
 * Con un enlace que ya no vale no se valida nada del cuerpo. La activación
 * abierta se lee con `target()`.
 */
class ActivacionTokenRequest extends FormRequest
{
    private ?Activacion $target = null;

    public function authorize(ActivacionService $activaciones): bool
    {
        $this->target = $activaciones->abrir((string) $this->route('token'));

        return true;
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [];
    }

    /** La activación de `{token}`, aún utilizable, con su `user` cargado. */
    public function target(): Activacion
    {
        return $this->target;
    }
}
