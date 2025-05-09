<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::command('attendance:auto-cuti-perjadin')->everySecond();
Schedule::command('attendance:auto-alpa')->dailyAt('17:00');