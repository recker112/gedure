<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\WalletSystem\BankAccountController;

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

// Index bank account
Route::middleware(['auth:api', 'scopes:admin', 'can:bank_account_index'])
	->get('bank-account', [BankAccountController::class, 'index']);

// Create bank account
Route::middleware(['auth:api', 'scopes:admin', 'can:bank_account_create'])
	->post('bank-account', [BankAccountController::class, 'create']);

// Edit bank account
Route::middleware(['auth:api', 'scopes:admin', 'can:bank_account_edit'])
	->put('bank-account/{bank_account}', [BankAccountController::class, 'edit']);

// Delete bank account
Route::middleware(['auth:api', 'scopes:admin', 'can:bank_account_destroy'])
	->delete('bank-account/{bank_account}', [BankAccountController::class, 'destroy']);

// Delete massive bank account
Route::middleware(['auth:api', 'scopes:admin', 'can:bank_account_destroy'])
	->delete('bank-account', [BankAccountController::class, 'destroyMassive']);

// BankAccount
Route::middleware(['auth:api'])
	->get('find/bank-account', [BankAccountController::class, 'findLike']);