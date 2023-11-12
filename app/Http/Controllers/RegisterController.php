<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RegisterController extends ResponseController
{
//usuarios registro
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email'  => 'required|email',
            'email_verified_at'  => 'required|same:email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
        
        if($validator->fails()){
            return $this->sendError('Validation Error.',$validator ->errors());
        }
        $input=$request->all();

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken('seguridad')->accessToken;
        $success['UserName'] = $user->name;

        return $this->sendResponse($success,
        'User register successfully.');
    }
//login
public function login(Request $request)
{
    $data = $request->validate([
        'email' => 'email|required',
        'password' => 'required',
    ]);

    if (!auth()->attempt($data)) {
        return response(['error' => 'No Autorizado'], 401);
    }

    $token = auth()->user()->createToken('Login')->accessToken;
    
    // No incluir el token en la respuesta
    return response(['user' => auth()->user()], 200);
}
}
