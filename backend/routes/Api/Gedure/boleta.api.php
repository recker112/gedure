<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\Gedure\BoletaController;

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

// Get users with boletas
Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_index'])
	->get('boleta', [BoletaController::class, 'index']);

// Show boletas
Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_index'])
	->get('boleta/{id}', [BoletaController::class, 'show']);

// Show boletas studiends
Route::middleware(['auth:api', 'scopes:user'])
	->get('boletas', [BoletaController::class, 'showStudiend']);

// Upload boletas
Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_upload'])
	->post('boleta', [BoletaController::class, 'upload']);

// Edit boleta
Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_edit'])
	->put('boleta/{boleta}', [BoletaController::class, 'edit']);

// Download boleta
Route::middleware(['auth:api'])
	->get('download/boleta/{boleta}', [BoletaController::class, 'download']);

// Eliminar boleta
Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_destroy'])
	->delete('boleta/{boleta}', [BoletaController::class, 'destroy']);

// Massive destroy boleta
Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_destroy'])
	->delete('massive/boleta', [BoletaController::class, 'destroyMassive']);