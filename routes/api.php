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
//Relogin
Route::middleware('auth:api')->get('/relogin', 'LoginController@relogin');

/* POSTING */
//Obtener todas las noticias.
Route::get('/news', 'PostController@getNews');
Route::get('/anuncios', 'PostController@getAnuncios');
Route::middleware('auth:api')->group(function () {
	//Buscar noticias
	Route::get('/news/search', 'PostController@getNewsForSearch');
	Route::get('/anuncios/search', 'PostController@getAnunciosForSearch');
	//Publicar noticias
	Route::post('/news', 'PostController@publicarNews');
	Route::post('/anuncios', 'PostController@publicarAnuncio');
	//Borrar noticias
	Route::delete('/news/{id}', 'PostController@delNews');
	Route::delete('/anuncios/{id}', 'PostController@delAnuncios');
});

/* INFO BOX */
//AnnounceBox
Route::middleware('auth:api')->get('/infobox/announcebox', 'InfoBoxController@getAnnounceBox');

/* LOGS */
//GetLogs
Route::middleware('auth:api')->get('/logs', 'LogsController@getLogs');

/* USER */
Route::middleware('auth:api')->group(function () {
	//GetUsers
	Route::get('/user/{userSearch}', 'GetUserController@searchUser');
	//GetUsersForCurso
	Route::get('/curso/{cursoSearch}', 'GetUserController@searchStudiendsForCurso');
	//AddUser
	Route::post('/user', 'ModifyUserController@addUser');
	//UpdateUser
	Route::patch('/user/{userSearch}', 'ModifyUserController@updateUser');
	//DeleteUser
	Route::delete('/user/{userSearch}', 'ModifyUserController@deleteUser');
	//ChangePass
	Route::post('/user/changePass', 'ModifyUserController@changePass');
});

/* BANS */
Route::middleware('auth:api')->group(function () {
	//GetBanUsers
	Route::get('/ban/{userSearch}', 'BansController@searchBanUser');
	//Unlock
	Route::delete('/ban/unlock/{user}', 'BansController@unlockUser');
});

/* CHANGE OPTIONS USER */
Route::middleware('auth:api')->group(function () {
	//ChangeOptionsStudiend
	Route::post('/user/options/studiend', 'UserOptionsController@changeStudiendOptions');	
	//ChangeOptionsSeccion
	Route::post('/user/options/seccion', 'UserOptionsController@changeSecciondOptions');	
});

/* UPLOADS */
Route::middleware('auth:api')->group(function () {
	//Upload Matricula
	Route::post('/upload/matricula', 'UploadController@uploadMatricula');
	//Upload Avatar
	Route::post('/upload/avatar', 'AvatarController@uploadAvatar');
	//Upload Boletas
	Route::post('/upload/boletas', 'UploadController@uploadBoletas');
});

/* GETS ARCHIVES PRIVATES */
Route::middleware('auth:api')->group(function () {
	//Obtener matricula en el servidor
	Route::get('/matricula/{file}', 'GetArchivesController@getMatricula');
	//Obtener boleta
	Route::get('/archivos/boleta', 'BoletasController@getBoleta');
});

/* BORRADO EN MASA */
Route::middleware('auth:api')->group(function () {
	//Borrar estudiantes
	Route::delete('/users', 'ModifyUserController@deleteUserMassive');
	//Borrar boletas
	Route::delete('/archivos/boletas', 'BoletasController@deleteBoletasMassive');
});