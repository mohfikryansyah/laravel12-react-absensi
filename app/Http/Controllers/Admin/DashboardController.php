<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Devisi;
use App\Models\Office;
use App\Models\Employee;
use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $today = Carbon::today();
        $office = Office::first();
        $query = Attendance::with('user');
        $attendances = $query->get();
        $countEmployees = $this->countEmployees();
        $countAttendances = $this->countAttendances();
        $countAttendancesToday = $this->countAttendancesToday();

        return Inertia::render('menu-sidebar/Dashboard/pages', compact('office', 'attendances', 'countEmployees', 'countAttendances', 'countAttendancesToday'));
    }

    private function countEmployees()
    {
        return Employee::count();
    }

    private function countAttendances()
    {
        return Attendance::count();
    }

    private function countAttendancesToday()
    {
        $today = Carbon::today();
        return Attendance::where('tanggal', $today)->count();
    }
}
