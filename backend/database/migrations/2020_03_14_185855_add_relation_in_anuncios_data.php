<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationInAnunciosData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('anuncios_data', function (Blueprint $table) {
            $table->char('anuncio_owner', 14);
            $table->foreign('anuncio_owner')
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
        Schema::table('anuncios_data', function (Blueprint $table) {
            $table->dropForeign(['anuncio_owner']);
        });
    }
}
