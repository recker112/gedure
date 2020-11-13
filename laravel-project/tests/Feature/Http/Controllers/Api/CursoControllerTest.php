<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Curso;
use App\Models\Alumno;

use Illuminate\Support\Facades\DB;

class CursoControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testPruebas()
	{
		$user = User::find(2);
		$curso = Curso::firstWhere('code', '5-A');
		
		$json = [
			"user" => $user->toArray(),
			'alumno_data' => $user->alumno->toArray(),
			'curso_data' => $user->alumno->curso->toArray()
		];
		
		$this->orderAlumnos($curso->id);
		
		$users = array();
		$i=0;
		foreach($curso->alumnos as $alumno) {
			$users[$i] = [
				'alumno' => $alumno->toArray(),
				'user' => $alumno->user->toArray(),
				'personalData' => $alumno->user->personalData()->toArray(),
				'config' => $alumno->user->config()->toArray()
			];
			$i++;
		}
		dd($users);
		$response = $this->get('/');

		$response->assertStatus(200);
	}
	
	public function orderAlumnos($code){
		$studiendsInCurso = Alumno::select('alumnos.n_lista', 'alumnos.id', DB::raw('CAST(cedula AS UNSIGNED) AS converted'))
			->join('users', 'users.id', '=', 'alumnos.user_id')
			->where('curso_id', $code)
			->orderBy('converted', 'Asc')
			->get();
		
		$list = 1;
		foreach ($studiendsInCurso as $row) {
			$alumno = Alumno::find($row->id);
			$alumno->n_lista = $list;
			$alumno->save();
			$list++;
		}
		
		return true;
	}
}
