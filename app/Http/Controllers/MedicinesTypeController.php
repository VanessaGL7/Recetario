<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medicinestype;

class MedicinesTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medicine = Medicinestype::all();
        return response()->json($medicine);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $medicine = Medicinestype::create([
            'type_name' => $request->type_name,
            'description' => $request->description,
        ]);

        return $medicine;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $medicine = Medicinestype::where('type_name', $request->type_name)
            ->orWhere('description', $request->description)
            ->get();

        return $medicine;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $medicine = Medicinestype::where('type_name', $request->type_name)
            ->orWhere('description', $request->description)
            ->first();

        return $medicine->id;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $medicine = Medicinestype::find($request->id);
        $medicine->type_name = $request->type_name;
        $medicine->description = $request->description;
        $medicine->save();

        return $request;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // Utiliza el método findOrFail para obtener un modelo existente o lanzar una excepción 404
        $doctor = Medicinestype::findOrFail($request->id);

        // Elimina el registro
        $doctor->delete();

        return response()->json(['message' => 'Doctor eliminado con éxito']);
    }

}
