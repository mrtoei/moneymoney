<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\wallet as walletModel;

class Wallet extends BaseController
{
    protected $wallet;

    public function __construct()
    {
        $this->wallet = new walletModel();
    }

    public function listing(Request $request)
    {
        $user = $request->user();
        $result = $this->wallet::where([
            ['user_id',$user->id],
            ['status',0]
        ])->get();
        return $this->success($result);
    }

    public function read($id)
    {
        $row = $this->wallet::where([
            ['id',$id]
        ])->first();
        return $this->success($row);
    }

    public function create(Request $request)
    {
        $this->wallet->user_id = $request->user()->id;
        $this->wallet->type = $request->json('type');
        $this->wallet->name = $request->json('name');
        $this->wallet->description = $request->json('description');
        $this->wallet->save();

        $lastId = $this->wallet->id;

        return $this->read($lastId) ;
    }
}
