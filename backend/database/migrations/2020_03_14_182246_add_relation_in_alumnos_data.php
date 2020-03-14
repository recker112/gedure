<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationInAlumnosData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('alumnos_data', function (Blueprint $table) {
            $table->char("alumno_curso", 10);
            $table->foreign('alumno_curso')
                ->references('curso_id')
                ->on('cursos_data')
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
        Schema::table('alumnos_data', function (Blueprint $table) {
            $table->dropForeign(['alumno_curso']);
        });
    }
}
