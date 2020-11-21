<?php

namespace App\Models;

class Transaction extends BaseModal
{
    protected $table='transactions';
    protected $fillable = [
        'id',  'wellet_id','cat_id', 'note', 'description', 'type', 'amount', 'photo','status'
    ];

    protected $casts = [
        'date' => 'datetime: Y-m-d H:i:s',
    ];
}
