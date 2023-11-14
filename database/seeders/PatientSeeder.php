<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patient = new Patient();
        $patient->patient_name = 'Juan Sin Miedo';
        $patient->age = 25;
        $patient->weight = 70.5;
        $patient->height = 175;
        $patient->allergic = 'No';
        $patient->save();
    }
}
