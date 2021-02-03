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
		$data['code'] = $data['curso'].'-'.$data['seccion'];
		
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
	
	public static function orderAlumnos($id){
		$studiendsInCurso = Alumno::select('alumnos.n_lista', 'alumnos.id', DB::raw('CAST(username AS UNSIGNED) AS converted'))
			->join('users', 'users.id', '=', 'alumnos.user_id')
			->where('curso_id', $id)
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
