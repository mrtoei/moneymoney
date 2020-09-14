<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
class Users extends Controller
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

