<?php

/**
 * Módulo de usuarios (docs/fases/fase-1-usuarios.md).
 */
return [

    /*
    |--------------------------------------------------------------------------
    | Activación de cuentas
    |--------------------------------------------------------------------------
    |
    | Días de validez del enlace de activación (§2.2, decisión 5) y días que se
    | conservan las activaciones usadas o caducadas antes de que `model:prune`
    | las borre.
    |
    */

    'activacion' => [
        'dias' => 7,
        'conservar_dias' => 30,
    ],

];
