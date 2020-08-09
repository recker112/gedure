<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnunciosDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anuncios_data', function (Blueprint $table) {
            $table->id('anuncio_id');
            $table->char('anuncio_title', 50);
            $table->longText('anuncio_content');
            $table->timestamp('anuncio_create_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('anuncios_data');
    }
}
