<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DevisiController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\Staff\DashboardController;
use App\Http\Controllers\Admin\DashboardController as DashboardAdminController;
use App\Http\Controllers\CutiPerjadisController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::middleware(['auth', 'role:staff'])->prefix('staff')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('staff.dashboard');
});

Route::get('/dashboard', [DashboardAdminController::class, 'index'])->middleware(['auth', 'role:admin'])->name('dashboard');

Route::resource('/divisi', DevisiController::class);

Route::middleware('auth')->group(function () {
    Route::resource('/cuti-perjalanan-dinas', CutiPerjadisController::class);
    Route::resource('/attendances', AttendanceController::class)->except(['export']);
    Route::put('/attendance/clock-out', [AttendanceController::class, 'clock_out'])->name('attendances.clockout');
    Route::resource('/office', OfficeController::class)->except('index');
    Route::resource('/employees', EmployeeController::class);
    Route::resource('/devisi', DevisiController::class);
    Route::get('/export-attendances', [AttendanceController::class, 'export'])->name('attendances.export');
});

Route::get('/office', [OfficeController::class, 'index'])->name('office.index');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
