<?php

use Illuminate\Http\Request;

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

Route::group([
    'prefix' => 'auth'

], function () {
    Route::post('login', 'Auth\AuthController@login');
    Route::post('register', 'User\UserController@registerUser');
});

//Rotas Protegidas
Route::group([
    'middleware' => 'jwt.verify',
    'prefix' => 'auth'
], function () {
    Route::post('logout', 'Auth\AuthController@logout');
    // Route::post('refresh', 'AuthController@refresh');  //Atualizar o token
    Route::post('me', 'User\UserController@me');
});

Route::group([
    'middleware' => 'jwt.verify'
], function () {
    //Rotas dos médicos
    Route::post('doctor', 'Doctor\DoctorController@registerDoctor');
    Route::get('doctor', 'Doctor\DoctorController@getAllDoctors');
});
