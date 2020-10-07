<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use App\Http\Controllers\AdminController;
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


Route::get('/', function () {
    return redirect()->route('Inicio');
});
Route::get('/Inicio', 'GeneralController@Inicio')->name("Inicio");
Route::get('/Eventos', 'GeneralController@Eventos')->name("Eventos"); 
Route::get('/Construccion', 'GeneralController@Construccion')->name("Construccion");
Route::get('/Emprendimiento', 'GeneralController@Emprendimiento')->name("Emprendimiento");
Route::get('/GaleriaTecnologica', 'GeneralController@GaleriaTecnologica')->name("GaleriaTecnologica");
Route::get('/GaleriaTecnologica/{id}', 'GeneralController@GaleriaTecnologicaItem')->name("GaleriaTecnologicaItem");