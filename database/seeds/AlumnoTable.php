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
        DB::table('alumnos_data')->insert([
             'alumno_id' => 'E_1A_1',
            'alumno_n_lista' => '1',
            'alumno_horario_status' => false,
            'alumno_nota_status' => true,
            'alumno_curso' => 'C-1-A',
        ]);
    }
}
