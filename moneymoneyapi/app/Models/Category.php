<?php

namespace App\Models;

use App\Models\BaseModal;

class Category extends BaseModal
{
    protected $table='categories';
    protected $fillable = [
        'id',  'parent_id','user_id', 'name', 'description', 'status'
    ];
}
