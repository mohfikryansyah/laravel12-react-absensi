<?php

namespace App\Http\Controllers\Staff;

use App\Models\Office;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        $office = Office::first();
        $randomSentence = $this->randomSentences()[array_rand($this->randomSentences())];
        return view('Staff.dashboard', compact('randomSentence', 'office'));
    }

    private function randomSentences()
    {
        $sentences = [
            "Success is not final, failure is not fatal.",
            "Dream big, work hard.",
            "The best time to start was yesterday. The next best time is now.",
            "Do not wait for the perfect moment, take the moment and make it perfect.",
            "Hard work beats talent when talent doesn't work hard.",
        ];
    
        return $sentences;
    }
}
