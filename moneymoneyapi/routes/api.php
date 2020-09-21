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
Route::get('/regsiter', 'Users@regsiter');
Route::post('/login', 'Authentication@login');

Route::get('login',function(){
    return response()->json([
        'status'=>401,
        'error' => 'Unauthenticated.'
    ], 401);
})->name('login');


Route::group(['middleware' => 'auth:api'],function(){
    Route::post('/logout', 'Authentication@logout');

    Route::group(['prefix'=>'/wellet'],function(){
        Route::post('/listing', 'Wellet@listing');
        Route::post('/create', 'Wellet@create');
    });
});


