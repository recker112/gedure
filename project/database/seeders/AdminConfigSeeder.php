<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AdminConfig;

class AdminConfigSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		AdminConfig::create([
			'user_id' => 1,
		]);
		
		AdminConfig::create([
			'user_id' => 2,
		]);
	}
}
