<?php

namespace App\Enums\Usuarios;

/**
 * Estado de la cuenta de una persona. No se guarda: lo deriva `User::estado()`
 * de las fechas, con esta prioridad: `baja` (manda) → `suspendido` →
 * `pendiente` (aún no eligió contraseña) → `activo`.
 */
enum EstadoCuenta: string
{
    case Activo = 'activo';
    case Pendiente = 'pendiente';
    case Suspendido = 'suspendido';
    case Baja = 'baja';
}
