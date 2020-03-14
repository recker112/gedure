<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationInCursosData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cursos_data', function (Blueprint $table) {
            $table->char("curso_profe_guia", 10)->nullable();
            $table->foreign('curso_profe_guia')
                ->references('profe_guia_id')
                ->on('profes_guias_data')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cursos_data', function (Blueprint $table) {
            $table->dropForeign(['curso_profe_guia']);
        });
    }
}
