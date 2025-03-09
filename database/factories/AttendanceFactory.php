<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;

class AttendanceFactory extends Factory
{
    protected $model = Attendance::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = \App\Models\User::factory()->create();
        // Titik dasar untuk radius 1 km
        $baseLatitude = 0.5923660;
        $baseLongitude = 123.0132294;
        $radius = 1 / 111.32; // 1 km dalam derajat

        // Menghasilkan koordinat acak dalam radius 1 km dari titik dasar
        $latitude = $baseLatitude + (rand(-1000, 1000) / 1000) * $radius;
        $longitude = $baseLongitude + (rand(-1000, 1000) / 1000) * $radius;

        // Waktu clockIn antara 07:00 dan 07:30
        $clockInHour = 7;
        $clockInMinute = rand(0, 30);
        $clockInSecond = rand(0, 59);
        $clockIn = sprintf('%02d:%02d:%02d', $clockInHour, $clockInMinute, $clockInSecond);

        // Waktu clockOut antara 16:00 dan 17:30
        $clockOutHour = rand(16, 17);
        $clockOutMinute = rand(0, 30);
        $clockOutSecond = rand(0, 59);
        $clockOut = $this->faker->boolean(80) ? sprintf('%02d:%02d:%02d', $clockOutHour, $clockOutMinute, $clockOutSecond) : null;

        return [
            'user_id' => $user,
            'latitude' => $latitude,
            'longitude' => $longitude,
            'clock_in' => $clockIn,
            'clock_out' => $clockOut,
            'status' => $this->faker->randomElement(['Hadir', 'Izin', 'Sakit', 'Alpa', 'Perjalanan Dinas']),
            'keterangan' => $this->faker->word,
            'tanggal' => $this->faker->dateTimeBetween('2025-03-01', 'now')->format('Y-m-d'),
            'total_jam_kerja' => $clockOut ? Carbon::parse($clockIn)->diffInRealSeconds(Carbon::parse($clockOut)) : null,
        ];
    }
}
