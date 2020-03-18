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
        DB::table('cursos_data')->insert([
            'curso_id' => "C_1A",
            'curso_grado' => "1",
            'curso_seccion' => "A",
            'curso_profe_guia' => "PG_001",
        ]);
    }
}
