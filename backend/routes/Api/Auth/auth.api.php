<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RecoveryPasswordController;

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

// Login
Route::post('login', [LoginController::class, 'login']);

// Relogin
Route::middleware('auth:api')
	->get('relogin', [LoginController::class, 'relogin']);

// Logout
Route::middleware('auth:api')
	->post('logout', [LoginController::class, 'logout']);

// LogoutAll
Route::middleware('auth:api')
	->post('logoutAll', [LoginController::class, 'logoutAllTokens']);

// RecoveryPassword
Route::post('recovery-password', [RecoveryPasswordController::class, 'recoveryPassword']);

// RecoveryPassword
Route::post('recovery-verify', [RecoveryPasswordController::class, 'recoveryPasswordVerifyCode']);

// RecoveryChangePass
Route::post('recovery-chpass', [RecoveryPasswordController::class, 'recoveryChangePassword']);
	