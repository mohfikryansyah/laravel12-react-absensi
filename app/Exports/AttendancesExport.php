<?php

namespace App\Exports;

use App\Models\Attendance;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class AttendancesExport implements FromCollection, WithHeadings, WithMapping, WithEvents
{
    protected $users;
    protected $startDate;
    protected $endDate;

    public function __construct($users, $startDate, $endDate)
    {
        $this->users = $users;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function collection()
    {
        return Attendance::with('user')
            ->when($this->users, function ($query) {
                return $query->whereIn('user_id', $this->users);
            })
            ->when($this->startDate, function ($query) {
                return $query->whereDate('tanggal', '>=', $this->startDate);
            })
            ->when($this->endDate, function ($query) {
                return $query->whereDate('tanggal', '<=', $this->endDate);
            })
            ->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'User Name',
            'Status',
            'Clock In',
            'Clock Out',
            'Latitude',
            'Longitude',
            'Keterangan',
            'Tanggal',
            // 'Swafoto',
            'Total Jam Kerja'
        ];
    }

    public function map($attendance): array
    {   
        $total_jam_kerja = $attendance->total_jam_kerja ?? 0;

        $hours = floor($total_jam_kerja / 3600);
        $minutes = floor(($total_jam_kerja % 3600) / 60);
        $seconds = $total_jam_kerja % 60;

        $formatted_time = sprintf('%d jam %d menit %d detik', $hours, $minutes, $seconds);
        $swafoto = 'http://absensi.test/' . asset('storage/' . $attendance->swafoto);

        return [
            $attendance->id,
            $attendance->user->name,
            $attendance->status,
            $attendance->clock_in ? $attendance->clock_in->format('H:i:s') : '00:00:00',
            $attendance->clock_out ? $attendance->clock_out->format('H:i:s') : '00:00:00',
            $attendance->latitude,
            $attendance->longitude,
            $attendance->keterangan,
            $attendance->tanggal ? date_format(date_create($attendance->tanggal), 'd F Y') : 'Tanggal tidak tersedia',
            // $attendance->swafoto ?  $swafoto : '',
            $formatted_time,
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Mengunci seluruh sheet
                $event->sheet->getDelegate()->getProtection()->setSheet(true);

                // Mengatur password proteksi (opsional)
                $event->sheet->getDelegate()->getProtection()->setPassword('password123');
            },
        ];
    }
}
