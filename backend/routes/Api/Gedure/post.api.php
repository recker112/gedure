<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Api\Gedure\PostController;

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
	->put('posts/{post:slug}', [PostController::class, 'edit']);

// DeletePost
Route::middleware(['auth:api', 'scopes:admin', 'can:posts_destroy'])
	->delete('posts/{post:slug}', [PostController::class, 'destroy']);

// TableAdminPost
Route::middleware(['auth:api', 'scopes:admin', 'can:posts_index'])
	->get('table-posts', [PostController::class, 'tableAdmin']);
	