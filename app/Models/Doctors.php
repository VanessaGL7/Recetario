<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Doctors extends Model
{
    use HasFactory;

    protected $fillable = ['id','doctor_name,phone','profecional_license','doctor_address','institution'];

    public function Prescriptions(): HasMany
    {
        return $this->hasMany(Prescriptions::class);
    }

}
