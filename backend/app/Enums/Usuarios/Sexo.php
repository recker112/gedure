<?php

namespace App\Enums\Usuarios;

/**
 * Sexo de una persona (`users.sexo`, `char(1)`).
 */
enum Sexo: string
{
    case Femenino = 'F';
    case Masculino = 'M';

    public function label(): string
    {
        return match ($this) {
            self::Femenino => 'Femenino',
            self::Masculino => 'Masculino',
        };
    }
}
