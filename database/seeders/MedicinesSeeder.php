<?php

namespace Database\Seeders;

use App\Models\Medicines;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicinesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $medicine = new Medicines();
        $medicine->tradename = 'Paracetamol';
        $medicine->active_ingredient = 'Paracetamol';
        $medicine->presentation = 'Paracetamol 600grm';
        $medicine->dose = '1';
        $medicine->original_amount = 10; // Cantidad original
        $medicine->current_amount = 10; // Cantidad actual
        $medicine->route_of_administration = 'Cada 2 dias';
        $medicine->expiration = '2023-12-31'; // Fecha de caducidad en formato 'YYYY-MM-DD'
        $medicine->id_medicine_type = 1; // Reemplaza con el ID del tipo de medicamento
        $medicine->save();
    }
}
