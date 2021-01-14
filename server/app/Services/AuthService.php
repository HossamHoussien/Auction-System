<?php
namespace App\Services;

use Laravel\Passport\Client as PassportClient;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use GuzzleHttp\Client as HTTPClient;

use App\Models\User;

class AuthService
{

    public static function login(array $credentials)
    {
        $user = self::validateCredentials($credentials);
        try {
            $token = $user->createToken(config('app.name'));
            return response()->json([
                'access_token' => $token->accessToken,
                'user' => $user,
            ]);
        } catch (BadResponseException $e) {
            return response()->json("Something went wrong on the server", $e->getCode());
        }
    }


    public static function logout()
    {
    	auth('api')->user()->token()->delete();

        return response()->json([
            'status' => true,
            'message' => 'User Logged Out Successfully.'
        ], 200);
    }


    public static function register(array $credentials)
    {
        $user = User::create([
            'name' => $credentials['name'],
            'email' => $credentials['email'],
            'password' => Hash::make($credentials['password'])
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User Created Successfully.'
        ], 201);

    }


    public static function validateAccessToken()
    {
        return response()->json([
            'status' => true,
            'user' => auth('api')->user()
        ], 200);
    }


    private static function validateCredentials(array $credentials)
    {
        $user = User::whereEmail($credentials['email'])->first();

        $isValidPassword = Hash::check($credentials['password'], $user->password);

        if (!$isValidPassword)
            throw ValidationException::withMessages(['credentials' => 'The provided credentials are invalid ']);

        return $user;
    }

    private static function getPasswordClient(){
    	return PassportClient::where([
            'password_client' => true,
            'provider' => 'users'
        ])->firstOrFail();
    }

}