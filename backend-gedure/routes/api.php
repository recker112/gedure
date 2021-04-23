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
use App\Http\Controllers\Api\InfoBoxController;

//Wallet System
use App\Http\Controllers\Api\wallet_system\BankAccountController;
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
	Route::middleware(['auth:api', 'scopes:admin', 'can:registros_index'])
		->get('logs', [LogController::class, 'index']);
	
	/*
	FIND LIKE
	*/
	// Users
	Route::middleware(['auth:api', 'scopes:admin', 'permission:debt_lote_create'])
		->get('find/user', [UserController::class, 'findLike']);
	
	// Cursos
	Route::middleware(['auth:api', 'scopes:admin', 'permission:debt_lote_create|users_create'])
		->get('find/curso', [CursoController::class, 'findLike']);
	
	// BankAccount
	Route::middleware(['auth:api'])
		->get('find/bank-account', [BankAccountController::class, 'findLike']);
	
	// Deudas users
	Route::middleware(['auth:api', 'scopes:admin', 'permission:debt_lote_edit'])
		->get('find/deudas-users', [DebtLoteController::class, 'findUsersLike']);
	
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
	Route::middleware(['auth:api', 'scopes:admin', 'can:posts_create'])
		->post('posts', [PostController::class, 'create']);
	
	// EditPost
	Route::middleware(['auth:api', 'scopes:admin', 'can:posts_edit'])
		->put('posts/{slug}', [PostController::class, 'edit']);
	
	// DeletePost
	Route::middleware(['auth:api', 'scopes:admin', 'can:posts_destroy'])
		->delete('posts/{slug}', [PostController::class, 'destroy']);
	
	// TableAdminPost
	Route::middleware(['auth:api', 'scopes:admin', 'can:posts_index'])
		->get('table-posts', [PostController::class, 'tableAdmin']);
	
	/*
	CONTACTO
	*/
	// CreateContacto
	Route::post('contacto', [ContactoController::class, 'create']);
	
	// GetContactos
	Route::middleware(['auth:api', 'scopes:admin', 'can:contact_index'])
		->get('contacto', [ContactoController::class, 'index']);
	
	// DestroyContacto
	Route::middleware(['auth:api', 'scopes:admin', 'can:contact_destroy'])
		->delete('contacto/{id}', [ContactoController::class, 'destroy']);
	
	/*
	CURSOS
	*/
	// Get cursos
	Route::middleware(['auth:api', 'scopes:admin', 'can:cursos_index'])
		->get('curso', [CursoController::class, 'index']);
	
	// Create curso
	Route::middleware(['auth:api', 'scopes:admin', 'can:cursos_create'])
		->post('curso', [CursoController::class, 'create']);
	
	// Delete curso
	Route::middleware(['auth:api', 'scopes:admin', 'can:cursos_destroy'])
		->delete('curso/{id}', [CursoController::class, 'destroy']);
	
	// Destroy massive curso
	Route::middleware(['auth:api', 'scopes:admin', 'can:cursos_destroy'])
		->delete('massive/curso', [CursoController::class, 'destroyMassive']);
	
	/*
	USERS
	*/
	// Get table users
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_index'])
		->get('user', [UserController::class, 'index']);
	
	// Show user
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_index'])
		->get('user/{id}', [UserController::class, 'show']);
	
	// Create users
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_create'])
		->post('user', [UserController::class, 'create']);
	
	// Update users
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_edit'])
		->put('user/{id}', [UserController::class, 'edit']);
	
	// Update users
	Route::middleware(['auth:api'])
		->put('user', [UserController::class, 'editSelf']);
	
	// Soft delete user
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_delete'])
		->delete('user/{id}', [UserController::class, 'delete']);
	
	// Matricula Upload
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_upload_matricula'])
		->post('user/matricula', [UserController::class, 'uploadMassiveStudiends']);
	
	// Update seccion massive
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_edit'])
		->put('massive/user/seccion', [UserController::class, 'updateSeccionMassive']);
	
	// Soft delete user massive
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_delete'])
		->delete('massive/user', [UserController::class, 'deleteMassive']);
	
	// Get users disabled
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_disabled_index'])
		->get('user-disabled', [UserController::class, 'indexDeleted']);
	
	// Restore user
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_disabled_restore'])
		->patch('user-disabled/restore/{id}', [UserController::class, 'restoreDeleted']);
	
	// Restore user massive
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_disabled_restore'])
		->patch('user-disabled/restore', [UserController::class, 'restoreDeletedMassive']);
	
	// Delete user
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_disabled_destroy'])
		->delete('user-disabled/{id}', [UserController::class, 'destroy']);
	
	// Delete user massive
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_disabled_destroy'])
		->delete('user-disabled', [UserController::class, 'destroyMassive']);
	
	/*
	INVITATION
	*/
	// Invite users
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_create'])
		->post('invitation/users', [InvitationController::class, 'invite']);
	
	// Show users
	Route::get('invitation/user/{key}', [InvitationController::class, 'show']);
	
	// Resend email
	Route::middleware(['auth:api', 'scopes:admin', 'can:users_edit'])
		->get('invitation/resend-email/{id}', [InvitationController::class, 'resend']);
	
	// Register user
	Route::post('invitation/register', [InvitationController::class, 'register']);
	
	/*
	Boletas
	*/
	// Get users with boletas
	Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_index'])
		->get('boleta', [BoletaController::class, 'index']);
	
	// Show boletas
	Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_index'])
		->get('boleta/{id}', [BoletaController::class, 'show']);
	
	// Show boletas studiends
	Route::middleware(['auth:api', 'scopes:user'])
		->get('boletas', [BoletaController::class, 'showStudiend']);
	
	// Upload boletas
	Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_upload'])
		->post('boleta', [BoletaController::class, 'upload']);
	
	// Edit boleta
	Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_edit'])
		->put('boleta/{id}', [BoletaController::class, 'edit']);
	
	// Massive destroy boleta
	Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_destroy'])
		->delete('massive/boleta', [BoletaController::class, 'destroyMassive']);
	
	// Download boleta
	Route::middleware(['auth:api'])
		->get('download/boleta/{id}', [BoletaController::class, 'download']);
	
	// Eliminar boleta
	Route::middleware(['auth:api', 'scopes:admin', 'can:boletas_destroy'])
		->delete('boleta/{id}', [BoletaController::class, 'destroy']);
	
	/*
	InfoBox
	*/
	Route::middleware(['auth:api'])
		->get('info-box', [InfoBoxController::class, 'index']);
	
	/*
	BankAccount
	*/
	// Index bank account
	Route::middleware(['auth:api', 'scopes:admin', 'can:bank_account_index'])
		->get('bank-account', [BankAccountController::class, 'index']);
	
	// Create bank account
	Route::middleware(['auth:api', 'scopes:admin', 'can:bank_account_create'])
		->post('bank-account', [BankAccountController::class, 'create']);
	
	// Edit bank account
	Route::middleware(['auth:api', 'scopes:admin', 'can:bank_account_edit'])
		->put('bank-account/{id}', [BankAccountController::class, 'edit']);
	
	// Edit bank account
	Route::middleware(['auth:api', 'scopes:admin', 'can:bank_account_destroy'])
		->delete('bank-account/{id}', [BankAccountController::class, 'destroy']);
	
	/*
	Deudas
	*/
	// Index debt lote
	Route::middleware(['auth:api', 'scopes:admin', 'can:debt_lote_index'])
		->get('deuda/lote', [DebtLoteController::class, 'index']);
	
	// Show debt lote
	Route::middleware(['auth:api', 'scopes:admin',  'can:debt_lote_index'])
		->get('deuda/lote/{id}', [DebtLoteController::class, 'show']);
	
	// Create debt lote
	Route::middleware(['auth:api', 'scopes:admin',  'can:debt_lote_create'])
		->post('deuda/lote', [DebtLoteController::class, 'create']);
	
	// Edit debt lote
	Route::middleware(['auth:api', 'scopes:admin',  'can:debt_lote_edit'])
		->put('deuda/lote/{id}', [DebtLoteController::class, 'edit']);
	
	// Delete debt lote
	Route::middleware(['auth:api', 'scopes:admin',  'can:debt_lote_delete'])
		->delete('deuda/lote/{id}', [DebtLoteController::class, 'delete']);
	
	// Index debts of lote
	Route::middleware(['auth:api', 'scopes:admin',  'can:debt_lote_index'])
		->get('deuda/lote/users/{id}', [DebtController::class, 'index']);
});