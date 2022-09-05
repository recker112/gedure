<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Gedure\PersonalDataAdmin;
use Illuminate\Suport\Facades\DB;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$personal_data = PersonalDataAdmin::create();
		
		$user = User::factory()->create([
			'username' => 'admin',
			'name' => 'Super admin',
			'privilegio' => 'A-',
			'password' => '1234',
			'actived_at' => now(),
		]);
		
		$personal_data->user()->save($user);
		
		$user->wallet()->create();
	}
}
