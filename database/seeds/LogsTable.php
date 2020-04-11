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
				// DB::table('logs')->insert([
				// 'log_cedula' => "recker",
				// 'log_create_at' => now(),
				// 'log_action' => "Inicio de sesiรณn.",
				// ]);
			
				// DB::table('logs')->insert([
				// 'log_cedula' => "banUser",
				// 'log_create_at' => now()->sub(4,'days'),
				// 'log_action' => "Baneo permanente.",
				// ]);
				
				// DB::table('logs')->insert([
				// 'log_cedula' => "banUser",
				// 'log_create_at' => now()->sub(5,'days'),
				// 'log_action' => "Baneo temporal 1/5.",
				// ]);
			
				// DB::table('logs')->insert([
				// 'log_cedula' => "banUser",
				// 'log_create_at' => now()->sub(5,'days'),
				// 'log_action' => "Baneo temporal 1/5.",
				// ]);
    }
}
