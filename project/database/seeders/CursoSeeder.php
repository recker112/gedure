<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
// Models
use App\Models\User;
use App\Models\Curso;
use App\Models\Alumno;
use App\Models\PersonalDataUser;

class CursoSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$user = User::create([
			'cedula' => '500',
			'nombre' => 'José Ortiz',
			'privilegio' => 'V-',
			'email' => 'estudiante@testing.test',
			'password' => bcrypt('estudiante'),
		]);
		
		PersonalDataUser::create([
			'user_id' => $user->id,
		]);
		
		$user2 = User::create([
			'cedula' => '400',
			'nombre' => 'José Ortiz',
			'privilegio' => 'V-',
			'email' => 'estudiante2@testing.test',
			'password' => bcrypt('estudiante'),
		]);
		
		PersonalDataUser::create([
			'user_id' => $user2->id,
		]);
		
		$curso = Curso::create([
			'code' => '5-A',
			'name' => '5',
			'seccion' => 'A'
		]);
		
		$curso = Alumno::create([
			'curso_id' => $curso->id,
			'user_id' => $user->id,
			'n_lista' => 1
		]);
		
		$curso = Alumno::create([
			'curso_id' => $curso->id,
			'user_id' => $user2->id,
			'n_lista' => 2
		]);
	}
}
