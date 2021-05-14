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

// Upload transactions
Route::middleware(['auth:api', 'scopes:admin', 'can:bank_account_create'])
	->post('bank-account/{bank_account}/transaction', [
		BankTransactionController::class, 'upload'
	])
	->whereNumber('user');