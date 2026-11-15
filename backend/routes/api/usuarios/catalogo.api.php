<?php

use App\Enums\Permission;
use App\Http\Controllers\Usuarios\AccessCatalogController;
use Illuminate\Support\Facades\Route;

/**
 * Catálogo de roles y permisos (docs/backend/permisos.md, fase 1 §4.3), para el
 * editor de acceso de la ficha. Dentro de `auth.full`, sin prefijo de módulo.
 */
Route::middleware('permission:'.Permission::UsuariosUsuarioShow->value)->group(function () {
    Route::get('/roles', [AccessCatalogController::class, 'roles'])->name('usuarios.roles.index');
    Route::get('/permisos', [AccessCatalogController::class, 'permisos'])->name('usuarios.permisos.index');
});
