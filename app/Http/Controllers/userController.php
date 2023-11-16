<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all(); // Change the model to User
        return response()->json($users);
    }

    public function create()
    {
        // You can implement the logic to create a user if needed
    }

    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Make sure to encrypt the password
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

        // Delete the record
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function token()
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
