<?php

namespace App\Http\Controllers\Bos;

use App\Http\Controllers\BaseController;
use App\Models\bos\Category as categoryModel;
use Illuminate\Http\Request;

class Category extends BaseController
{
    protected $category;

    public function  __construct()
    {
        $this->category = new categoryModel();
    }
    public function find()
    {
        $rows = $this->category::where([
            ['status', 0],
        ])
            ->where('parent_id',NULL)
            ->orderBy('id','asc')
            ->get();

        $alist = $this->parentNodeTree($rows);

        return $this->success(['rows'=> $alist]);
    }

    public function loadCategories(Request $request)
    {
        $userInfo = $request->user();
        $this->category;
        if(!empty($userInfo)){
            if ($userInfo->role == USER_ROLE_ADMIN){
                $rows = $this->category->where('user_id', $userInfo->id)->where([
                    ['status', 0],
                    ['parent_id', NULL]
                ])->orderBy('id','asc')->get();
            }else{
                $rows = $this->category->whereIn('user_id', [1, $userInfo->id])->where(
                    ['status', 0],
                    ['parent_id', NULL]
                )->orderBy('id','asc')->get();
            }

            foreach ($rows as $row){
                if(empty($row->parent_id)){
                    $row->child = $this->childCategories($row->id);
                }
            }

            return $this->success($rows);
        }
    }

    public function read($id)
    {
        $row = $this->category::where([
            ['id',$id]
        ])->first();
        return $this->success($row);
    }

    private function parentNodeTree(&$rows)
    {
        $alist = [];
        foreach ($rows as $row){
            array_push($alist, $row);

            $childRows= $this->parentLising($row->id);
            foreach ($childRows as $child){
                array_push($alist,$child);
            }
        }

        return $alist;
    }

    private function childCategories($id){
        return  $this->category::where([
            ['parent_id',$id],
            ['status',0]
        ])->orderBy('id','asc')->get();
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

    public function update(Request $request)
    {
        $id = $request->json('id');
        $this->category::where('id',$id)
            ->update([
                'name'=>$request->json('name'),
                'description'=>$request->json('description')
            ]);
        return $this->read($id);
    }

    public function remove($id)
    {
        $this->category::where('id',$id)->delete();
        return $this->success();
    }

    public function setSearchCriteria()
    {

    }
}
