<?php

namespace App\Http\Controllers\Bos;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;

use App\Models\Bos\Wellet as welletModel;

class Wellet extends BaseController
{
    protected $wellet;

    public function __construct()
    {
        $this->wellet = new welletModel();
    }

    public function listing(Request $request)
    {
        $user = $request->user();
        $result = $this->wellet::where([
            ['user_id',$user->id],
            ['status',0]
        ])->get();
        return $this->success((object)['rows'=>$result]);
    }

    public function read($id)
    {
        $row = $this->wellet::where([
            ['id',$id]
        ])->first();
        return $this->success($row);
    }

    public function create(Request $request)
    {
        $this->wellet->user_id = $request->user()->id;
        $this->wellet->name = $request->json('name');
        $this->wellet->description = $request->json('description');
        $this->wellet->save();

        $lastId = $this->wellet->id;
        return $this->success($this->wellet::find($lastId)) ;
    }
}
