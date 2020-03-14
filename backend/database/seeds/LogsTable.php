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
            'log_action' => "Inicio de sesión.",
        ]);
    }
}
