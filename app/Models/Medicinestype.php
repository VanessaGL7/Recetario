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
        return $this->hasMany(Medicines::class);
    }
    // En el modelo Medicine
public function medicineType()
{
    return $this->belongsTo(Medicinestype::class, 'id_medicine_type');
}

}
