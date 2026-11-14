<?php

namespace App\Enums\Auth;

/**
 * Resultado de verificar un código de seguridad (SecurityCodeService::verifyCode).
 */
enum SecurityCodeResult
{
    /** El código era correcto y ha quedado consumido. */
    case Valid;

    /** No hay código vigente o el valor no coincide (y aún quedan intentos). */
    case Invalid;

    /** El código vigente agotó sus intentos: hay que pedir uno nuevo. */
    case Exhausted;
}
