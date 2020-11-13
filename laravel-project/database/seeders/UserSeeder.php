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
			'cedula' => 'recker',
			'nombre' => 'Recker Ortiz',
			'privilegio' => 'A-',
			'email' => 'recker@testing.test',
			'password' => bcrypt('reckersito'),
		]);
		
		PersonalDataAdmin::create([
			'user_id' => $user->id,
			'sexo' => 'Masculino',
			'telefono' => '4273845463',
			'docente' => 'No',
		]);
	}
}
