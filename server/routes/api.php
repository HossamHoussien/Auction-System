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

Route::get('/items', 'ItemController@index');

Route::get('/items/{item}', 'ItemController@show');

Route::post('/biding', 'BidController@bid');



use App\Models\Item;
use App\Services\UserService;

Route::get('/test', function(){
    
    $item = Item::findOrFail(1);

    $userService = new UserService;

    $response = $userService->canBid($item);

    return response()->json($response);

});