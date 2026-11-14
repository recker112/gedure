<?php

use App\Http\Controllers\Auth\SecurityCodeController;
use Illuminate\Support\Facades\Route;

// Rutas públicas (olvidé mi contraseña): limitadas por IP (ver AppServiceProvider)
Route::post('/security/email/send', [SecurityCodeController::class, 'emailSend'])
    ->middleware('throttle:auth.security.email')
    ->name('security.email.send');

Route::post('/security/password/update', [SecurityCodeController::class, 'passwordUpdate'])
    ->middleware('throttle:auth.security.password')
    ->name('security.password.update');
