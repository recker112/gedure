<?php

use Illuminate\Database\Seeder;

class UsersTest extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('users')->insert([
			'cedula' => 'recker',
			'nombre' => 'Recker Ortiz',
			'privilegio' => 'A-',
			'password' => '$2y$10$SyGW/Ad5GkSzAA6g0njgm.EfL9DUeb7qEDA5pWGjxirCXkcfiHtLW',
			'created_at' => now(),
			'updated_at' => now()
		]);
	}
}
