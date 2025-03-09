<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->time('clock_in');
            $table->time('clock_out')->nullable();
            $table->enum('status', ['Hadir', 'Izin', 'Sakit', 'Alpa', 'Perjalanan Dinas']);
            $table->string('keterangan')->nullable();
            $table->date('tanggal')->nullable();
            $table->string('swafoto')->nullable();
            $table->integer('total_jam_kerja')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
