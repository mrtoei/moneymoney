<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMyWelletTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('my_wellet', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')
                    ->foreign('user_id')
                    ->references('id')
                    ->on('user')
                    ->cascadeOnDelete()
                    ->cascadeOnUpdate();
            $table->string('name',200);
            $table->string('description',200)->nullable();
            $table->tinyInteger('status')->default(0);
            $table->timestamps();

            $table->index(['id','user_id']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('my_wellet');
    }
}
