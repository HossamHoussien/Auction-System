<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Here is where we can register Authentication routes for the application.
|--------------------------------------------------------------------------
*/

// Authentication Rotues for APIs
Route::namespace('API')->prefix('api')->middleware(['api'])->group(function () {
    Route::middleware(['guest'])->group(function () {
        Route::post('/login', 'AuthController@login');
        Route::post('/register', 'AuthController@register');
    });

    Route::middleware(['auth:api'])->group(function () {
        Route::get('validate', 'AuthController@validateToken');
        Route::any('/logout', 'AuthController@logout')->middleware('auth:api');
    });

});
