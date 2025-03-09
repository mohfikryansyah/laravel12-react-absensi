<?php

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DevisiController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Settings\PasswordController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load(['attendances', 'employees']);
});

Route::post('/login', [AuthController::class, 'login'])
    ->middleware('guest');
// ->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/password', [PasswordController::class, 'update']);;
    Route::get('/office', [OfficeController::class, 'getOffice']);
    Route::post('/attendances', [AttendanceController::class, 'store']);
    Route::post('/attendances/clock-out', [AttendanceController::class, 'clock_out']);
    Route::patch('/employees/{employee}', [EmployeeController::class, 'update']);
    Route::get('/attendances/status', [AttendanceController::class, 'statusAttendance']);
    Route::get('/devisi/{id}', [DevisiController::class, 'getDevisi']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/isHeadOfDivision', function () {
        $user = Auth::user();

        $divisionsLed = $user->divisionsLed;

        if ($divisionsLed->isNotEmpty()) {
            $attendances = Attendance::whereHas('user.employeeProfile', function ($query) use ($divisionsLed) {
                $query->whereIn('devisi_id', $divisionsLed->pluck('id'));
            })->with(['user', 'user.employeeProfile.division'])->get();

            return response()->json([
                'isHeadOfDivision' => true,
                'attendances' => $attendances
            ]);
        }

        return response()->json([
            'isHeadOfDivision' => false,
            'message' => 'User is not a head of any division.'
        ]);
    });
});
Route::get('/location', [OfficeController::class, 'getLocation']);
