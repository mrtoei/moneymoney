<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Base extends Controller
{
    public function __construct()
    {
    }
    protected function success($data = NULL, $status = 200)
    {
        return response()->json([
            'success'=> TRUE,
            'data'=>$data
        ],$status);
    }

}
