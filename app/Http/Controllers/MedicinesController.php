<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medicines;

class MedicinesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medicine = Medicines::all();
        return response()->json($medicine);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Your logic to display the medicine creation form
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $medicine = Medicines::create([
            'tradename' => $request->tradename,
            'active_ingredient' => $request->active_ingredient,
            'presentation' => $request->presentation,
            'dose' => $request->dose,
            'original_amount' => $request->original_amount,
            'current_amount' => $request->current_amount,
            'route_of_administration' => $request->route_of_administration,
            'expiration' => $request->expiration,
            'id_medicine_type' => $request->id_medicine_type,
            'image' => $request->image,
        ]);

        return $medicine;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $medicine = Medicines::where('tradename', $request->tradename)
            ->orWhere('id', $request->id) // You can also search by ID
            ->get();

        return $medicine;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $medicine = Medicines::where('tradename', $request->tradename)
            ->orWhere('id', $request->id)
            ->first();

        return $medicine->id;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $medicine = Medicines::find($request->id);
        $medicine->tradename = $request->tradename;
        $medicine->active_ingredient = $request->active_ingredient;
        $medicine->presentation = $request->presentation;
        $medicine->dose = $request->dose;
        $medicine->original_amount = $request->original_amount;
        $medicine->current_amount = $request->current_amount;
        $medicine->route_of_administration = $request->route_of_administration;
        $medicine->expiration = $request->expiration;
        $medicine->id_medicine_type = $request->id_medicine_type;
        $medicine->image = $request->image;

        $medicine->save();

        return $request;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // Use the findOrFail method to get an existing model or throw a 404 exception
        $medicine = Medicines::findOrFail($request->id);

        // Delete the record
        $medicine->delete();

        return response()->json(['message' => 'Medicine deleted successfully']);
    }
}
