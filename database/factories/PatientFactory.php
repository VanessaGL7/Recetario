<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'patient_name' => $this->faker->firstName,
            'age' => $this->faker->numberBetween($min = 18, $max = 100),
            'weight' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 40, $max = 120),
            'height' => $this->faker->numberBetween($min = 140, $max = 200),
            'allergic' => $this->faker->boolean,
        ];
    }
}
