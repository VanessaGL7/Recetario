<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prescriptions;

class PrescriptionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Tu lógica para mostrar una lista de prescripciones
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Tu lógica para mostrar el formulario de creación de prescripciones
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $prescription = Prescriptions::create([
            'doctor_name' => $request->doctor_name,
            'indications' => $request->indications,
            'duration' => $request->duration,
            'frecuency' => $request->frecuency,
            'patient_id' => $request->patient_id,
            'medicines_id' => $request->medicines_id,
            'tradename' => $request->tradename,
        ]);

        return $prescription;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $prescription = Prescriptions::where('doctor_name', $request->doctor_name)
            ->orWhere('indications', $request->indications)
            ->get();

        return $prescription;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $prescription = Prescriptions::where('doctor_name', $request->doctor_name)
            ->orWhere('indications', $request->indications)
            ->first();

        return $prescription->id;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $prescription = Prescriptions::find($request->id);
        $prescription->doctor_name = $request->doctor_name;
        $prescription->indications = $request->indications;
        $prescription->duration = $request->duration;
        $prescription->frequency = $request->frequency;
        $prescription->patient_id = $request->patient_id;
        $prescription->medicines_id = $request->medicines_id;
        $prescription->tradename = $request->tradename;
        $prescription->save();

        return $request;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $prescription = Prescriptions::where('id', $request->id)->delete();

        return 'ok';
    }

    public function token()
    {
        return csrf_token();
    }
}
