<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogController;

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

Route::post('login', [LoginController::class, 'login']);

Route::middleware('auth:api')->post('relogin', [LoginController::class, 'relogin']);

Route::middleware('auth:api')->post('logout', [LoginController::class, 'logout']);

Route::middleware('auth:api')->post('logoutAll', [LoginController::class, 'logoutAllTokens']);

Route::middleware(['auth:api', 'scopes:admin'])->get('logs', [LogController::class, 'index']);