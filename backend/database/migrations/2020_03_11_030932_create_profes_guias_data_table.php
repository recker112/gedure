<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfesGuiasDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profes_guias_data', function (Blueprint $table) {
            $table->char('profe_guia_id', 10);
            $table->char('profe_guia_name', 50);
            $table->char('profe_guia_telefono', 16)->nullable();
            $table->primary('profe_guia_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profes_guias_data');
    }
}
