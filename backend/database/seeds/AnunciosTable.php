<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AnunciosTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
			$max = 100;
			for($i=0; $i < $max; $i++){
				DB::table('anuncios_data')->insert([
					'anuncio_title' => Str::random(10),
					'anuncio_content' => "Hola, soy una prueba muy pequeña, pero prueba es prueba.",
					'anuncio_owner' => 'reckersito',
					'anuncio_create_at' => now()->sub($max - $i, 'hours'),
				]);
			}
    }
}
