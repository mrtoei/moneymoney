<?php
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
Route::post('/auth/login', 'auth\Authentication@login');

Route::get('/auth/login',function(){
    return response()->json([
        'status'=>401,
        'error' => 'Unauthenticated.'
    ], 401);
})->name('login');


Route::group(['middleware' => 'auth:api'],function(){
    Route::post('/auth/logout', 'auth\Authentication@logout');

    Route::group(['prefix'=>'/bos'],function(){
        Route::group(['prefix'=>'/wellet'],function(){
            Route::post('/listing', 'bos\Wellet@listing');
            Route::get('/read/{id}', 'bos\Wellet@read');
            Route::post('/create', 'bos\Wellet@create');
        });

        Route::group(['prefix'=>'/transaction'],function(){
            Route::post('/listing', 'bos\transaction@listing');
            Route::post('/create', 'bos\transaction@create');
            Route::post('/update', 'bos\transaction@update');
            Route::get('/remove/{id}', 'bos\transaction@remove');
        });

        Route::group(['prefix'=>'/category'],function(){
            Route::post('/find', 'bos\Category@find');
            Route::get('/listing', 'bos\Category@listing');
            Route::get('/read/{id}', 'bos\Category@read');
            Route::post('/create', 'bos\Category@create');
            Route::post('/update', 'bos\Category@update');
            Route::get('/remove/{id}', 'bos\Category@remove');
        });
    });


});


