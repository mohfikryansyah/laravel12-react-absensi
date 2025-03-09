<?php

namespace App\Models;

use App\Models\User;
use App\Models\Employee;
use App\Models\Attendance;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Devisi extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function employees()
    {
        return $this->hasMany(Employee::class, 'devisi_id');
    }

    public function ketua()
    {
        return $this->belongsTo(User::class, 'ketua');
    }

    public function attendances()
    {
        return $this->hasManyThrough(Attendance::class, Employee::class, 'devisi_id', 'user_id', 'id', 'user_id');
    }

    public function KetuaDivisi()
    {
        return $this->belongsTo(User::class, 'ketua');
    }
}
