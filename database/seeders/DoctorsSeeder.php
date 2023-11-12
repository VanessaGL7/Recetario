<?php

namespace Database\Seeders;

use App\Models\Doctors;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DoctorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $doctor = new Doctors();
        $doctor->doctor_name = 'Omar Acosta';
        $doctor->phone = '1234567890';
        $doctor->professional_license = 'Licencia123';
        $doctor->doctor_address = 'Uxmal #123 Infonavit morelos';
        $doctor->institution = 'UAA';
        $doctor->save();
    }
}
