<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfesTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         DB::table('profes_guias_data')->insert([
            'profe_guia_id' => "PG_001",
            'profe_guia_name' => "Enrrique Blanco",
        ]);
    }
}
