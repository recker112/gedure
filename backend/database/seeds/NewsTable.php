<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewsTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('news_data')->insert([
            'new_title' => "Test1",
            'new_content' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            'new_create_at' => now()->sub(2, 'days'),
            'new_owner' => 'reckersito',
        ]);

        DB::table('news_data')->insert([
            'new_title' => "Test2",
            'new_content' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            'new_create_at' => now()->sub(2, 'hours'),
            'new_owner' => 'reckersito',
        ]);

        DB::table('news_data')->insert([
            'new_title' => "Test3",
            'new_content' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            'new_create_at' => now(),
            'new_owner' => 'reckersito',
        ]);
    }
}
