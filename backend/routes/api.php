<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Wallet System
use App\Http\Controllers\Api\wallet_system\DebtLoteController;
use App\Http\Controllers\Api\wallet_system\DebtController;

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

/*
Login API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/Auth/auth.api.php'));

/*
Logs API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/Gedure/log.api.php'));

/*
Posts API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/Gedure/post.api.php'));

/*
Contactos API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/Gedure/contacto.api.php'));

/*
Cursos API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/Gedure/curso.api.php'));

/*
Users API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/Gedure/user.api.php'));

/*
Users API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/Gedure/notification.api.php'));

/*
Invitations API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/Auth/invitation.api.php'));

/*
Boletas API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/Gedure/boleta.api.php'));

/*
InfoBox API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/Gedure/info_box.api.php'));

/*
BankAccount API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/WalletSystem/bank_account.api.php'));

/*
BankTransaction API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/WalletSystem/bank_transaction.api.php'));

/*
DebtLote API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/WalletSystem/debt_lote.api.php'));

/*
Debt API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/WalletSystem/debt.api.php'));

/*
Wallet API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/WalletSystem/wallet.api.php'));

/*
Transaction API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/WalletSystem/transaction.api.php'));

/*
PendingPayments API
*/
Route::prefix('v1')
	->group(base_path('routes/Api/WalletSystem/pending_payment.api.php'));