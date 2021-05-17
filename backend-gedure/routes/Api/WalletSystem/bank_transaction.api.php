<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\WalletSystem\BankTransactionController;

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

// Get transactions
Route::middleware(['auth:api', 'scopes:admin', 'can:bank_transaction_index'])
	->get('bank-transaction', [
		BankTransactionController::class, 'index'
	]);

// Assign transactions
Route::middleware(['auth:api', 'scopes:admin', 'can:bank_transaction_assign'])
	->put('bank-transaction/{bank_transaction}/assign', [
		BankTransactionController::class, 'assign'
	])
	->whereNumber('bank_transaction');

// Upload transactions
Route::middleware(['auth:api', 'scopes:admin', 'can:bank_transaction_upload'])
	->post('bank-account/{bank_account}/transaction', [
		BankTransactionController::class, 'upload'
	])
	->whereNumber('user');

// Delete transactions
Route::middleware(['auth:api', 'scopes:admin', 'can:bank_transaction_delete'])
	->delete('bank-transaction/{bank_transaction}', [
		BankTransactionController::class, 'destroy'
	])
	->whereNumber('bank_transaction');