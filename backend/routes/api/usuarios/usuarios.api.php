<?php

use App\Enums\Permission;
use App\Http\Controllers\Usuarios\ActividadController;
use App\Http\Controllers\Usuarios\UsuarioController;
use Illuminate\Support\Facades\Route;

/**
 * Personas (docs/fases/fase-1-usuarios.md §4.2). Se carga dentro del grupo
 * `auth.full` de routes/api.php, sin prefijo de módulo en la URL. Cada ruta pide
 * su permiso en el middleware: sin él, 403 aunque la persona no exista. `{id}`
 * es numérico.
 */
Route::middleware('permission:'.Permission::UsuariosUsuarioShow->value)->group(function () {
    Route::get('/usuarios', [UsuarioController::class, 'index'])->name('usuarios.usuarios.index');
    Route::get('/usuarios/{id}', [UsuarioController::class, 'show'])->whereNumber('id')->name('usuarios.usuarios.show');
    Route::get('/usuarios/{id}/actividad', [ActividadController::class, 'index'])->whereNumber('id')->name('usuarios.actividad.index');
});
