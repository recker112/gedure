<?php

use App\Models\Auth\SecurityCode;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Tokens de Sanctum inactivos más allá de su ventana o caducados (tope absoluto
// o expires_at, incluido el temporal del 2FA sin canjear). Cubre lo que hacía
// `sanctum:prune-expired`. Lo ejecuta el contenedor `schedule` (schedule:work).
Schedule::command('auth:prune-idle-tokens')->daily();

// Códigos de seguridad (2FA y restablecimiento) usados o caducados.
Schedule::command('model:prune', ['--model' => [SecurityCode::class]])->daily();
