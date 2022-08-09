<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\WalletSystem\TransactionController;

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

// Index transactions
Route::middleware(['auth:api', 'scopes:admin',  'can:transaction_index'])
	->get('transaction', [TransactionController::class, 'index']);

// Index transactions user
Route::middleware(['auth:api'])
	->get('transaction/user', [TransactionController::class, 'indexUser']);

// Show transactions
Route::middleware(['auth:api', 'scopes:admin',  'can:transaction_index'])
	->get('transaction/{id}', [TransactionController::class, 'show']);

// Show transactions user
Route::middleware(['auth:api'])
	->get('transaction/{id}/user/', [TransactionController::class, 'showUser']);

// Download transactions
Route::middleware(['auth:api', 'scopes:admin',  'can:transaction_index'])
	->get('transaction/{id}/download', [TransactionController::class, 'download']);

// Download transactions user
Route::middleware(['auth:api', 'scopes:admin',  'can:transaction_index'])
	->get('transaction/{id}/user/download', [TransactionController::class, 'downloadUser']);