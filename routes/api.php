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
Route::group(['prefix' => 'v1', 'namespace' => '\App\Http\Controllers\v1'], function () {
	// Login maneger
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
});