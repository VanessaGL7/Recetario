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
        Schema::create('medicines', function (Blueprint $table) {
            $table->id();
            $table->string('tradename');
            $table->string('active_ingredient');
            $table->string('presentation');
            $table->string('dose');
            $table->integer('original_amount');
            $table->integer('current_amount');
            $table->string('route_of_administration');
            $table->date('expiration');
            $table->unsignedBigInteger('id_medicine_type'); // ForeignKey
            $table->string('image');
            $table->timestamps();

            // Definición de clave foránea
            $table->foreign('id_medicine_type')->references('id')->on('medicinestypes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicines');
    }
};

