<?php

use App\Enums\Permission;
use App\Http\Controllers\Usuarios\UserAccessController;
use Illuminate\Support\Facades\Route;

/**
 * Roles y permisos directos de una persona (docs/fases/fase-1-usuarios.md §4.3).
 * Dentro de `auth.full`, sin prefijo de módulo. Cada ruta pide su permiso en el
 * middleware: sin él, 403 aunque la persona no exista. Después, 404 y Policies
 * (owner ajeno, dar/quitar `owner`), validación y las reglas de
 * `UserAccessService` (422 y delegación 403). El bloque nunca toca `owner`.
 */
Route::middleware('permission:'.Permission::UsuariosRolUpdate->value)->group(function () {
    Route::post('/usuarios/roles/bloque', [UserAccessController::class, 'bloque'])->name('usuarios.roles.bloque');
    Route::put('/usuarios/{id}/roles', [UserAccessController::class, 'roles'])->whereNumber('id')->name('usuarios.roles.update');
});

Route::put('/usuarios/{id}/permisos', [UserAccessController::class, 'permisos'])
    ->whereNumber('id')
    ->middleware('permission:'.Permission::UsuariosPermisoUpdate->value)
    ->name('usuarios.permisos.update');
