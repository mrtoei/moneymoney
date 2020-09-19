<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaseModal extends Model
{
    protected $table='FALSE';
    protected $fillable = [];

    protected $casts = [
        'created_at' => 'datetime: Y-m-d H:i:s',
        'updated_at' => 'datetime: Y-m-d H:i:s',
    ];
}
