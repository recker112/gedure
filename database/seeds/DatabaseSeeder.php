<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 *
	 * @return void
	 */
	public function run()
	{
		//Limpiador de trablas
		$this->truncateAllData([
			'users',
			'admin_configs'
		]);

		$this->call(UsersTest::class);
		$this->call(AdminConfigSeeder::class);
	}

	public function truncateAllData(array $tables)
	{
		DB::statement('SET FOREIGN_KEY_CHECKS = 0;');

		foreach ($tables as $table) {
			DB::table($table)->truncate();
		}

		DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
	}
}
