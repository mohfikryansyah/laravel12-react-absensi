<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Office>
 */
class OfficeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Rumah Fiqri',
            'latitude' => 0.5940557,
            'longitude' => 123.0146027,
            'radius' => 1000,
            'clock_in' => "07:00:00",
            'clock_out' => "17:00:00",
        ];
    }
}
