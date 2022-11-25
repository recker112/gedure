<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\Gedure\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Get table users
Route::middleware(['auth:api', 'scopes:admin', 'can:users_index'])
	->get('user', [UserController::class, 'index']);

// Show user
Route::middleware(['auth:api', 'scopes:admin', 'can:users_index'])
	->get('user/{id}', [UserController::class, 'show']);

// Create users
Route::middleware(['auth:api', 'scopes:admin', 'can:users_create'])
	->post('user', [UserController::class, 'create']);

// Update users
Route::middleware(['auth:api', 'scopes:admin', 'can:users_edit'])
	->put('user/{id}', [UserController::class, 'edit']);

// Update user
Route::middleware(['auth:api'])
	->put('user', [UserController::class, 'editSelf']);

// Soft delete user
Route::middleware(['auth:api', 'scopes:admin', 'can:users_delete'])
	->delete('user/{user}', [UserController::class, 'delete']);

// Matricula Upload
Route::middleware(['auth:api', 'scopes:admin', 'can:users_upload_matricula'])
	->post('user/matricula', [UserController::class, 'uploadMassiveStudiends']);

// Update seccion massive
Route::middleware(['auth:api', 'scopes:admin', 'can:users_edit'])
	->put('massive/user/seccion', [UserController::class, 'updateSeccionMassive']);

// Soft delete user massive
Route::middleware(['auth:api', 'scopes:admin', 'can:users_delete'])
	->delete('massive/user', [UserController::class, 'deleteMassive']);

// Get users disabled
Route::middleware(['auth:api', 'scopes:admin', 'can:users_disabled_index'])
	->get('user-disabled', [UserController::class, 'indexDeleted']);

// Restore user
Route::middleware(['auth:api', 'scopes:admin', 'can:users_disabled_restore'])
	->patch('user-disabled/restore/{id}', [UserController::class, 'restoreDeleted']);

// Restore user massive
Route::middleware(['auth:api', 'scopes:admin', 'can:users_disabled_restore'])
	->patch('user-disabled/restore', [UserController::class, 'restoreDeletedMassive']);

// Delete user
Route::middleware(['auth:api', 'scopes:admin', 'can:users_disabled_destroy'])
	->delete('user-disabled/{id}', [UserController::class, 'destroy']);

// Delete user massive
Route::middleware(['auth:api', 'scopes:admin', 'can:users_disabled_destroy'])
	->delete('user-disabled', [UserController::class, 'destroyMassive']);

// Find Like Users
Route::middleware(['auth:api', 'scopes:admin', 'permission:debt_lote_create|bank_transaction_assign'])
	->get('find/users', [UserController::class, 'findLike']);