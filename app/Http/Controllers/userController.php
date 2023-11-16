<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all(); // Cambia el modelo a User
        return response()->json($users);
    }

    public function create()
    {
        // Puedes implementar la lógica para crear un usuario si es necesario
    }

    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Asegúrate de cifrar la contraseña
            'role' => $request->role,
        ]);

        return $user;
    }

    public function show(Request $request)
    {
        $user = User::find($request->id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['data' => $user], 200);
    }

    public function edit(Request $request)
    {
        $user = User::find($request->id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return $user->id;
    }

    public function update(Request $request)
    {
        $user = User::find($request->id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Update user fields
        $user->fill($request->all());
        $user->save();

        return $user;
    }

    public function destroy(Request $request)
    {
        $user = User::findOrFail($request->id);

        // Elimina el registro
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
    public function token(){
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $token = $user->createToken('MyAppToken')->accessToken;
    
            return response()->json(['token' => $token]);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
