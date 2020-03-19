<?php

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'user_cedula' => "recker",
            'user_privilegio' => "V-",
            'user_password' => bcrypt('test'),
            'validate_at' => now(),
        ]);

        DB::table('users')->insert([
            'user_cedula' => "reckersito",
            'user_privilegio' => "A-",
            'user_password' => bcrypt('test'),
            'validate_at' => now(),
        ]);

        DB::table('users')->insert([
            'user_cedula' => "reckersote",
            'user_privilegio' => "CR-",
            'user_password' => bcrypt('test'),
            'validate_at' => now(),
        ]);

        DB::table('users')->insert([
            'user_cedula' => "banUser",
            'user_privilegio' => "CR-",
            'user_password' => bcrypt('test'),
            'validate_at' => now(),
        ]);
    }
}
