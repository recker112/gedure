<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\PostController;

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
Route::group(['prefix' => 'v1'], function () {
	// Login
	Route::post('login', [LoginController::class, 'login']);

	// Relogin
	Route::middleware('auth:api')->post('relogin', [LoginController::class, 'relogin']);

	// Logout
	Route::middleware('auth:api')->post('logout', [LoginController::class, 'logout']);

	// LogoutAll
	Route::middleware('auth:api')->post('logoutAll', [LoginController::class, 'logoutAllTokens']);

	// GetLogs
	Route::middleware(['auth:api', 'scopes:admin'])->get('logs', [LogController::class, 'index']);
	
	// GetPosts
	Route::get('posts', [PostController::class, 'index']);
	
	// GetPostsAuth
	Route::middleware(['auth:api'])->get('posts/auth', [PostController::class, 'indexAuth']);
	
	// GetPost
	Route::get('posts/{slug}', [PostController::class, 'indexAuth']);
});