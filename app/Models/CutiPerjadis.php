<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CutiPerjadis extends Model
{
    /** @use HasFactory<\Database\Factories\CutiPerjadisFactory> */
    use HasFactory;

    protected $with = ['user'];
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
