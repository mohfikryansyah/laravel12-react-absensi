<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\CutiPerjadis;
use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;

class AutoAttendanceCutiPerjadin extends Command
{
    protected $signature = 'attendance:auto-cuti-perjadin';
    protected $description = 'Mencatat kehadiran otomatis untuk user yang sedang cuti/perjalanan dinas, kecuali admin';

    public function handle()
    {
        $today = Carbon::today();

        // Cek apakah hari ini bukan Sabtu (6) atau Minggu (0)
        if ($today->isWeekend()) {
            $this->info('Hari ini akhir pekan, tidak ada absensi cuti/perjalanan dinas.');
            return;
        }

        // Ambil user yang sedang cuti/perjalanan dinas (kecuali admin)
        $cutiPerjadis = CutiPerjadis::whereDate('tanggal_awal', '<=', $today)
            ->whereDate('tanggal_akhir', '>=', $today)
            ->whereHas('user', function ($query) {
                $query->whereDoesntHave('roles', function ($roleQuery) {
                    $roleQuery->where('name', 'admin'); // Hindari user dengan role admin
                });
            })
            ->get();

        foreach ($cutiPerjadis as $cuti) {
            // Cek apakah sudah ada absensi hari ini
            $existingAttendance = Attendance::where('user_id', $cuti->user_id)
                ->whereDate('tanggal', $today)
                ->first();

            if (!$existingAttendance) {
                Attendance::create([
                    'user_id' => $cuti->user_id,
                    'clock_in' => '00:00:00',
                    'clock_out' => '00:00:00',
                    'status' => $cuti->keterangan, // "Cuti" atau "Perjalanan Dinas"
                    'tanggal' => $today,
                    'keterangan' => "Absensi otomatis",
                ]);

                $this->info("Absensi otomatis ditambahkan untuk User ID: {$cuti->user_id}");
            } else {
                $this->info("Absensi sudah ada untuk User ID: {$cuti->user_id}.");
            }
        }

        $this->info('Proses absensi cuti/perjalanan dinas selesai.');
    }
}
