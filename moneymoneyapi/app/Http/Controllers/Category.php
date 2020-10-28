<?php

namespace App\Http\Controllers;
use App\Models\Category as categoryModel;
use Illuminate\Http\Request;

class Category extends Base
{
    protected $category;

    public function  __construct()
    {
        $this->category = new categoryModel();
    }
    public function listing()
    {
        $rows = $this->category::where([
                    ['status', 0],
                 ])
                ->orderBy('id','asc')
                ->get();
        return $this->success(['rows'=>$rows]);
    }

    public function create(Request $request)
    {
        $this->category->user_id = $request->user()->id;
        $this->category->name = $request->json('name');
        $this->category->description = $request->json('description');
        $this->category->save();

        $lastId = $this->category->id;
        return $this->success($this->category::find($lastId)) ;
    }

    public function remove($id)
    {
        $this->category::where('id',$id)->delete();
        return $this->success();
    }
}
