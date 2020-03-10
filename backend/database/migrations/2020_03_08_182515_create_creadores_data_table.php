<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCreadoresDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('creadores_data', function (Blueprint $table) {
            $table->id('creador_id');
            $table->char("creador_name", 50)->charset('utf8');
            $table->char("creador_avatar", 100);
            $table->char("creador_cedula", 20)->charset('utf8');
            $table->foreign('creador_cedula')
                ->references('user_cedula')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('creadores_data');
    }
}
