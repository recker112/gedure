<?php

namespace App\Http\Requests\Usuarios;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Filtros de `GET /usuarios`. El permiso lo exige el middleware de la ruta.
 *
 * - `q`: nombre, cédula/usuario o correo.
 * - `rol`: nombre del rol, o `none` = personas sin ningún rol. Un rol que no
 *   existe no es un error: el listado sale vacío.
 * - `estado`: `actuales` (por defecto, sin bajas), `activos`, `pendientes`,
 *   `suspendidos`, `bajas` o `todos` (`User::conEstado()`).
 * - `orden`: `nombre` (por defecto) o `-last_login_at` (último acceso primero).
 * - `page`, `per_page` (25 por defecto, máx. 100).
 */
class IndexUsuariosRequest extends FormRequest
{
    public const POR_PAGINA = 25;

    public const ORDENES = ['nombre', '-last_login_at'];

    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [
            'q' => ['nullable', 'string', 'max:100'],
            'rol' => ['nullable', 'string', 'max:50'],
            'estado' => ['nullable', Rule::in(User::FILTROS_ESTADO)],
            'orden' => ['nullable', Rule::in(self::ORDENES)],
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ];
    }
}
