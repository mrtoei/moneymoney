<?php

namespace App\Models;

use App\Models\BaseModal;

class Wellet extends BaseModal
{
    protected $table='my_wellet';
    protected $fillable = [
        'id', 'user_id', 'name', 'description'
    ];
}
