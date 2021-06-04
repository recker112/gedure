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

// Show transactions
Route::middleware(['auth:api', 'scopes:admin',  'can:transaction_index'])
	->get('transaction/{id}', [TransactionController::class, 'show']);