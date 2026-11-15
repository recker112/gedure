<?php

use App\Enums\Permission;
use App\Http\Controllers\Usuarios\ActividadController;
use App\Http\Controllers\Usuarios\UsuarioController;
use Illuminate\Support\Facades\Route;

/**
 * Personas (docs/fases/fase-1-usuarios.md §4.2). Se carga dentro del grupo
 * `auth.full` de routes/api.php, sin prefijo de módulo en la URL. Cada ruta pide
 * su permiso en el middleware: sin él, 403 aunque la persona no exista. `{id}`
 * es numérico. Después: 404 y `UserPolicy::manage` (403) en el FormRequest,
 * validación (422) y reglas de dominio de los Services (422).
 */
Route::middleware('permission:'.Permission::UsuariosUsuarioShow->value)->group(function () {
    Route::get('/usuarios', [UsuarioController::class, 'index'])->name('usuarios.usuarios.index');
    Route::get('/usuarios/{id}', [UsuarioController::class, 'show'])->whereNumber('id')->name('usuarios.usuarios.show');
    Route::get('/usuarios/{id}/actividad', [ActividadController::class, 'index'])->whereNumber('id')->name('usuarios.actividad.index');
});

// Alta y reenvío del enlace de activación
Route::middleware('permission:'.Permission::UsuariosUsuarioCreate->value)->group(function () {
    Route::post('/usuarios', [UsuarioController::class, 'store'])->name('usuarios.usuarios.store');
    Route::post('/usuarios/{id}/activacion', [UsuarioController::class, 'reenviarActivacion'])->whereNumber('id')->name('usuarios.activacion.store');
});

// Datos, suspensión y cierre de todas sus sesiones
Route::middleware('permission:'.Permission::UsuariosUsuarioUpdate->value)->group(function () {
    Route::patch('/usuarios/{id}', [UsuarioController::class, 'update'])->whereNumber('id')->name('usuarios.usuarios.update');
    Route::post('/usuarios/{id}/suspender', [UsuarioController::class, 'suspender'])->whereNumber('id')->name('usuarios.usuarios.suspender');
    Route::post('/usuarios/{id}/reactivar', [UsuarioController::class, 'reactivar'])->whereNumber('id')->name('usuarios.usuarios.reactivar');
    Route::delete('/usuarios/{id}/sesiones', [UsuarioController::class, 'cerrarSesiones'])->whereNumber('id')->name('usuarios.sesiones.destroy');
});

// Baja y restauración
Route::middleware('permission:'.Permission::UsuariosUsuarioDestroy->value)->group(function () {
    Route::delete('/usuarios/{id}', [UsuarioController::class, 'destroy'])->whereNumber('id')->name('usuarios.usuarios.destroy');
    Route::post('/usuarios/{id}/restaurar', [UsuarioController::class, 'restaurar'])->whereNumber('id')->name('usuarios.usuarios.restaurar');
});
