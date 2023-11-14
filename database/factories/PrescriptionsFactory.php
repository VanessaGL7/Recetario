<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prescriptions>
 */
class PrescriptionsFactory extends Factory
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
            'indications' => $this->faker->text,
            'duration' => $this->faker->numberBetween($min = 1, $max = 20),
            'frecuency' => $this->faker->word,
            'patient_id' => \App\Models\Patient::factory(),
            'medicines_id' => \App\Models\Medicines::factory(),
            'tradename' => $this->faker->word,
        ];
    }
}
