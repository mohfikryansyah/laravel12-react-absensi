<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\CutiPerjadis;
use App\Models\User;
use Illuminate\Http\Request;

class CutiPerjadisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cutiperjadis = CutiPerjadis::latest()->get();
        $users = User::role('staff')->get();
        return Inertia::render('menu-sidebar/CutiPerjadis/pages', compact('cutiperjadis', 'users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required',
            'tanggal_awal' => 'required',
            'tanggal_akhir' => 'required',
            'keterangan' => 'required|in:Cuti,Perjalanan Dinas',
        ]);

        CutiPerjadis::create($validatedData);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(CutiPerjadis $cutiPerjadis)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CutiPerjadis $cutiPerjadis)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CutiPerjadis $cutiPerjadis)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CutiPerjadis $cutiPerjadis)
    {
        //
    }
}
