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
		$user = User::create([
			'username' => 'recker',
			'name' => 'Recker Ortiz',
			'privilegio' => 'A-',
			'email' => 'joseortiz112001@gmail.com',
			'password' => bcrypt('reckersito'),
			'registred_at' => now(),
		]);
		
		PersonalDataAdmin::create([
			'user_id' => $user->id,
			'sexo' => 'Masculino',
			'telefono' => '4273845463',
			'docente' => 'No',
		]);
		
		$user = User::create([
			'username' => 'rhadys',
			'name' => 'Rhadys garcia',
			'privilegio' => 'A-',
			'email' => 'uepapep.lacandelaria@gmail.com',
			'password' => bcrypt('12345'),
			'registred_at' => now(),
		]);
		
		PersonalDataAdmin::create([
			'user_id' => $user->id,
			'sexo' => 'Masculino',
			'telefono' => '4273845463',
			'docente' => 'No',
		]);
	}
}
