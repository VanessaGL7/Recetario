<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Medicinestype extends Model
{
    use HasFactory;
    protected $fillable = ['id','type_name','description'];

    public function Medicines(): HasMany    
    {
        return $this->hasMany(Medicines::class,'id_medicine_type');
    }
    // En el modelo Medicine
    public function Prescriptions()
    {
        return $this->hasMany(Prescriptions::class, 'id_medicine_type');
    }

}
