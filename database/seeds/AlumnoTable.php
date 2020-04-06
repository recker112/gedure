<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AlumnoTable extends Seeder
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
			$maxStudiends = 40;
			
			for ($i=0; $i < count($cursos); $i++){
				for ($o=0; $o < count($secciones); $o++){
					for ($l=1; $l <= $maxStudiends; $l++){
						DB::table('alumnos_data')->insert([
							'alumno_id' => 'E-'.$cursos[$i].$secciones[$o].'-'.$l,
							'alumno_n_lista' => $l,
							'alumno_horario_status' => false,
							'alumno_nota_status' => true,
							'alumno_curso' => 'C-'.$cursos[$i].'-'.$secciones[$o],
						]);
					}
				}
			}
    }
}
