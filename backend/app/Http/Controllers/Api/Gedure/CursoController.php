<?php

namespace App\Http\Controllers\Api\Gedure;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\CursoRequest;
use App\Http\Requests\MassiveUsersRequest;
use App\Http\Requests\FindLikeRequest;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\Gedure\BoletaController;
// Models
use App\Models\User;
use App\Models\Gedure\Log;
use App\Models\Gedure\Curso;
use App\Models\Gedure\Alumno;
use App\Models\Gedure\Boleta;

class CursoController extends Controller
{
	public function index(TableRequest $request) {
		$search = $request->search;

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$cursos = Curso::where('code', 'like', '%'.$search.'%')
			->orderBy('code', 'asc')
			->paginate($perPage);

		// Mostrar datos
		$data = $cursos->getCollection();
		$data->each(function ($item) {
			$item->makeVisible(['id', 'code']);
		});
		$cursos->setCollection($data);
		
		return response()->json([
			'data' => $cursos->items(),
			'totalRows' => $cursos->total(),
		], 200);
	}
	
	public function findLike(FindLikeRequest $request) {
		$search = urldecode($request->search);
		$limit = $request->limit > 0 ? $request->limit : 0;
		
		$cursos = Curso::select('id','code')
			->where('code', 'like', "%$search%")
			->when($limit > 0, function ($query) {
					$query->limit($limit);
				})
			->get()
			->makeVisible(['id', 'code']);
		
		return response()->json($cursos, 200);
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
				'payload' => $payload,
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
	
	public function destroy(Curso $curso, $massive = false) {
		// Eliminar boletas
		$boletas = $curso->boletas;
		$controller = new BoletaController();
		$countBoletas = count($boletas);
		foreach($boletas as $boleta) {
			$controller->destroy($boleta, true);
		}
		
		if (!$massive) {
			$payload = [
				'curso' => $curso->code,
				'boletas' => $countBoletas,
			];
			
			request()->user()->logs()->create([
				'action' => "Curso eliminado",
				'payload' => $payload,
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
		$cursos = Curso::with('boletas', 'boletas.curso', 'boletas.user:id,name,username')
			->whereIn('id', $ids)->get();
		
		$i=0;
		$names=[];
		foreach($cursos as $curso) {
			$names[]=$curso->code;
			$this->destroy($curso, true);
			$i++;
		}
		
		if (!$i) {
			return response()->json([
				'msg' => "No se ha eliminado ningún curso",
			], 200);
		}
		
		$payload = [
			'cursos' => count($ids),
			'names' => $names,
		];

		$request->user()->logs()->create([
			'action' => "Cursos eliminados masivamente",
			'payload' => $payload,
			'type' => 'gedure'
		]);
		return response()->json([
			'msg' => "$i curso(s) eliminado(s)"
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
