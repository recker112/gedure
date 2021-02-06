<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\RecoveryPasswordController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ContactoController;
use App\Http\Controllers\Api\CursoController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\InvitationController;
use App\Http\Controllers\Api\BoletaController;

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
	
	/*
	LOGS
	*/
	// GetLogs
	Route::middleware(['auth:api', 'scopes:admin', 'permission:registros_index'])
		->get('logs', [LogController::class, 'index']);
	
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
	Route::middleware(['auth:api', 'scopes:admin', 'permission:posts_index|posts_create'])
		->post('posts', [PostController::class, 'create']);
	
	// EditPost
	Route::middleware(['auth:api', 'scopes:admin', 'permission:posts_index|posts_edit'])
		->put('posts/{slug}', [PostController::class, 'edit']);
	
	// DeletePost
	Route::middleware(['auth:api', 'scopes:admin', 'permission:posts_index|posts_destroy'])
		->delete('posts/{slug}', [PostController::class, 'destroy']);
	
	// TableAdminPost
	Route::middleware(['auth:api', 'scopes:admin', 'permission:posts_index'])
		->get('table-posts', [PostController::class, 'tableAdmin']);
	
	/*
	CONTACTO
	*/
	// CreateContacto
	Route::post('contacto', [ContactoController::class, 'create']);
	
	// GetContactos
	Route::middleware(['auth:api', 'scopes:admin', 'permission:soliContact_index'])
		->get('contacto', [ContactoController::class, 'index']);
	
	// DestroyContacto
	Route::middleware(['auth:api', 'scopes:admin', 'permission:soliContact_destroy'])
		->delete('contacto/{id}', [ContactoController::class, 'destroy']);
	
	/*
	CURSOS
	*/
	// Get cursos
	Route::middleware(['auth:api', 'scopes:admin', 'permission:cursos_index'])
		->get('curso', [CursoController::class, 'index']);
	
	// Create curso
	Route::middleware(['auth:api', 'scopes:admin', 'permission:cursos_index|cursos_create'])
		->post('curso', [CursoController::class, 'create']);
	
	// Delete curso
	Route::middleware(['auth:api', 'scopes:admin', 'permission:cursos_index|cursos_destroy'])
		->delete('curso/{id}', [CursoController::class, 'destroy']);
	
	// Destroy massive curso
	Route::middleware(['auth:api', 'scopes:admin', 'permission:cursos_index|cursos_massive_destroy'])
		->delete('massive/curso', [CursoController::class, 'destroyMassive']);
	
	/*
	USERS
	*/
	// Get table users
	Route::middleware(['auth:api', 'scopes:admin', 'permission:users_index'])
		->get('users', [UserController::class, 'index']);
	
	// Show user
	Route::middleware(['auth:api', 'scopes:admin', 'permission:users_index'])
		->get('user/{id}', [UserController::class, 'show']);
	
	// Create users
	Route::middleware(['auth:api', 'scopes:admin', 'permission:users_index|users_create'])
		->post('user', [UserController::class, 'create']);
	
	// Update users
	Route::middleware(['auth:api', 'scopes:admin', 'permission:users_index|users_update'])
		->put('user/{id}', [UserController::class, 'edit']);
	
	// Soft delete user
	Route::middleware(['auth:api', 'scopes:admin', 'permission:users_index|users_delete'])
		->delete('user/{id}', [UserController::class, 'delete']);
	
	// Matricula Upload
	Route::middleware(['auth:api', 'scopes:admin', 'permission:users_index|users_create_massive'])
		->post('user/matricula', [UserController::class, 'uploadMassiveStudiends']);
	
	// Update seccion massive
	Route::middleware(['auth:api', 'scopes:admin', 'permission:users_index|users_update'])
		->put('massive/user/seccion', [UserController::class, 'updateSeccionMassive']);
	
	// Soft delete user massive
	Route::middleware(['auth:api', 'scopes:admin', 'permission:users_index|users_delete_massive'])
		->delete('massive/user', [UserController::class, 'deleteMassive']);
	
	/*
	INVITATION
	*/
	// Invite users
	Route::middleware(['auth:api', 'scopes:admin', 'permission:users_index|users_create'])
		->post('invitation/users', [InvitationController::class, 'invite']);
	
	// Show users
	Route::get('invitation/user/{key}', [InvitationController::class, 'show']);
	
	// Resend email
	Route::get('invitation/resend-email/{id}', [InvitationController::class, 'resend']);
	
	// Register user
	Route::post('invitation/register', [InvitationController::class, 'register']);
	
	/*
	Boletas
	*/
	// Get users with boletas
	Route::middleware(['auth:api', 'scopes:admin', 'permission:boletas_index'])
		->get('boleta', [BoletaController::class, 'index']);
	
	// Show boletas
	Route::middleware(['auth:api', 'scopes:admin', 'permission:boletas_index'])
		->get('boleta/{id}', [BoletaController::class, 'show']);
	
	// Upload boletas
	Route::middleware(['auth:api', 'scopes:admin', 'permission:boletas_index|boletas_upload'])
		->post('boleta', [BoletaController::class, 'upload']);
	
	// Edit boleta
	Route::middleware(['auth:api', 'scopes:admin', 'permission:boletas_index|boletas_edit'])
		->put('boleta/{id}', [BoletaController::class, 'edit']);
	
	// Massive destroy boleta
	Route::middleware(['auth:api', 'scopes:admin', 'permission:boletas_index|boletas_destroy'])
		->delete('massive/boleta', [BoletaController::class, 'destroyMassive']);
	
	// Download boleta
	Route::middleware(['auth:api'])
		->get('download/boleta/{id}', [BoletaController::class, 'download']);
	
	// Eliminar boleta
	Route::middleware(['auth:api', 'scopes:admin', 'permission:boletas_index|boletas_destroy'])
		->delete('boleta/{id}', [BoletaController::class, 'destroy']);
});