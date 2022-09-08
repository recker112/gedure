<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\WalletSystem\DebtController;

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

// Index debts of lote users
Route::middleware(['auth:api', 'scopes:admin',  'can:debt_lote_index'])
	->get('deuda/lote/{id}/users', [DebtController::class, 'indexLote']);

// Delete debts of lote users
Route::middleware(['auth:api', 'scopes:admin', 'permission:debt_delete'])
	->delete('deuda/{debt}', [DebtController::class, 'destroy']);

// Index debts of users
Route::middleware(['auth:api'])
	->get('deuda', [DebtController::class, 'index']);

// Pay debt of users
Route::middleware(['auth:api'])
	->post('deuda/pay/{debt}', [DebtController::class, 'pay']);

// Pay debt of users
Route::middleware(['auth:api'])
	->get('deuda/solvencia', [DebtController::class, 'solvencia']);