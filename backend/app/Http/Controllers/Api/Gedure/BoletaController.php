<?php

namespace App\Http\Controllers\Api\Gedure;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Requests\BoletaRequest;
use App\Http\Requests\BoletaEditRequest;
use App\Http\Requests\MassiveBoletaRequest;
use App\Http\Requests\TableRequest;
use Smalot\PdfParser\Parser;
use Illuminate\Support\Facades\Storage;
use VIPSoft\Unzip\Unzip;
//Models
use App\Models\User;
use App\Models\Gedure\Boleta;

class BoletaController extends Controller
{
	public function index(TableRequest $request)
	{
		$search = urldecode($request->search);
		$curso = $request->curso;
		$seccion = $request->seccion;
		
		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$users = User::where('privilegio', 'V-')
			->where(function ($query) {
				$search = urldecode(request()->search);
				$query->where('username', 'like', '%'.$search.'%')
					->orWhere('name', 'like', '%'.$search.'%');
			})
			->whereHas('alumno', function (Builder $query) {
				$query->whereHas('curso', function (Builder $query) {
					$code = request()->curso.'-'.request()->seccion;
					$query->where('code', 'like', '%'.$code.'%');
				});
			})
			->when(!empty($curso) && !empty($seccion), function ($query) {
				$query->join('alumnos', 'users.id', '=', 'alumnos.user_id')
					->select('users.*', 'alumnos.n_lista')
					->orderBy('alumnos.n_lista', 'asc');
			})
			->when(empty($curso) && empty($seccion), function ($query) {
				$query->orderBy('users.id', 'desc');
			})
			->withCount('boletas')
			->offset($page)
			->limit($perPage)
			->get()
			->makeHidden(['email', 'actived_at'])
			->toArray();
			
		$usersCount = User::where('privilegio', 'V-')
			->where(function ($query) {
				$search = urldecode(request()->search);
				$query->where('username', 'like', '%'.$search.'%')
					->orWhere('name', 'like', '%'.$search.'%');
			})
			->whereHas('alumno', function (Builder $query) {
				$query->whereHas('curso', function (Builder $query) {
					$code = request()->curso.'-'.request()->seccion;
					$query->where('code', 'like', '%'.$code.'%');
				});
			})
			->when(!empty($curso) && !empty($seccion), function ($query) {
				$query->join('alumnos', 'users.id', '=', 'alumnos.user_id')
					->select('users.*', 'alumnos.n_lista')
					->orderBy('alumnos.n_lista', 'asc');
			})
			->count();
		
		return response()->json([
			'data' => $users,
			'page' => $request->page * 1, 
			'totalRows' => $usersCount,
		], 200);
	}
	
	public function show($id)
	{
		$user = User::with(['boletas' => function ($q) {
			$q->select('boletas.*')
			->join('cursos', 'cursos.id', '=', 'boletas.curso_id')
			->orderBy('cursos.code', 'desc');
		} , 'boletas.curso'])->find(intVal($id));
		$name = $user->name;
		$boletas = $user->boletas->toArray();
		
		return response()->json([
			'boletas' => $boletas,
			'user' => $name,
		], 200);
	}
	
	public function showStudiend(Request $request)
	{
		$user = $request->user();
		$boletas = $user->boletas()
			->select('boletas.*')
			->with('curso')
			->join('cursos', 'cursos.id', '=', 'boletas.curso_id')
			->orderBy('cursos.code', 'desc')
			->get()
			->toArray();
		
		return response()->json($boletas, 200);
	}
	
	public function edit(BoletaEditRequest $request, Boleta $boleta)
	{
		$filePath = "users/$boleta->user_id/boletas/{$boleta->curso->code}";
		$fileName = "lapso_{$boleta->lapso}_{$boleta->curso->code}.pdf";
		
		if (Storage::missing($boleta->boleta)) {
			$boleta->forceDelete();
			
			return response()->json([
				'msg' => 'La boleta ya no existe',
			],404);
		}
		
		Storage::delete($boleta->boleta);
		$path = $request->boleta->storeAs($filePath, $fileName);
		
		$boleta-> $path;
		$boleta->updated_at = now();
		$boleta->save();
		
		$payload = [
			'username' => $boleta->user->username,
			'name' => $boleta->user->name,
			'curso' => $boleta->curso->curso,
			'seccion' => $boleta->curso->seccion,
			'lapso' => $boleta->lapso,
		];

		$request->user()->logs()->create([
			'action' => "Boleta editada",
			'payload' => $payload,
			'type' => 'gedure'
		]);
		
		return response()->json([
				'msg' => 'Boleta actualizada',
			],200);
	}
	
	public function download(Boleta $boleta)
	{
		$user = request()->user();
		
		if (Storage::missing($boleta->boleta)) {
			return response()->json([
				'msg' => 'La boleta ya no existe',
			],404);
		}
		
		// Verificar permisos para descargar
		if ($user->privilegio === 'V-' && $user->can('boleta_download') && $user->id === intVal($boleta->user_id)) {
			return Storage::download($boleta->boleta);
		}else if ($user->privilegio === 'A-' && $user->can('boletas_index')) {
			return Storage::download($boleta->boleta);
		}
		
		return response()->json([
			'msg' => 'No puedes descargar esto'
		], 403);
	}
	
  public function upload(BoletaRequest $request)
	{
		$zip = $request->file('boletas');
		$lapso = $request->lapso;
		
		// Limpiar archivos
		$clear = Storage::files('unzipped');
		Storage::delete($clear);
		
		$unzipper = new Unzip();
		$unzipper->extract($zip->getPathName(), Storage::path('unzipped/'));
		$files = Storage::allFiles('unzipped');
		
		$i = 0;
		foreach($files as $file) {
			// NOTA(RECKER): Traducir PDF a texto
			$parser = new Parser();
			$pdf = $parser->parseFile(Storage::path($file));
			$text = $pdf->getText();
			$text = str_replace("\t", "", $text);
			
			// NOTA(RECKER): Buscar cedula
			$userExist = null;
			$reg = '/[0-9]{8,}/';
			$is_match = preg_match($reg, $text, $user);
			if ($is_match) {
				$user = $user[0];
				$userExist = User::has('alumno')
				->firstWhere('username', $user);
			}

			// NOTA(RECKER): Mover archivo
			if ($userExist) {
				$filePath = "users/$userExist->id/boletas/{$userExist->alumno->curso->code}/lapso_{$lapso}_{$userExist->alumno->curso->code}.pdf";
				
				if (Storage::exists($filePath)) {
					Storage::delete($filePath);
				}
				
				if ($boletaExist = Boleta::where('boleta', $filePath)) {
					$boletaExist->forceDelete();
				}
				
				Storage::move($file, $filePath);
				$userExist->boletas()->create([
					'boleta' => $filePath,
					'lapso' => $lapso,
					'curso_id' => $userExist->alumno->curso_id
				]);
				$i++;
			}
		}
		
		$payload = [
			'boletas' => $i,
		];

		$request->user()->logs()->create([
			'action' => "Boletas cargadas",
			'payload' => $payload,
			'type' => 'gedure'
		]);
		
		return response()->json([
			'msg' => "$i boletas asignadas",
		],200);
	}
	
	public function destroy(Boleta $boleta, $massive = false)
	{
		$filePath = $boleta->boleta;
		$boleta_curso = $boleta->curso->curso;
		$boleta_seccion = $boleta->curso->seccion;
		$boleta_username = $boleta->user->username;
		$boleta_name = $boleta->user->name;
		
		if ($boleta->forceDelete() && Storage::exists($filePath)) {
			Storage::delete($filePath);
			
			if (!$massive) {
				$payload = [
					'curso' => $boleta_curso,
					'seccion' => $boleta_seccion,
					'username' => $boleta_username,
					'name' => $boleta_name,
				];

				request()->user()->logs()->create([
					'action' => "Boleta eliminada",
					'payload' => $payload,
					'type' => 'gedure'
				]);
			}
			
			return response()->json([
				'msg' => "Boletas eliminada",
			],200);
		}else {
			return response()->json([
				'msg' => "No se pudo eliminar la boleta",
			],400);
		}
	}
	
	public function destroyMassive(MassiveBoletaRequest $request)
	{
		$ids = json_decode(urldecode($request->ids));
		$users = User::with('alumno')
			->whereIn('id', $ids)
			->get();
		
		$i=0;
		foreach($users as $user) {
			$boleta = $user->boletas()
				->with('curso', 'user:id,name,username')
				->where('curso_id', $user->alumno->curso_id)
				->where('lapso', $request->lapso)
				->first();
			
			if ($boleta) {
				$this->destroy($boleta, true);
				$i++;
			}
		}
		
		if (!$i) {
			return response()->json([
				'msg' => "No se ha eliminado ninguna boleta",
			], 400);
		}
		
		$payload = [
			'boletas' => $i,
		];

		$request->user()->logs()->create([
			'action' => "Boletas eliminadas masivamente",
			'payload' => $payload,
			'type' => 'gedure'
		]);
		
		return response()->json([
			'msg' => "$i boletas eliminadas"
		],200);
	}
}