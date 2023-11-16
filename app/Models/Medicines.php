<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Medicines extends Model
{
    use HasFactory;

    protected $fillable = ['id','tradename','active_ingredient','presentation','dose','original_amount','current_amount','route_of_administration','expiration','id_medicine_type','image'];

    public function Medicinestype()
    {
        return $this->belongsTo(Medicinestype::class, 'id_medicine_type');
    }
    protected $fillable2 = ['id','tradename','active_ingredient','presentation','dose','original_amount','current_amount','route_of_administartion','expiration','id_medicine_type','image'];

    public function Prescriptions(): BelongsTo
    {
        return $this->belongsTo(Medicinestype::class, 'id_medicine_type');
    }
    
}
