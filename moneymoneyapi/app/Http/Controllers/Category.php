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
        $alist = [];
        $rows = $this->category::where([
                    ['status', 0],
                 ])
                ->where('parent_id',NULL)
                ->orderBy('id','asc')
                ->get();
        foreach ($rows as $row){
            array_push($alist, $row);

            $childRows= $this->parentLising($row->id);
            foreach ($childRows as $child){
                array_push($alist,$child);
            }
        }
        return $this->success(['rows'=> $alist]);
    }

    private function parentLising($id){
        return  $this->category::where([
            ['parent_id',$id],
            ['status',0]
        ])->get();
    }

    public function create(Request $request)
    {
        $this->category->user_id = $request->user()->id;
        $this->category->name = $request->json('name');
        $this->category->description = $request->json('description');
        if(!empty($request->json('parent_id'))){
            $this->category->parent_id = $request->json('parent_id');
        }
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
