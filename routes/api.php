<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DoctorsController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\MedicinesController;
use App\Http\Controllers\MedicinesTypeController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PrescriptionsController;


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



Route::get('/doctors', [DoctorsController::class, 'index']);
Route::post('/doctors/store', [DoctorsController::class, 'store']);
Route::get('/doctors/show', [DoctorsController::class, 'show']);
Route::get('/doctors/edit', [DoctorsController::class, 'edit']);
Route::put('/doctors/update', [DoctorsController::class, 'update']);
Route::delete('/doctors/destroy', [DoctorsController::class, 'destroy']);
Route::get('/doctors/token', [DoctorsController::class, 'token']);
//______________________________________________________________________
Route::get('/medicines', [MedicinesController::class, 'index']);
Route::post('/medicines/store', [MedicinesController::class, 'store']);
Route::get('/medicines/show', [MedicinesController::class, 'show']);
Route::put('/medicines/update', [MedicinesController::class, 'update']);
Route::delete('/medicines/destroy', [MedicinesController::class, 'destroy']);
//________________________________________________________________ 
Route::get('/medicine-types', [MedicinesTypeController::class, 'index']);
Route::post('/medicine-types/store', [MedicinesTypeController::class, 'store']);
Route::get('/medicine-types/show', [MedicinesTypeController::class, 'show']);
Route::put('/medicine-types/update', [MedicinesTypeController::class, 'update']);
Route::delete('/medicine-types/destroy', [MedicinesTypeController::class, 'destroy']);
//___________________________________________________________________________
Route::get('/patients', [PatientController::class, 'index']);
Route::post('/patients/store', [PatientController::class, 'store']);
Route::get('/patients/show', [PatientController::class, 'show']);
Route::put('/patients/update', [PatientController::class, 'update']);
Route::delete('/patients/destroy', [PatientController::class, 'destroy']);
//___________________________________________________________________________
Route::get('/prescriptions', [PrescriptionsController::class, 'index']);
Route::post('/prescriptions/store', [PrescriptionsController::class, 'store']);
Route::get('/prescriptions/show', [PrescriptionsController::class, 'show']);
Route::put('/prescriptions/update', [PrescriptionsController::class, 'update']);
Route::delete('/prescriptions/destroy', [PrescriptionsController::class, 'destroy']);
//___________________________________________________________________________
Route::post('/register', [RegisterController::class, 'register']);
// Ruta para el inicio de sesión
Route::post('/login', [RegisterController::class, 'login']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

