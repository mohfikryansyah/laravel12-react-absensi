<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;

class AutoAttendanceAlpa extends Command
{
    protected $signature = 'attendance:auto-alpa';
    protected $description = 'Menandai user sebagai Alpa jika belum absen sebelum jam 10 pagi, kecuali admin';

    public function handle()
    {
        $today = Carbon::today();

        // Cek apakah hari ini bukan Sabtu atau Minggu
        if ($today->isWeekend()) {
            $this->info('Hari ini akhir pekan, tidak ada absensi Alpa.');
            return;
        }

        // Cek apakah sudah lewat jam 10 pagi
        $now = Carbon::now();
        if ($now->hour < 18) {
            $this->info('Belum jam 6 sore, absen Alpa belum dijalankan.');
            return;
        }

        $this->info("Memeriksa user yang belum absen untuk ditandai sebagai Alpa...");

        $usersWithoutAttendance = User::whereDoesntHave('roles', function ($roleQuery) {
                $roleQuery->where('name', 'admin'); // Hindari admin
            })
            ->whereDoesntHave('attendances', function ($query) use ($today) {
                $query->whereDate('tanggal', $today);
            })
            ->get();

        foreach ($usersWithoutAttendance as $user) {
            Attendance::create([
                'user_id' => $user->id,
                'clock_in' => '00:00:00',
                'clock_out' => '00:00:00',
                'status' => 'Alpa',
                'tanggal' => $today,
                'keterangan' => 'Absen otomatis karena tidak hadir sebelum jam 6 sore',
            ]);

            $this->info("User ID {$user->id} ditandai sebagai Alpa.");
        }

        $this->info('Proses absensi Alpa selesai.');
    }
}
