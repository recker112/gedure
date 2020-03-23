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
            'anuncio_owner' => 'reckersito',
            'anuncio_create_at' => now()->sub(4, 'days'),
        ]);

        DB::table('anuncios_data')->insert([
            'anuncio_title' => "test1",
            'anuncio_content' => "Hola, soy una prueba muy pequeña, pero prueba es prueba.",
            'anuncio_owner' => 'reckersito',
            'anuncio_create_at' => now(),
        ]);
    }
}
