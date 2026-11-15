<?php

use App\Http\Controllers\Auth\ActivacionController;
use App\Models\Usuarios\Activacion;
use Illuminate\Support\Facades\Route;

/**
 * Activación de cuentas creadas por administración (docs/fases/fase-1-usuarios.md
 * §4.4). Públicas (fuera de `auth.full`) y limitadas por IP (ver
 * AppServiceProvider). Un token que no tenga la forma del enlace (64
 * alfanuméricos) no llega al controlador: 404.
 */
Route::middleware('throttle:auth.activacion')
    ->where(['token' => '[A-Za-z0-9]{'.Activacion::TOKEN_LENGTH.'}'])
    ->group(function () {
        Route::get('/activacion/{token}', [ActivacionController::class, 'show'])->name('auth.activacion.show');
        Route::post('/activacion/{token}', [ActivacionController::class, 'store'])->name('auth.activacion.store');
    });
