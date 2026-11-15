<?php

namespace App\Support;

/**
 * Teléfono venezolano normalizado `0412-1234567` (docs/fases/fase-1-usuarios.md
 * §2.1). Acepta lo que se escribe a mano (`04121234567`, `0412 123 45 67`,
 * `+58 412-1234567`) y lo lleva a esa forma; lo que no reconoce lo devuelve tal
 * cual para que la validación (`Telefono::REGEX`) lo rechace.
 */
final class Telefono
{
    public const REGEX = '/^0\d{3}-\d{7}$/D';

    public static function normalizar(mixed $valor): mixed
    {
        if (! is_string($valor)) {
            return $valor;
        }

        if (preg_match('/^[\d\s().+\-]+$/', $valor) !== 1) {
            return $valor;
        }

        $digitos = (string) preg_replace('/\D/', '', $valor);

        if (strlen($digitos) === 12 && str_starts_with($digitos, '58')) {
            $digitos = '0'.substr($digitos, 2);
        } elseif (strlen($digitos) === 10 && ! str_starts_with($digitos, '0')) {
            $digitos = '0'.$digitos;
        }

        return strlen($digitos) === 11 && str_starts_with($digitos, '0')
            ? substr($digitos, 0, 4).'-'.substr($digitos, 4)
            : $valor;
    }
}
