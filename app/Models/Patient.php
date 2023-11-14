<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = ['id','patient_name','age','weight','height','allergic'];

    public function Prescriptions(): HasMany    
    {
        return $this->hasMany(Prescriptions::class);
    }

}
