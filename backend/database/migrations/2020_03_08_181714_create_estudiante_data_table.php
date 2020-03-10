<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudianteDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudiante_data', function (Blueprint $table) {
            $table->id('estudiante_id');
            $table->char("estudiante_name", 50)->charset('utf8');
            $table->char("estudiante_avatar", 100);
            $table->char("estudiante_cedula", 20)->charset('utf8');
            $table->char("estudiante_id_alumno", 10)->charset('utf8');
            $table->foreign('estudiante_cedula')
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
        Schema::dropIfExists('estudiante_data');
    }
}
