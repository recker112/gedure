<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBansDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bans_data', function (Blueprint $table) {
            $table->id('ban_id');
            $table->timestamps(0);
            $table->smallInteger('ban_attemps')->default(0);
            $table->smallInteger('ban_locks')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bans_data');
    }
}
