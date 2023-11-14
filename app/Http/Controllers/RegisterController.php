<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;
use Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'name'=>'required',
            'email'=>'required|email',
            'password'=>'required',
            'c_password'=>'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.',
            $validator->errors());
        }

        $input=$request->all();
        $input['password']=bcrypt($input['password']);
        $user=User::create($input);
        $success['token']=$user->createToken('MyApp')->accessToken;
        $success['name']=$user->name;
        return $this->sendResponse($success,
        'User Register successfully');
       
        
        /* Devolver el token como respuesta
        return response()->json(['token' => $token, 'name' => $user->name], 200);*/
    }

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->accessToken;

            // Devolver el token como respuesta
            return response()->json(['token' => $token, 'name' => $user->name], 200);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }
}

