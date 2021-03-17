<?php

namespace App\Http\Controllers;

class BaseController extends Controller
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
