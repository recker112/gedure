<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\Gedure\ContactoController;

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

// CreateContacto
Route::post('contacto', [ContactoController::class, 'create']);

// GetContactos
Route::middleware(['auth:api', 'scopes:admin', 'can:contact_index'])
	->get('contacto', [ContactoController::class, 'index']);

// DestroyContacto
Route::middleware(['auth:api', 'scopes:admin', 'can:contact_destroy'])
	->delete('contacto/{id}', [ContactoController::class, 'destroy']);