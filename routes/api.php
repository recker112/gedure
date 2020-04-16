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
Route::middleware('auth:api')->get('/news/search', 'PostController@getNewsForSearch');
Route::middleware('auth:api')->get('/anuncios/search', 'PostController@getAnunciosForSearch');
Route::middleware('auth:api')->post('/news', 'PostController@publicarNews');
Route::middleware('auth:api')->post('/anuncios', 'PostController@publicarAnuncio');
Route::middleware('auth:api')->delete('/news/{id}', 'PostController@delNews');
Route::middleware('auth:api')->delete('/anuncios/{id}', 'PostController@delAnuncios');

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
Route::middleware('auth:api')->get('/user/{userSearch}', 'GetUserController@searchUser');
//GetUsersForCurso
Route::middleware('auth:api')->get('/curso/{cursoSearch}', 'GetUserController@searchStudiendsForCurso');
//AddUser
Route::middleware('auth:api')->post('/user', 'ModifyUserController@addUser');
//UpdateUser
Route::middleware('auth:api')->patch('/user/{userSearch}', 'ModifyUserController@updateUser');
//DeleteUser
Route::middleware('auth:api')->delete('/user/{userSearch}', 'ModifyUserController@deleteUser');
//ChangePass
Route::middleware('auth:api')->post('/user/changePass', 'ModifyUserController@changePass');

/* UPLOADS */
//Upload Matricula
Route::middleware('auth:api')->post('/upload/matricula', 'UploadController@uploadMatricula');
Route::middleware('auth:api')->post('/upload/avatar', 'AvatarController@uploadAvatar');
Route::middleware('auth:api')->post('/upload/boletas', 'UploadController@uploadBoletas');

/* GETS ARCHIVES */
Route::get('/imagenes/{file}', 'GetArchivesController@getImg');
Route::middleware('auth:api')->get('/matricula/{file}', 'GetArchivesController@getMatricula');
Route::get('/imagenes/avatars/{img}', 'GetArchivesController@getAvatar');
Route::get('/resources/news/{noticia}/{file}', 'GetArchivesController@getResourceNews');
Route::middleware('auth:api')->get('/archivos/boleta', 'BoletasController@getBoleta');

/* BORRADO EN MASA */
Route::middleware('auth:api')->delete('/users', 'ModifyUserController@deleteUserMassive');
Route::middleware('auth:api')->delete('/archivos/boletas', 'BoletasController@deleteBoletasMassive');