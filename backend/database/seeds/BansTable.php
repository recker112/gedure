<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BansTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('bans_data')->insert([
            'ban_cedula' => "banUser",
            'ban_attemps' => "1",
            'ban_locks' => '5',
        ]);
    }
}
