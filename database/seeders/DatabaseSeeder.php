<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Doctors;
use App\Models\Medicines;
use App\Models\Medicinestype;
use App\Models\Patient;
use App\Models\Prescriptions;
use App\Models\User;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        /*$this->call(PatientSeeder::class);
        $this->call(DoctorsSeeder::class);
        $this->call(MedicinestypeSeeder::class);
        $this->call(MedicinesSeeder::class);
        $this->call(PrescriptionsSeeder::class);*/

        Medicinestype::factory(10)->create();
        Medicines::factory(10)->create();
        Doctors::factory(10)->create();
        Patient::factory(10)->create();
        Prescriptions::factory()->count(5)->create();
        User::factory(10)->create();
        
    }
}
