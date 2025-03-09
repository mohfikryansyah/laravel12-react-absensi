<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    protected static array $numbers = [];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        if (empty(self::$numbers)) {
            self::$numbers = range(3, 22);
            shuffle(self::$numbers);
        }

        // Ambil angka unik atau fallback ke angka random jika habis
        $userId = count(self::$numbers) > 0 ? array_shift(self::$numbers) : fake()->numberBetween(3, 22);

        return [
            'devisi_id' => fake()->randomElement([1, 2]),
            'user_id' => $userId,
            'phone_number' => "082290142433",
            'date_of_birth' => fake()->date('Y-m-d', '1990-01-01'),
            'date_joined' => fake()->dateTimeBetween('-5 years'),
            'gender' => fake()->randomElement(['Laki-laki', 'Perempuan']),
            'address' => fake()->address(),
        ];
    }
}
