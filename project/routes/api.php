<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ContactoController;
use App\Http\Controllers\Api\CursoController;

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
	
	// CreateContacto
	Route::post('contacto', [ContactoController::class, 'create']);
	
	// GetContactos
	Route::get('contacto', [ContactoController::class, 'index']);
	
	// DestroyContacto
	Route::delete('contacto/{id}', [ContactoController::class, 'destroy']);
	
	// GetCursos
	Route::middleware(['auth:api', 'scopes:admin'])->get('curso', [CursoController::class, 'index']);
	
	// CreateCurso
	Route::middleware(['auth:api', 'scopes:admin'])->post('curso', [CursoController::class, 'create']);
	
	// DeleteCurso
	Route::middleware(['auth:api', 'scopes:admin'])->delete('curso/{id}', [CursoController::class, 'destroy']);
});