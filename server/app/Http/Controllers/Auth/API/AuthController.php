<?php

namespace App\Http\Controllers\Auth\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests\APIRegisterRequest;
use App\Http\Requests\APILoginRequest;
use App\Services\AuthService;

class AuthController extends Controller
{

    public function login(APILoginRequest $request)
    {
        return AuthService::login($request->validated());
    }


    public function logout(Request $request)
    {
        return AuthService::logout();
    }


    public function register(APIRegisterRequest $request)
    {
        return AuthService::register($request->validated());
    }


    public function validateToken()
    {
        return AuthService::validateAccessToken();
    }

}
