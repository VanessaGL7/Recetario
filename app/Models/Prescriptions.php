<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Prescriptions extends Model
{
    use HasFactory;
    
    protected $fillable = ['id','doctor_name','indications','duration','frecuency','patient_id','medicines_id','tradename'];

    public function Medicines(): HasMany    
    {
        return $this->hasMany(Medicines::class);
    }
    protected $fillable2 = ['id','doctor_name','indications','duration','frecuency','patient_id','medicines_id','tradename'];

    public function Patient(): HasMany    
    {
        return $this->hasMany(Patient::class);
    }
    protected $fillable3 = ['id','doctor_name','indications','duration','frecuency','patient_id','medicines_id','tradename'];

    public function Doctors(): HasMany    
    {
        return $this->hasMany(Doctors::class);
    }
}
