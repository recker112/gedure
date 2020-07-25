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
//Reactivar Pรกgina
// Artisan::call('up');

//Crear Links via rutas con artisan
// Route::get('/foo', function () {
//     Artisan::call('storage:link');
// });

Route::view('/', 'app')->name('spa');

Route::view('/{any}', 'app')->where('any', '^(?!api).*$');
