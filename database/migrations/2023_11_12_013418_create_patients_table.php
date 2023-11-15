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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('patient_name', 100);
            $table->integer('age');
            $table->decimal('weight', 5, 2);
            $table->decimal('height', 5, 2);
            $table->string('allergic', 255)->nullable();
            $table->string('email'); // Agregar la columna email como clave foránea
            $table->timestamps();
            
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
