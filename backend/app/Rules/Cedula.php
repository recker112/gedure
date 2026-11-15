<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Cédula de identidad (docs/fases/fase-1-usuarios.md §2.1 y decisión 1): solo
 * dígitos para venezolanos (`12345678`) y prefijo `E` para extranjeros
 * (`E84123456`), sin puntos, guiones ni `V-`. La forma escrita a mano
 * (`V-12.345.678`, `e-84.123.456`) la convierte `Cedula::normalizar()` antes de
 * validar.
 *
 * `$maxDigitos` es 10 para las personas; los estudiantes (fase 1, PR #8) usan
 * 12 para admitir la cédula escolar en la misma columna.
 */
class Cedula implements ValidationRule
{
    public const MIN_DIGITOS = 5;

    public function __construct(private readonly int $maxDigitos = 10) {}

    /**
     * Quita `V-`, puntos, guiones y espacios y pasa la `E` a mayúscula, **solo**
     * si el resultado es una cédula; si no (p. ej. el usuario `director` de un
     * admin), devuelve el valor tal cual para que la validación lo juzgue.
     */
    public static function normalizar(mixed $valor): mixed
    {
        if (! is_string($valor)) {
            return $valor;
        }

        $limpio = strtoupper((string) preg_replace('/[\s.\-]/', '', $valor));
        $limpio = (string) preg_replace('/^V(?=\d)/', '', $limpio);

        return preg_match('/^E?\d+$/', $limpio) === 1 ? $limpio : $valor;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $patron = '/^E?\d{'.self::MIN_DIGITOS.','.$this->maxDigitos.'}$/D';

        if (! is_string($value) || preg_match($patron, $value) !== 1) {
            $fail('validation.cedula')->translate(['max' => $this->maxDigitos]);
        }
    }
}
