<?php

namespace App\Models;

class Category extends BaseModal
{
    protected $table='categories';
    protected $fillable = [
        'id',  'parent_id','user_id', 'name', 'description', 'status'
    ];
}
