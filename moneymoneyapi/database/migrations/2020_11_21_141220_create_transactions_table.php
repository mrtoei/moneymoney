<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wellet_id');
            $table->unsignedBigInteger('cat_id');
            $table->string('note',200);
            $table->string('description',200)->nullable(true);
            $table->tinyInteger('type',0);
            $table->decimal('amount',10,2);
            $table->dateTime('date');
            $table->string('photo',45)->nullable(true);
            $table->tinyInteger('status',1)->default(0);
            $table->timestamps();

            $table->foreign('wellet_id')->references('id')->on('my_wellet');
            $table->foreign('cat_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
