<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCursosDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cursos_data', function (Blueprint $table) {
            $table->char("curso_id", 10);
            $table->char("curso_grado", 5);
            $table->char("curso_seccion", 3);
            $table->char("curso_profe_guia", 10);
            $table->primary("curso_id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cursos_data');
    }
}
