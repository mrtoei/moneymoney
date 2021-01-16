<?php

namespace App\Models\Bos;

use App\Models\BaseModal;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wellet extends BaseModal
{
    use HasFactory;
    protected $table='my_wellet';
    protected $fillable = [
        'id', 'user_id', 'name', 'description'
    ];
}
