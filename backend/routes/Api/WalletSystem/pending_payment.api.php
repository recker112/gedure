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

// Index payment
Route::middleware(['auth:api'])
	->get('payment-pending', [PendingPaymentController::class, 'index']);

// Verify payment
Route::middleware(['auth:api'])
	->post('bank-account/{bank_account}/payment', [PendingPaymentController::class, 'verify']);