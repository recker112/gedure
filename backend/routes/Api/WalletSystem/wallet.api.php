<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\WalletSystem\WalletController;

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

// Verify transfer
Route::middleware(['auth:api'])
	->post('wallet/transfer/verify', [WalletController::class, 'verifyTransfer']);

// Confirm transfer
Route::middleware(['auth:api'])
->post('wallet/transfer/confirm', [WalletController::class, 'confirmTransfer']);

// Index wallet
Route::middleware(['auth:api', 'scopes:admin', 'can:wallet_index'])
	->get('wallet', [WalletController::class, 'index']);

// Edit wallet
Route::middleware(['auth:api', 'scopes:admin', 'can:wallet_edit'])
	->post('wallet/{wallet}', [WalletController::class, 'edit']);