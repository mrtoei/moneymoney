<?php

use App\Http\Controllers\Category;
use App\Http\Controllers\Transaction;
use App\Http\Controllers\Wellet;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Authentication;
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
Route::post('/auth/login', [Authentication::class,'login']);

Route::get('/auth/login',function(){
    return response()->json([
        'status'=>401,
        'error' => 'Unauthenticated.'
    ], 401);
});


Route::group(['middleware' => 'auth:api'],function(){
    Route::post('/auth/logout', [Authentication::class,'logout']);

    Route::group(['prefix'=>'/bos'],function(){
        Route::group(['prefix'=>'/wellet'],function(){
            Route::post('/find', [Wellet::class,'find']);
            Route::get('/read/{id}', [Wellet::class,'read']);
            Route::post('/create', [Wellet::class,'create']);
        });

        Route::group(['prefix'=>'/transaction'],function(){
            Route::post('/find', [Transaction::class,'find']);
            Route::post('/loadTransaction', [Transaction::class,'loadTransaction']);
            Route::post('/create', [Transaction::class,'create']);
            Route::get('/read/{id}', [Transaction::class,'read']);
            Route::post('/update', [Transaction::class,'update']);
            Route::get('/remove/{id}', [Transaction::class,'remove']);
        });

        Route::group(['prefix'=>'/category'],function(){
            Route::post('/find', [Category::class,'find']);
            Route::get('/loadCategories', [Category::class,'loadCategories']);
            Route::get('/read/{id}', [Category::class,'read']);
            Route::post('/create', [Category::class,'create']);
            Route::post('/update', [Category::class,'update']);
            Route::get('/remove/{id}', [Category::class,'remove']);
        });
    });


});


