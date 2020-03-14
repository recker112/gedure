<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnunciosTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('anuncios_data')->insert([
            'anuncio_title' => "test1",
            'anuncio_content' => "Hola, soy una prueba muy pequeña, pero prueba es prueba.",
            'auncio_owner' => 'reckersito',
            'anuncio_timestamp' => 0,
        ]);

        DB::table('anuncios_data')->insert([
            'anuncio_title' => "test1",
            'anuncio_content' => "Hola, soy una prueba muy pequeña, pero prueba es prueba.",
            'auncio_owner' => 'reckersito',
        ]);
    }
}
