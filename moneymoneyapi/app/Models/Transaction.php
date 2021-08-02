<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends BaseModal
{
    use HasFactory;
    protected $table='transactions';
    protected $fillable = [
        'id',  'wallet_id','cat_id', 'note', 'description', 'type', 'amount', 'photo','status'
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];}
