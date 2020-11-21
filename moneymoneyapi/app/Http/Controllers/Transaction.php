<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction as transactionModel;

class Transaction extends BaseController
{
    protected $transaction;

    public function __construct()
    {
        $this->transaction = new transactionModel();
    }

    public function listing(Request $request)
    {
        $welletId = $request->json('id');
        $rows = $this->transaction::where([
                    ['wellet_id', $welletId],
                    ['status', 0]
                ])
                ->orderBy('id','asc')
                ->get();
        return $this->success($rows);
    }
}
