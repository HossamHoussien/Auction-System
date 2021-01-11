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

Route::get('/items', 'ItemController@index');

Route::get('/items/{item}', 'ItemController@show');

Route::post('/biding', 'BidController@bid');

Route::post('/autobiding/settings', 'BidController@autobiding');

Route::post('/search', 'SearchController');