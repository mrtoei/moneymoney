<?php

namespace App\Http\Controllers\bos;

use App\Http\Controllers\BaseController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class Users extends BaseController
{
    protected $user;
    public function __construct()
    {
        $this->user = new User();
    }

    public function regsiter()
    {
        $this->user->username = 'admin';
        $this->user->password = Hash::make('@admin');
        $this->user->firstname  = 'admin';
        $this->user->lastname  = 'Administrator';
        $this->user->email = 'admin@gmail.com';
        $this->user->role = 9;
        if($this->user->save()){
            return response()->json([
                'status'=>200,
                'msg'=>'User Created!!'
            ]);
        }
    }
}
