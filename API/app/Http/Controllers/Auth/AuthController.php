<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use JWTAuth;
use Validator;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    protected $maxLoginAttempts = 5;
    protected $lockoutTime = 60;

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $credentials = $request->only('email', 'password');

        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            $seconds = $this->limiter()->availableIn(
                $this->throttleKey($request)
            );
            return response()->json([
                'success' => false,
                'status' => 'too_many_attempts',
                'message' => Lang::get('auth.throttle', ['seconds' => $seconds])
            ], 400);
        }

        try {
            //Se a tentativa de login for falha
            if (!$token = JWTAuth::attempt($credentials)) {

                Log::info('Usuario não obteve êxito no login.');

                $this->incrementLoginAttempts($request);

                return response()->json([
                    'success' => false,
                    'status' => 'Credenciais inválidas'
                ], 401);
            } else {
                //Se a tentiva de login for bem sucedida

                $this->clearLoginAttempts($request);

                return $this->respondWithToken($token);
            }
        } catch (JWTException $e) {

            Log::error($e);

            return response()->json([
                'success' => false,
                'status' => 'could_not_create_token'
            ], 500);
        }
    }

    public function logout()
    {
        auth()->logout();

        return response()->json([
            'success' => true,
            'status' => 'successful_logout'
        ]);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL(),
        ]);
    }
}
