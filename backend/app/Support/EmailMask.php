<?php

namespace App\Support;

/**
 * Enmascara un correo para mostrarlo o guardarlo sin exponerlo entero (página
 * pública de activación, bitácora de `correo_cambiado`, aviso al correo
 * anterior): la primera letra del usuario, `***` y el dominio completo
 *
 * (`ana.perez@example.com` queda `a***@example.com`).
 */
final class EmailMask
{
    public static function mask(string $email): string
    {
        $at = strrpos($email, '@');

        if ($at === false || $at === 0) {
            return '***';
        }

        return mb_substr($email, 0, 1).'***'.substr($email, $at);
    }
}
