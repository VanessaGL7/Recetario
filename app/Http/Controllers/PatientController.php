<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patient = Patient::all();
        return response()->json($patient);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $patient = Patient::create([
            'patient_name' => $request->patient_name,
            'age' => $request->age,
            'weight' => $request->weight,
            'height' => $request->height,
            'allergic' => $request->allergic,
            'email' => $request->email,
        ]);

        return $patient;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $patient = Patient::where('patient_name', $request->patient_name)
            ->orWhere('id', $request->id)
            ->get();

        return $patient;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $patient = Patient::where('patient_name', $request->patient_name)
            ->orWhere('id', $request->id)
            ->first();

        return $patient->id;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $patient = Patient::find($request->id);
        $patient->patient_name = $request->patient_name;
        $patient->age = $request->age;
        $patient->weight = $request->weight;
        $patient->height = $request->height;
        $patient->allergic = $request->allergic;
        $patient->email = $request->email;
        $patient->save();

        return $request;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // Use the findOrFail method to get an existing model or throw a 404 exception
        $patient = Patient::findOrFail($request->id);

        // Delete the record
        $patient->delete();

        return response()->json(['message' => 'Patient deleted successfully']);
    }
}
