<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DoctorsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Rutas para mostrar la lista de médicos
Route::get('/doctors', [DoctorsController::class, 'index']);


// Rutas para crear un nuevo médico
Route::post('/doctors/store', [DoctorsController::class, 'store']);

// Rutas para mostrar un médico específico
Route::get('/doctors/show', [DoctorsController::class, 'show']);

// Rutas para editar un médico
Route::get('/doctors/edit', [DoctorsController::class, 'edit']);

// Rutas para actualizar un médico
Route::put('/doctors/update', [DoctorsController::class, 'update']);

// Rutas para eliminar un médico
Route::delete('/doctors/destroy', [DoctorsController::class, 'destroy']);

// Ruta para obtener el token CSRF (opcional)
Route::get('/doctors/token', [DoctorsController::class, 'token']);


/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

