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
    	$passwordClient = self::getPasswordClient();

        $user = self::validateCredentials($credentials);

        $http = new HTTPClient;
        try {
            $response = $http->post(route('passport.token'), [
                'http_errors' => false, // add this to return errors in json
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => $passwordClient->id,
                    'client_secret' => $passwordClient->secret,
                    'username' => $credentials['email'],
                    'password' => $credentials['password'],
                    'provider' => "users"
                ],
            ]);

            $responseContent = json_decode($response->getBody()->getContents(), true);
            
            $responseContent['user'] = $user;
            
            return $responseContent;
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