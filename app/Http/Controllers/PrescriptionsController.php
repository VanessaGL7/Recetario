<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prescriptions;

class PrescriptionsController extends Controller
{
    public function index()
    {

    }

    public function create()
    {

    }

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

    public function show(Request $request)
    {
        $prescription = Prescriptions::find($request->id);

    if (!$prescription) {
        return response()->json(['error' => 'Prescription not found'], 404);
    }

    return response()->json(['data' => $prescription], 200);
        
    }

    public function edit(Request $request)
    {
        $prescription = Prescriptions::find($request->id);

        if (!$prescription) {
            return response()->json(['error' => 'Prescription not found'], 404);
        }

        return $prescription->id;
    }

    public function update(Request $request)
    {
        $prescription = Prescriptions::find($request->id);

        if (!$prescription) {
            return response()->json(['error' => 'Prescription not found'], 404);
        }

        // Update prescription fields
        $prescription->fill($request->all());
        $prescription->save();

        return $prescription;

    }

    public function destroy(Request $request)
    {
        $prescription = Prescriptions::find($request->id);

        if (!$prescription) {
            return response()->json(['message' => 'Prescripción no encontrada'], 404);
        }

        $isDeleted = $prescription->delete();

        if ($isDeleted) {
            return response()->json(['message' => 'Prescripción eliminada con éxito']);
        } else {
            return response()->json(['message' => 'Error al eliminar la prescripción'], 500);
        }
    }

    public function token()
    {
        return csrf_token();
    }
}
