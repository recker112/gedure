<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstudianteTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('estudiantes_data')->insert([
            'estudiante_name' => 'Reckersito Ortiz',
            'estudiante_avatar' => null,
            'estudiante_cedula' => 'reckersito',
            'estudiante_alumno_id' => 'E_1A_1'
        ]);
    }
}
