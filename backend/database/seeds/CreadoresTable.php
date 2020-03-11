<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CreadoresTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('creadores_data')->insert([
            'creador_name' => "ReckerSOTE",
            'creador_cedula' => "reckersote",
        ]);
    }
}
