<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 *
	 * @return void
	 */
	public function run()
	{
		$this->call(UserSeeder::class);
		$this->call(AdminConfigSeeder::class);
		$this->call(CursoSeeder::class);
		$this->call(PostSeeder::class);
		
		\App\Models\User::factory(10)->create();
	}
}
