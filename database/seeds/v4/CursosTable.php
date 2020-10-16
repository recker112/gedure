<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CursosTable extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$cursos = ['1','2','3','4','5','6','1G','2G','3G','4G','5G','6G'];
		$secciones = ['A','B','C','U'];
		for($i=0; $i < count($cursos); $i++){
			for($o=0; $o < count($secciones); $o++){
				DB::table('cursos_data')->insert([
					'curso_id' => 'C-'.$cursos[$i].'-'.$secciones[$o],
					'curso_name' => $cursos[$i],
					'curso_seccion' => $secciones[$o]
				]);
			}
		}
	}
}
