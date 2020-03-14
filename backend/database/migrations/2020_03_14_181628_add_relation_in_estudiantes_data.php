<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationInEstudiantesData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('estudiantes_data', function (Blueprint $table) {
            $table->char("estudiante_cedula", 14);
            $table->char("estudiante_alumno_id", 10);
            $table->foreign('estudiante_cedula')
                ->references('user_cedula')
                ->on('users')
                ->onDelete('cascade');
            $table->foreign('estudiante_alumno_id')
                ->references('alumno_id')
                ->on('alumnos_data')
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
        Schema::table('estudiantes_data', function (Blueprint $table) {
            $table->dropForeign(['estudiante_cedula']);
            $table->dropForeign(['estudiante_alumno_id']);
        });
    }
}
