<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\Gedure\GedureConfigController;

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
Route::middleware(['auth:api', 'scopes:admin', 'can:gc_index'])
	->get('gc', [GedureConfigController::class, 'index']);

// Get cursos
Route::middleware(['auth:api', 'scopes:admin', 'can:gc_edit'])
	->post('gc', [GedureConfigController::class, 'edit']);