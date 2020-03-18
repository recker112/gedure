<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationInCreadoresData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('creadores_data', function (Blueprint $table) {
            $table->char('creador_cedula', 14);
            $table->foreign('creador_cedula')
                ->references('user_cedula')
                ->on('users')
                ->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('creadores_data', function (Blueprint $table) {
            $table->dropForeign(['creador_cedula']);
        });
    }
}
