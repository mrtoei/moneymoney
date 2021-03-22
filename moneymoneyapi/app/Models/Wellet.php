<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wellet extends BaseModal
{
    use HasFactory;
    protected $table='my_wellet';
    protected $fillable = [
        'id', 'user_id', 'name', 'description'
    ];
}
