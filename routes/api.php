<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\RegisterController;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DoctorsController;
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
//Passport_____________________________________________________________________
Route::post('register',[RegisterController::class,'register']);
Route::post('login',[RegisterController::class,'login']);

//Doctors______________________________________________________________________
Route::get('/doctors', [DoctorsController::class, 'index']);
Route::get('/doctors/show', [DoctorsController::class, 'show']);

//Medicines____________________________________________________________________
Route::get('/medicines', [MedicinesController::class, 'index']);
Route::get('/medicines/show', [MedicinesController::class, 'show']);

//MedicineTypes________________________________________________________________ 
Route::get('/medicine-types', [MedicinesTypeController::class, 'index']);
Route::get('/medicine-types/show', [MedicinesTypeController::class, 'show']);

//Patients_____________________________________________________________________
Route::get('/patients', [PatientController::class, 'index']);
Route::get('/patients/show', [PatientController::class, 'show']);

//Prescriptions_________________________________________________________________
Route::get('/prescriptions', [PrescriptionsController::class, 'index']);
Route::get('/prescriptions/show', [PrescriptionsController::class, 'show']);

//protected routes
Route::middleware('auth:api')->group(function () {
   
});

 //UserList________________________________________________________________________
 Route::get('users',[UserController::class,'index']);
 Route::post('/users/store', [UserController::class, 'store']);
 Route::post('/users/update/{id}', [UserController::class, 'update']);
 Route::post('/users/destroy/{id}', [UserController::class, 'destroy']);
 //Doctors_________________________________________________________________________
 Route::post('/doctors/store', [DoctorsController::class, 'store']);
 Route::post('/doctors/update/{id}', [DoctorsController::class, 'update']);
 Route::post('/doctors/destroy/{id}', [DoctorsController::class, 'destroy']);

 //Medicines_______________________________________________________________________
 Route::post('/medicines/store', [MedicinesController::class, 'store']);
 Route::post('/medicines/update/{id}', [MedicinesController::class, 'update']);
 Route::post('/medicines/destroy/{id}', [MedicinesController::class, 'destroy']);
 //MedicineTypes___________________________________________________________________
 Route::post('/medicine-types/store', [MedicinesTypeController::class, 'store']);
 Route::post('/medicine-types/update/{id}', [MedicinesTypeController::class, 'update']);
 Route::post('/medicine-types/destroy/{id}', [MedicinesTypeController::class, 'destroy']);
 //Patients________________________________________________________________________
 Route::post('/patients/store', [PatientController::class, 'store']);
 Route::post('/patients/update/{id}', [PatientController::class, 'update']);
 Route::post('/patients/destroy/{id}', [PatientController::class, 'destroy']);
 //Prescriptions___________________________________________________________________
 Route::post('/prescriptions/store', [PrescriptionsController::class, 'store']);
 Route::post('/prescriptions/update/{id}', [PrescriptionsController::class, 'update']);
 Route::post('/prescriptions/destroy/{id}', [PrescriptionsController::class, 'destroy']);