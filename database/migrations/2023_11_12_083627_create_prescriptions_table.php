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
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->string('doctor_name');
            $table->text('indications');
            $table->integer('duration');
            $table->string('frecuency');
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('medicines_id');
            $table->string('tradename');
            $table->timestamps();

            // Definir las claves foráneas
            $table->foreign('patient_id')->references('id')->on('patients');
            $table->foreign('medicines_id')->references('id')->on('medicines');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};

