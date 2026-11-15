<?php

use Illuminate\Support\Facades\Route;

/**
 * API GEDURE
 *
 * El frontend consume `/api/v1`. Aquí se versionan las rutas de la API.
 *
 * La autorización de canales de broadcasting NO está aquí: la registra
 * `withBroadcasting` (bootstrap/app.php) en POST /api/broadcasting/auth.
 */
Route::prefix('v1')->group(function () {
    /**
     * Auth API (login, 2FA, sesión, códigos de seguridad y activación de cuentas). Define su propio
     * middleware ruta a ruta porque mezcla rutas públicas, rutas del token
     * temporal del 2FA y rutas de acceso completo.
     */
    Route::prefix('auth')->group(function () {
        require __DIR__.'/api/auth/auth.api.php';
        require __DIR__.'/api/auth/security_code.api.php';
        require __DIR__.'/api/auth/activacion.api.php';
    });

    /**
     * Rutas privadas: exigen un token que ya haya superado el 2FA (`auth.full`,
     * bootstrap/app.php). Cualquier ruta nueva que requiera sesión va aquí.
     */
    Route::middleware('auth.full')->group(function () {
        /**
         * Usuarios: personas, bitácora, catálogo de acceso y roles/permisos. Sin prefijo de
         * módulo en la URL (`/usuarios`, `/roles`, `/permisos`), ver
         * docs/fases/fase-1-usuarios.md §4.
         */
        require __DIR__.'/api/usuarios/usuarios.api.php';
        require __DIR__.'/api/usuarios/catalogo.api.php';
        require __DIR__.'/api/usuarios/acceso.api.php';
    });
});
