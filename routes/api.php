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

/*
**-- v1 --**

Primera versiรณn de la API Gedure
*/
Route::group(['prefix' => 'v1'], function () {
	/*
		/login
		Requeriments: [user(string), password(string), ?checkbox(boolean)]
	*/
	Route::post('login', 'LoginController@login');
	/*
		/login
		Requeriments: none,
		Notes: Es necesario pasar el token via Header (Bearer).
	*/
	Route::middleware(['auth:api'])->get('relogin', 'LoginController@relogin');
	/*
		/login
		Requeriments: none.
		Notes: Es necesario pasar el token via Header (Bearer).
	*/
	Route::middleware(['auth:api'])->post('logout', 'LoginController@logout');
	
	
	/*
		/Logs
		Requeriments: none,
		Notes: Es necesario ser administrador
	*/
	Route::middleware(['auth:api'])->get('logs', 'LogsController@get');
	
	
	/*
		/Crear noticia
		Requeriments: [title(string), content(string), ?onlyUsers(bollean), ?imgs(array)],
		Notes: Es necesario ser administrador
	*/
	Route::middleware(['auth:api'])->post('noticias', 'NewsController@create');
	
	/*
		/Obtener noticias para Administrar
		Requeriments: none,
		Notes: Es necesario ser administrador
	*/
	Route::middleware(['auth:api'])->get('noticias/admin', 'NewsController@storeAdmin');
	
	/*
		/Obtener noticias
		Requeriments: none,
	*/
	Route::get('noticias', 'NewsController@store');
	
	/*
		/Obtener noticias
		Requeriments: usuario_registrado,
	*/
	Route::middleware(['auth:api'])->get('noticias/user', 'NewsController@storeUser');
	
	/*
		/Obtener noticia
		Requeriments: none,
	*/
	Route::get('noticias/{id}', 'NewsController@get');
	
	/*
		/Obtener noticia
		Requeriments: none,
	*/
	Route::middleware(['auth:api'])->get('noticias/user/{id}', 'NewsController@getUser');
	
	/*
		/Editar noticia
		Requeriments: title(string), content(string), imgsUpdate(boolean), onlyUsers(boolean), ?imgs(array),
	*/
	Route::middleware(['auth:api'])->post('noticias/{id}', 'NewsController@modify');
	
	/*
		/Borrar noticias
		Requeriments: id, permission:?deleteOther
		Notes: Es necesario ser administrador, tambien es posible que se necesite un permiso extra para poder borrar noticias de las cuales no eres dueño.
	*/
	Route::middleware(['auth:api'])->delete('noticias/{id}', 'NewsController@remove');
});