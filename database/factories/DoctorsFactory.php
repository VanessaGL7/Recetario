<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctors>
 */
class DoctorsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'doctor_name' => $this->faker->name,
            'phone' => $this->faker->phoneNumber,
            'professional_license' => $this->faker->lexify('???????'),
            'doctor_address' => $this->faker->address,
            'institution' => $this->faker->company,
        ];
    }
}
