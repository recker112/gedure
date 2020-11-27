<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\CursoRequest;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Log;
use App\Models\Curso;
use App\Models\Alumno;
use Illuminate\Support\Facades\DB;

class CursoController extends Controller
{
	public function index(TableRequest $request) {
		$search = $request->search;

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$cursos = Curso::where('code', 'like', '%'.$search.'%')
			->orderBy('created_at', 'desc')
			->offset($page)
			->limit($perPage)
			->get();
		
		if (!$cursos) {
			return response()->json([
				'msg' => 'No existen cursos'
			], 404);
		}
		
		//Total de logs
		$cursos_count = Curso::count();
		
		return response()->json([
			'data' => $cursos,
			'page' => request()->page * 1, 
			'totalPosts' => $cursos_count
		], 200);
	}
	
	public function create(CursoRequest $request) {
		$data = $request->toArray();
		$data['code'] = $data['name'].'-'.$data['seccion'];
		
		$curso = Curso::create($data);
		
		if ($curso) {
			return response()->json([
				'msg' => 'Curso creado'
			], 201);
		}else {
			return response()->json([
				'msg' => 'No se pudo crear la seccion',
			], 400);
		}
	}
	
	public function destroy($id) {
		$curso = Curso::findOrFail(1);
		
		$curso->delete();
			
		return response()->json([
			'msg' => 'Curso eliminado'
		], 200);
	}
	
	public function testPruebas()
	{
		/*
			NOTA (RECKER): De esta forma se puede obtener los usuarios que no tengan un alumno asignado.
		*/
		dd(User::doesntHave('alumno')->get()->toArray());
		
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
		
		//PERMISOS
		$test = User::find(1);
		$form = [
			'products_index' => true,
			'products_show' => false,
		];
		$test->syncPermissions([]);
		foreach($form as $clave => $value) {
			if ($value) {
				$test->givePermissionTo($clave);
			}
		}
		
		$back = $test->getAllPermissions();
		$permissions = [];
		$i = 0;
		foreach($back as $permiso) {
			$permissions[$i] = $permiso->name;
			$i++;
		}
		dd($permissions);
		
		//dd($users);
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
