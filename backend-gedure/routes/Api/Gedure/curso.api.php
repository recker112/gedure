<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\Gedure\CursoController;

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

// Get cursos
Route::middleware(['auth:api', 'scopes:admin', 'can:cursos_index'])
	->get('curso', [CursoController::class, 'index']);

// Create curso
Route::middleware(['auth:api', 'scopes:admin', 'can:cursos_create'])
	->post('curso', [CursoController::class, 'create']);

// Delete curso
Route::middleware(['auth:api', 'scopes:admin', 'can:cursos_destroy'])
	->delete('curso/{id}', [CursoController::class, 'destroy']);

// Destroy massive curso
Route::middleware(['auth:api', 'scopes:admin', 'can:cursos_destroy'])
	->delete('massive/curso', [CursoController::class, 'destroyMassive']);

// Find Like Curso
	Route::middleware(['auth:api', 'scopes:admin', 'permission:debt_lote_create|users_create'])
		->get('find/curso', [CursoController::class, 'findLike']);