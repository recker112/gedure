<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\PersonalDataAdmin;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$user = User::factory()->create([
			'username' => 'admin',
			'name' => 'Super admin',
			'privilegio' => 'A-',
			'password' => bcrypt('1234'),
			'actived_at' => now(),
		]);
		
		PersonalDataAdmin::create([
			'user_id' => $user->id,
		]);
	}
}
