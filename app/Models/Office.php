<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    use HasFactory;
    
    protected $guarded = ['id'];

    protected $casts = [
        'clock_out' => 'datetime:H:i',
        'clock_in' => 'datetime:H:i',
    ];
}
