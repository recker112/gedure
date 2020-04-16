<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Pagina en mantenimiento
// Artisan::call('down');
//Reactivar Página
// Artisan::call('up');

Route::view('/{any}', 'index')->where('any', '^(?!api).*$')->name('spa');
