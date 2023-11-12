<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Prescriptions extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'doctor_name', 'indications', 'duration', 'frecuency', 'patient_id', 'medicines_id', 'tradename'];

    public function medicines()
    {
        return $this->belongsTo(Medicines::class, 'medicines_id');
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function doctor()
    {
        return $this->belongsTo(Doctors::class, 'doctor_id');
    }


}
