<?php

namespace Database\Seeders;

use App\Models\Medicinestype;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicinesTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $medicinestype = new Medicinestype();
        $medicinestype->type_name = 'Paracetamol';
        $medicinestype->description = 'El paracetamol, también conocido como acetaminofén, es un fármaco con propiedades analgésicas (que combate el dolor) y antipiréticas (que combate la fiebre), disponible en el mercado en tabletas, jarabe, gotas o supositorios.';
        $medicinestype->save();
    }
}
