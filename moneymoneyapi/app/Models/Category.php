<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends BaseModal
{
    use HasFactory;
    protected $table='categories';
    protected $fillable = [
        'id',  'parent_id','user_id', 'name', 'description', 'status'
    ];

}
