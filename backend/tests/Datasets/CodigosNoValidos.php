<?php

use App\Models\Auth\SecurityCode;
use App\Models\User;

/**
 * Códigos que la verificación debe rechazar, tanto en el 2FA como en el cambio
 * de contraseña. Cada caso recibe el usuario y el tipo de código del flujo
 * (`two_factor_auth` o `password_reset`) y devuelve el valor que se envía.
 */
dataset('códigos no válidos', [
    'valor incorrecto' => [fn (User $user, string $tipo) => otroCodigo(
        SecurityCode::factory()->for($user)->create(['type' => $tipo])->code,
    )],
    'caducado' => [fn (User $user, string $tipo) => SecurityCode::factory()
        ->for($user)->expired()->create(['type' => $tipo])->code],
    'ya usado' => [fn (User $user, string $tipo) => SecurityCode::factory()
        ->for($user)->used()->create(['type' => $tipo])->code],
    'del otro tipo' => [fn (User $user, string $tipo) => SecurityCode::factory()
        ->for($user)->create(['type' => $tipo === 'two_factor_auth' ? 'password_reset' : 'two_factor_auth'])->code],
    'de otro usuario' => [fn (User $user, string $tipo) => SecurityCode::factory()
        ->create(['type' => $tipo])->code],
    'sin código pendiente' => [fn (User $user, string $tipo) => 'ABCDEF'],
]);
