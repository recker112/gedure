<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\WalletSystem\DebtLoteController;

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

// Index debt lote
Route::middleware(['auth:api', 'scopes:admin', 'can:debt_lote_index'])
	->get('deuda/lote', [DebtLoteController::class, 'index']);

// Show debt lote
Route::middleware(['auth:api', 'scopes:admin',  'can:debt_lote_index'])
	->get('deuda/lote/{id}', [DebtLoteController::class, 'show']);

// Create debt lote
Route::middleware(['auth:api', 'scopes:admin',  'can:debt_lote_create'])
	->post('deuda/lote', [DebtLoteController::class, 'create']);

// Edit debt lote
Route::middleware(['auth:api', 'scopes:admin',  'can:debt_lote_edit'])
	->put('deuda/lote/{id}', [DebtLoteController::class, 'edit']);

// Delete debt lote
Route::middleware(['auth:api', 'scopes:admin',  'can:debt_lote_delete'])
	->delete('deuda/lote/{id}', [DebtLoteController::class, 'delete']);

// Deudas users
Route::middleware(['auth:api', 'scopes:admin', 'permission:debt_lote_edit'])
	->get('find/deudas-users', [DebtLoteController::class, 'findUsersLike']);