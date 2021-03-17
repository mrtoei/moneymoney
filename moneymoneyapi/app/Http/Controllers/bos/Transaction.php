<?php

namespace App\Http\Controllers\bos;

use App\Http\Controllers\BaseController;

use Illuminate\Http\Request;
use App\Models\Bos\Category as categoryModel;
use App\Models\Bos\Transaction as transactionModel;
use App\Models\Bos\Wellet as welletModel;

use \stdClass;

class Transaction extends BaseController
{
    protected $category;
    protected $transaction;
    protected $wellet;

    public function __construct()
    {
        $this->category = new categoryModel();
        $this->transaction = new transactionModel();
        $this->wellet = new welletModel();
    }

    public function find(Request $request)
    {
        $model = (object)$request->json()->all();

        $rows = $this->existTransection($model);

        if(!empty($rows) && count($rows) > 0){
            $transectionRows = $this->findByWelletDate($model);
            return $this->success($transectionRows);
        }else{
            return $this->success();
        }
    }

    private function findByWelletDate($model)
    {
        $welletId = $model->wellet_id;
        $currentMonth =  date('Ym', strtotime($model->month_year));

        $dateRows = $this->defaultMonthRows($currentMonth);
        $transectionRows = [];
        foreach ($dateRows as $dateRow){
            $transections = $this->transaction::where([
                ['date',$dateRow],
                ['month',$currentMonth],
                ['wellet_id', $welletId],
                ['status', 0]
            ])->orderBy('created_at', 'desc')->get();

            if(!empty($transections)){
                foreach ($transections as $transection){
                    $transection->category = $this->category::find($transection->cat_id);
                    $transection->wellet =  $this->wellet::find($transection->wellet_id);
                }

                $rows = new stdClass();
                $rows->date = $dateRow;
                $rows->transections = $transections;
                $transectionRows[] = $rows;
            }
        }

        return $transectionRows;
    }

    private function  existTransection(&$model)
    {
        $welletId = $model->wellet_id;
        $YM =   date('Ym', strtotime($model->month_year));

        return $this->transaction::where([
            ['wellet_id', $welletId],
            ['month',$YM],
            ['status', 0]
        ])->get();
    }

    public function read($id)
    {
        $row = $this->transaction::where([
            ['id',$id]
        ])->first();

        $row->category =  $this->category::find($row->cat_id);
        $row->wellet =  $this->wellet::find($row->wellet_id);

        return $this->success($row);
    }

    public function create(Request $request)
    {
        $this->transaction->wellet_id = $request->json('wellet_id');
        $this->transaction->cat_id = $request->json('cat_id');
        $this->transaction->note = $request->json('note');
        $this->transaction->description = $request->json('description');
        $this->transaction->type = $request->json('type');
        $this->transaction->amount = $request->json('amount');
        $this->transaction->date = $request->json('date');
        $this->transaction->month = date('Ym', strtotime($request->json('date')));;

        if($this->transaction->save()){
            $lastId = $this->transaction->id;
            return $this->read($lastId);
        }
    }

    public function update(Request $request)
    {
        $id = $request->json('id');
        $this->transaction::where('id',$id)
            ->update([
                'date'=>$request->json('date'),
                'note'=>$request->json('note'),
                'amount'=>$request->json('amount'),
                'description'=>$request->json('description'),
                'type'=>$request->json('type'),
                'cat_id'=>$request->json('cat_id')
            ]);
        return $this->read($id);
    }

    public function remove($id)
    {
        $this->transaction::where('id',$id)->delete();
        return $this->success();
    }

    private function defaultMonthRows($month)
    {
        $firstDayMonth = date('Y-m-01', strtotime($month));
        $lastDayMonth  = date('Y-m-t', strtotime($month));

        $monthRows = [];
        for ($i = strtotime($lastDayMonth); $i >= strtotime($firstDayMonth); $i = $i - 86400) {
            $addDay = date( 'Y-m-d', $i );
            $date = date('Y-m-d',strtotime($addDay));
            array_push($monthRows, $date);
        }

        return $monthRows;
    }



}
