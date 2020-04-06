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
            'estudiante_name' => 'Recker Ortiz',
            'estudiante_avatar' => null,
            'estudiante_cedula' => 'recker',
            'estudiante_alumno_id' => 'E-1A-1'
        ]);
    }
}
