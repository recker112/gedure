<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

/**
 * Tokens:
 * - El login emite un token temporal con la ability `2fa_required` (15 min).
 * - `/2fa` lo canjea por el definitivo, que no lleva `2fa_required`.
 *
 * Las rutas con `auth:sanctum` a secas aceptan también el token temporal; las de
 * `auth.full` (bootstrap/app.php) solo el definitivo. Una ruta privada nueva
 * debe ir con `auth.full` salvo que forme parte del propio flujo de login.
 */
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:auth.login')
    ->name('auth.login');

// Solo con el token temporal: un token definitivo recibe 403
Route::middleware(['auth:sanctum', 'abilities:2fa_required'])->group(function () {
    Route::post('/2fa', [AuthController::class, 'loginWith2FA'])
        ->middleware('throttle:auth.2fa')
        ->name('auth.2fa');

    Route::post('/2fa/resend', [AuthController::class, 'resendEmail'])
        ->middleware('throttle:auth.2fa.resend')
        ->name('auth.2fa.resend');
});

// Con cualquier token, temporal o definitivo:
// - relogin: el frontend lo usa al recargar para saber si sigue en el paso del 2FA
//   (token_can incluye `2fa_required`).
// - logout: permite cancelar un login a medias borrando el token temporal; solo
//   borra el token con el que se llama, así que no da acceso a nada más.
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/relogin', [AuthController::class, 'relogin'])
        ->name('auth.relogin');

    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('auth.logout');
});
