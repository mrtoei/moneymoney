<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wallet extends BaseModal
{
    use HasFactory;
    protected $table='my_wallet';
    protected $fillable = [
        'id', 'user_id', 'type', 'name', 'description'
    ];
}
