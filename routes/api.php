<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

//Login
Route::post('/login', 'LoginController@login');

//Post
Route::get('/news', 'PostController@getNews');
Route::get('/anuncios', 'PostController@getAnuncios');

//Relogin
Route::middleware('auth:api')->get('/relogin', 'LoginController@relogin');

/* INFO BOX */
//AnnounceBox
Route::middleware('auth:api')->get('/infobox/announcebox', 'InfoBoxController@getAnnounceBox');

/* LOGS */
//GetLogs
Route::middleware('auth:api')->get('/logs', 'LogsController@getLogs');

/* MODIFY */
//GetUsers
Route::middleware('auth:api')->get('/user/{userSearch}', 'ModifyUserController@searchUser');
//GetUsersForCurso
Route::middleware('auth:api')->get('/curso/{cursoSearch}', 'ModifyUserController@searchStudiendsForCurso');
//AddUser
Route::middleware('auth:api')->post('/user', 'ModifyUserController@addUser');
//UpdateUser
Route::middleware('auth:api')->patch('/user/{userSearch}', 'ModifyUserController@updateUser');
//DeleteUser
Route::middleware('auth:api')->delete('/user/{userSearch}', 'ModifyUserController@deleteUser');

/* UPLOADS */
//Upload Matricula
Route::middleware('auth:api')->post('/upload/matricula', 'UploadController@uploadMatricula');