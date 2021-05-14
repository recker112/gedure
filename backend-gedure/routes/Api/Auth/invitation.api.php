<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\Auth\InvitationController;

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