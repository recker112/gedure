<?php

namespace App\Http\Requests\Usuarios;

use App\Enums\Usuarios\TipoActividad;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\Cursor;
use Illuminate\Validation\Rule;

/**
 * Filtros de `GET /usuarios/{id}/actividad`. El permiso lo exige el middleware
 * de la ruta. `tipo` es un valor de `TipoActividad`; `cursor` es el opaco que
 * devolvió la página anterior (`next_cursor`).
 */
class IndexActividadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [
            'tipo' => ['nullable', Rule::enum(TipoActividad::class)],
            'cursor' => ['nullable', 'string', 'max:500', function (string $attribute, mixed $value, Closure $fail) {
                if (! is_string($value) || ! self::cursorValido($value)) {
                    $fail(__('validation.cursor'));
                }
            }],
        ];
    }

    /**
     * Un cursor de `cursorPaginate` sobre `created_at, id`. Laravel ignora uno que
     * no se puede decodificar, pero uno decodificable sin esas claves lanzaría
     * una excepción (500): mejor un 422.
     */
    private static function cursorValido(string $value): bool
    {
        $cursor = Cursor::fromEncoded($value);
        $parametros = $cursor?->toArray() ?? [];

        return $cursor !== null
            && is_scalar($parametros['created_at'] ?? null)
            && is_numeric($parametros['id'] ?? null);
    }
}
