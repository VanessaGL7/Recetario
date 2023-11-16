<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Doctors;

class DoctorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $doctor = Doctors::all();
        return response()->json($doctor);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Your logic to display the form for creating doctors
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $doctor = Doctors::create([
            'doctor_name' => $request->doctor_name,
            'phone' => $request->phone,
            'professional_license' => $request->professional_license,
            'doctor_address' => $request->doctor_address,
            'institution' => $request->institution,
        ]);

        return $doctor;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $doctor = Doctors::where('doctor_name', $request->doctor_name)
            ->orWhere('phone', $request->phone)
            ->get();

        return $doctor;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $doctor = Doctors::where('doctor_name', $request->doctor_name)
            ->orWhere('phone', $request->phone)
            ->first();

        return $doctor->id;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $doctor = Doctors::find($request->id);
        $doctor->doctor_name = $request->doctor_name;
        $doctor->phone = $request->phone;
        $doctor->professional_license = $request->professional_license;
        $doctor->doctor_address = $request->doctor_address;
        $doctor->institution = $request->institution;
        $doctor->save();

        return $request;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // Use the findOrFail method to get an existing model or throw a 404 exception
        $doctor = Doctors::findOrFail($request->id);

        // Delete the record
        $doctor->delete();

        return response()->json(['message' => 'Doctor deleted successfully']);
    }
}
