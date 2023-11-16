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
        $medicine->id_medicine_type = 'https://th.bing.com/th/id/R.417f62a097591e896ac8308cb4ba6d37?rik=5JFn9zsMt99Qhg&riu=http%3a%2f%2fwww.peakpharmacyonline.co.uk%2fimages%2fproducts%2fzoom%2f1600684988-47156000.jpg&ehk=hW%2faDB9LsVZnTRUJ4PJyvEWiwGxUAPASuzWDLRKrqEI%3d&risl=&pid=ImgRaw&r=0';
        $medicine->save();
    }
}
