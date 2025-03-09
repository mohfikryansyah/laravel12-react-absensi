<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Attendance extends Model
{
    use HasFactory;
    
    protected $guarded = ['id'];
    protected $casts = [
        'clock_out' => 'datetime:H:i:s',
        'clock_in' => 'datetime:H:i:s',
    ];
    protected $appends = ['created_at_diffforhumans', "tanggal_formatted", "durasi_jam_kerja"];

    protected function durasiJamKerja(): Attribute
    {
        return Attribute::get(function () {
            $totalDetik = $this->total_jam_kerja;
            $jam = floor($totalDetik / 3600);
            $menit = floor(($totalDetik % 3600) / 60);
            $detik = $totalDetik % 60;

            return "{$jam} jam {$menit} menit {$detik} detik";
        });
    }

    protected function tanggalFormatted(): Attribute
    {
        return Attribute::get(fn () => Carbon::parse($this->tanggal)->translatedFormat('d F Y'));
    }

    public function getCreatedAtDiffforhumansAttribute(): string
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
