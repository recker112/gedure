<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\CursoRequest;
use App\Http\Requests\MassiveUsersRequest;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\BoletaController;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Log;
use App\Models\Curso;
use App\Models\Alumno;
use App\Models\Boleta;

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
			->get()
			->makeVisible(['id', 'code']);
		
		//Total de logs
		$cursos_count = Curso::count();
		
		return response()->json([
			'data' => $cursos,
			'page' => request()->page * 1, 
			'totalCursos' => $cursos_count
		], 200);
	}
	
	public function create(CursoRequest $request) {
		$data = $request->toArray();
		$data['code'] = $data['curso'].'-'.$data['seccion'];
		$curso = Curso::firstWhere('code', $data['code']);
		
		if (!$curso) {
			$curso = Curso::create($data);
			
			$payload = [
				'curso' => $curso->code,
			];
			
			$request->user()->logs()->create([
				'action' => "Curso creado",
				'payload' => json_encode($payload),
				'type' => 'gedure'
			]);
			
			return response()->json([
				'msg' => "Curso $curso->code creado"
			], 201);
		}else {
			return response()->json([
				'msg' => "El curso $curso->code ya existe",
			], 400);
		}
	}
	
	public function destroy($id, $massive = false) {
		$curso = Curso::findOrFail(intVal($id));
		
		// Eliminar boletas
		$boletas = Boleta::where('curso_id', intVal($id))->get();
		$controller = new BoletaController();
		$countBoletas = count($boletas);
		foreach($boletas as $boleta) {
			$controller->destroy($boleta->id);
		}
		
		if (!$massive) {
			$payload = [
				'curso' => $curso->code,
				'boletas' => $countBoletas,
			];
			
			request()->user()->logs()->create([
				'action' => "Curso eliminado",
				'payload' => json_encode($payload),
				'type' => 'gedure'
			]);
		}
		
		$curso->delete();
			
		return response()->json([
			'msg' => 'Curso eliminado'
		], 200);
	}
	
	public function destroyMassive(MassiveUsersRequest $request)
	{
		$ids = json_decode(urldecode($request->ids));
		
		$i=0;
		$names=[];
		foreach($ids as $id) {
			$curso = Curso::find($id);
			
			if ($curso) {
				$names[]=$curso->code;
				$this->destroy($curso->id, true);
				$i++;
			}
		}
		
		$payload = [
			'cursos' => count($ids),
			'names' => $names,
		];

		$request->user()->logs()->create([
			'action' => "Cursos eliminados masivamente",
			'payload' => json_encode($payload),
			'type' => 'gedure'
		]);
		return response()->json([
			'msg' => "$i cursos eliminados"
		],200);
	}
	
	public static function orderAlumnos($id){
		$studiendsInCurso = Alumno::select('alumnos.n_lista', 'alumnos.id', DB::raw('CAST(username AS UNSIGNED) AS converted'))
			->join('users', 'users.id', '=', 'alumnos.user_id')
			->where('curso_id', $id)
			->orderBy('converted')
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