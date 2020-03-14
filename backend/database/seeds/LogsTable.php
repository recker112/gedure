<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LogsTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('logs')->insert([
            'log_cedula' => "recker",
            'log_timestamp' => '2020-03-18 16:01:34',
            'log_action' => "Inicio de sesión.",
        ]);
    }
}
