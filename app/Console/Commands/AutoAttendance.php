<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;

class AutoAttendance extends Command
{
    protected $signature = 'attendance:auto';
    protected $description = 'Otomatis absen untuk pegawai dengan status perjalanan dinas atau cuti';

    public function handle()
    {
        $today = Carbon::today();

        // Ambil semua user yang memiliki perjalanan dinas atau cuti hari ini
        $users = User::whereHas('attendances', function ($query) use ($today) {
            $query->whereDate('tanggal', $today)
                ->where(function ($q) {
                    $q->whereBoolean('perjalanan_dinas', true)
                      ->orWhereBoolean('cuti', true);
                });
        })->get();

        foreach ($users as $user) {
            $attendance = Attendance::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'tanggal' => $today,
                ],
                [
                    'clock_in' => '07:00:00', // Default jam masuk
                    'clock_out' => '16:00:00', // Default jam keluar
                    'status' => $user->attendances()
                        ->whereDate('tanggal', $today)
                        ->value('perjalanan_dinas') ? 'Perjalanan Dinas' : 'Izin',
                    'perjalanan_dinas' => $user->attendances()
                        ->whereDate('tanggal', $today)
                        ->value('perjalanan_dinas'),
                    'cuti' => $user->attendances()
                        ->whereDate('tanggal', $today)
                        ->value('cuti'),
                    'total_jam_kerja' => $user->attendances()
                        ->whereDate('tanggal', $today)
                        ->value('perjalanan_dinas') ? 8 : null,
                ]
            );

            $this->info("Absensi otomatis dibuat untuk {$user->name} dengan status {$attendance->status}");
        }

        $this->info('Proses auto attendance selesai.');
    }
}
