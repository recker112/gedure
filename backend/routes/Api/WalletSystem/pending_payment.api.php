<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\WalletSystem\PendingPaymentController;

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

// Index pending payment
Route::middleware(['auth:api'])
	->get('pending-payment', [PendingPaymentController::class, 'index']);

// Verify pending payment
Route::middleware(['auth:api'])
	->post('bank-account/{bank_account}/payment', [PendingPaymentController::class, 'verify']);

// Delete pending payment
Route::middleware(['auth:api'])
	->delete('pending-payment/{id}', [PendingPaymentController::class, 'delete']);