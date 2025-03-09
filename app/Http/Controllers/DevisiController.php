<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Devisi;
use Illuminate\Http\Request;

class DevisiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('menu-sidebar/Divisi/pages', [
            'devisi' => Devisi::with('KetuaDivisi')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::orderBy('name', 'asc')->get();
        return Inertia::render('menu-sidebar/Divisi/create/create-divisi', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validatedData = $request->validate([
            'name' => 'required',
            'ketua' => 'required',
        ]);

        Devisi::create($validatedData);

        return redirect()->route('devisi.index')->with('success', 'Divisi berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Devisi $devisi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Devisi $devisi)
    {
        return Inertia::render('menu-sidebar/Divisi/edit/edit-divisi', [
            'devisi' => $devisi,
            'users' => User::orderBy('name', 'asc')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Devisi $devisi)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'ketua' => 'required',
        ]);
        
        $devisi->update($validatedData);

        return redirect()->route('devisi.index')->with('success', 'Data berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Devisi $devisi)
    {   
        $devisi->delete();
        return back()->with('success', 'Data berhasil dihapus!');
    }

    public function getDevisi(Devisi $id)
    {
        return $id;
    }
}
