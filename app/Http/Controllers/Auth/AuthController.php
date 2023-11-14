<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function getToken()
{
    if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
        $user = Auth::user();
        $token = $user->createToken('MyAppToken')->accessToken;

        return response()->json(['token' => $token]);
    } else {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
}
