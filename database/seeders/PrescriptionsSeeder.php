<?php

namespace Database\Seeders;

use App\Models\Prescriptions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrescriptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prescription = new Prescriptions();
        $prescription->doctor_name = 'Dr. Smith';
        $prescription->indications = 'Take with meals';
        $prescription->duration = '7';
        $prescription->frecuency = 'Twice a day';
        $prescription->patient_id = 1; // Ajusta según tu lógica
        $prescription->medicines_id = 1; // Ajusta según tu lógica
        $prescription->tradename = 'Medicine XYZ';
        $prescription->save();
    }
}
