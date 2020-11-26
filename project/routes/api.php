<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ContactoController;
use App\Http\Controllers\Api\CursoController;
use App\Http\Controllers\Api\UserController;

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
	/*
	LOGIN
	*/
	// Login
	Route::post('login', [LoginController::class, 'login']);

	// Relogin
	Route::middleware('auth:api')->get('relogin', [LoginController::class, 'relogin']);

	// Logout
	Route::middleware('auth:api')->post('logout', [LoginController::class, 'logout']);

	// LogoutAll
	Route::middleware('auth:api')->post('logoutAll', [LoginController::class, 'logoutAllTokens']);
	
	// RecoveryPassword
	Route::post('recovery-password', [LoginController::class, 'recoveryPassword']);
	
	// RecoveryPassword
	Route::post('recovery-verify', [LoginController::class, 'recoveryPasswordVerifyCode']);
	
	// RecoveryChangePass
	Route::post('recovery-chpass', [LoginController::class, 'recoveryChangePassword']);
	
	/*
	LOGS
	*/
	// GetLogs
	Route::middleware(['auth:api', 'scopes:admin'])->get('logs', [LogController::class, 'index']);
	
	/*
	POSTS
	*/
	// GetPosts
	Route::get('posts', [PostController::class, 'index']);
	
	// GetPostsAuth
	Route::middleware(['auth:api'])->get('posts/auth', [PostController::class, 'indexAuth']);
	
	// GetPost
	Route::get('posts/{slug}', [PostController::class, 'show']);
	
	// GetPostAuth
	Route::middleware(['auth:api'])->get('posts/auth/{slug}', [PostController::class, 'showAuth']);
	
	// CreatePost
	Route::middleware(['auth:api', 'scopes:admin'])->post('posts', [PostController::class, 'create']);
	
	// EditPost
	Route::middleware(['auth:api', 'scopes:admin'])->put('posts/{slug}', [PostController::class, 'edit']);
	
	// DeletePost
	Route::middleware(['auth:api', 'scopes:admin'])->delete('posts/{slug}', [PostController::class, 'destroy']);
	
	// TableAdminPost
	Route::middleware(['auth:api', 'scopes:admin'])->get('table-posts', [PostController::class, 'tableAdmin']);
	
	/*
	CONTACTO
	*/
	// CreateContacto
	Route::post('contacto', [ContactoController::class, 'create']);
	
	// GetContactos
	Route::get('contacto', [ContactoController::class, 'index']);
	
	// DestroyContacto
	Route::delete('contacto/{id}', [ContactoController::class, 'destroy']);
	
	/*
	CURSOS
	*/
	// GetCursos
	Route::middleware(['auth:api', 'scopes:admin'])->get('curso', [CursoController::class, 'index']);
	
	// CreateCurso
	Route::middleware(['auth:api', 'scopes:admin'])->post('curso', [CursoController::class, 'create']);
	
	// DeleteCurso
	Route::middleware(['auth:api', 'scopes:admin'])->delete('curso/{id}', [CursoController::class, 'destroy']);
	
	/*
	USERS
	*/
	Route::middleware(['auth:api', 'scopes:admin'])->get('table-users', [UserController::class, 'index']);
});