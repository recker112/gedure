<?php

use Illuminate\Database\Seeder;

class AdminConfigSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('admin_configs')->insert([
			'user_id' => 1,
			'created_at' => now(),
			'updated_at' => now()
		]);
	}
}
