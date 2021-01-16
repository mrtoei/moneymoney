<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class Authentication extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->user = new User();
    }

    public function login(Request $request)
    {
        $username = $request->post('username');
        $password = $request->post('password');

        $user = $this->user::where('username',$username)->first();
        if($user){
            if(hash::check($password,$user->password)){
                return response()->json([
                    'status'=>200,
                    'user'=>[
                        'id'=>$user->id,
                        'firstname'=>$user->firstname,
                        'lastname'=>$user->lastname,
                        'role'=>$user->role,
                    ],
                    'token'=>$this->tokenResult($user)
                ],200);
            }else{
                return response()->json([
                    'msg'=>'Username or Password incorrect'
                ],404);
            }
        }else{
            return response()->json([
                'msg'=>'Username or Password incorrect'
            ],404);
        }

    }

    public function logout(Request $request)
    {
        $revoke = $request->user()->token()->delete();
        if($revoke){
            return response()->json([
                'status'=>200,
                'msg'=>'logout success'
            ],200);
        }
    }

    private function tokenResult($user){
        $token_Passport = $user->createToken($user->username);
        $token = $token_Passport->token;
        $token->expires_at = Carbon::now()->addDays(1);
        $token->save();
        return $token_Passport->accessToken;
    }
}
