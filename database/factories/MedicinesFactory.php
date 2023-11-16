<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medicines>
 */
class MedicinesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tradename' => $this->faker->word,
            'active_ingredient' => $this->faker->word,
            'presentation' => $this->faker->sentence,
            'dose' => $this->faker->word,
            'original_amount' => $this->faker->randomNumber(2),
            'current_amount' => $this->faker->randomNumber(2),
            'route_of_administration' => $this->faker->word,
            'expiration' => $this->faker->date,
            'id_medicine_type' => \App\Models\Medicinestype::all()->random()->id,
            'image' => $this->faker->sentence,
        ];
    }
}









