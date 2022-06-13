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
Route::post('auth/login', [LoginController::class, 'login']);

// Relogin
Route::middleware('auth:api')
	->get('auth/relogin', [LoginController::class, 'relogin']);

// Logout
Route::middleware('auth:api')
	->get('auth/logout', [LoginController::class, 'logout']);

// LogoutAll
Route::middleware('auth:api')
	->get('auth/logout/all', [LoginController::class, 'logoutAllTokens']);

// RecoveryPassword
Route::post('auth-recovery/send', [RecoveryPasswordController::class, 'recoveryPassword']);

// RecoveryPassword
Route::post('auth-recovery/verify', [RecoveryPasswordController::class, 'recoveryPasswordVerifyCode']);

// RecoveryChangePass
Route::post('auth-recovery/chpass', [RecoveryPasswordController::class, 'recoveryChangePassword']);
	