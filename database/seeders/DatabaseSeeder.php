<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Devisi;
use App\Models\Attendance;
use App\Models\Employee;
use App\Models\Office;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $admin = \App\Models\User::factory()->create([
            'name' => 'ADMIN',
            'email' => 'moh.fikryansyah@gmail.com',
        ]);

        $staff = \App\Models\User::factory()->create([
            'name' => 'STAFF',
            'email' => 'fiq@gmail.com',
        ]);

        Devisi::create([
            'name' => 'Perencanaan, Evaluasi  dan Keuangan',
            'ketua' => 1,
        ]);
        Devisi::create([
            'name' => 'Umum dan Kepegawaian',
            'ketua' => 2,
        ]);

        

        
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'kasubag']);
        Role::create(['name' => 'staff']);

        Attendance::factory(20)->create();
        Office::factory(1)->create();
        Employee::factory(20)->create();

        $admin->assignRole('admin');
        $staff->assignRole('admin');
    }
}
