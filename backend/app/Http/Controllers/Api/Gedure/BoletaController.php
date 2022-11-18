<?php

namespace App\Http\Controllers\Api\Gedure;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Requests\BoletaRequest;
use App\Http\Requests\BoletaEditRequest;
use App\Http\Requests\MassiveBoletaRequest;
use App\Http\Requests\TableRequest;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

//Models
use App\Models\User;
use App\Models\Gedure\Boleta;

// Jobs
use App\Jobs\Gedure\BoletasProcess;

// Notifications
use App\Notifications\SocketsNotification;

class BoletaController extends Controller
{
	public function index(TableRequest $request)
	{
		// Variables
		$search = urldecode($request->search);
		$curso = $request->curso;
		$seccion = $request->seccion;
		$perPage = $request->per_page;

		// Request
		$boletas = User::where('privilegio', 'V-')
			// Filtrador
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
			->paginate($perPage);

		// Mostrar datos
		$data = $boletas->getCollection();
		$data->each(function ($item) {
			$item->makeHidden(['email', 'actived_at']);
		});
		$boletas->setCollection($data);
		
		return response()->json([
			'data' => $boletas->items(),
			'page' => $request->page * 1, 
			'totalRows' => $boletas->total(),
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
		
		$boleta->boleta = $path;
		$boleta->updated_at = now();
		$boleta->save();

		// NOTA(RECKER): Notificaciones
		$userBoleta = $boleta->user;
		$title = 'Boleta actualizada manualmente';
		$content = "";
		$curso = strpos($boleta->curso->code, 'G');

		if ($curso === false) {
			$content = "Un administrador actualizó tu boleta {$boleta->curso->curso} año {$boleta->curso->seccion} - {$boleta->lapso}° lapso";
		}else {
			$content = "Un administrador actualizó tu boleta {$boleta->curso->curso} grado {$boleta->curso->seccion} - {$boleta->lapso}° lapso";
		}
		$userBoleta->notify(new SocketsNotification($title, $content));
		
		// NOTA(RECKER): Logs
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

		if ($user->privilegio === 'A-' && !$user->can('boletas_index')) {
			return response()->json([
				'msg' => 'No puedes descargar esta boleta'
			], 403);
		}

		if ($user->privilegio === 'V-' && (!$user->can('boleta_download') || $user->id !== intVal($boleta->user_id) || !$user->verifySolvente($boleta->created_at))) {
			return response()->json([
				'msg' => 'No puedes descargar esta boleta',
			], 403);
		}

		return Storage::download($boleta->boleta);
	}
	
  public function upload(BoletaRequest $request)
	{
		$user = User::find($request->user()->id);
		$zip = $request->file('boletas');
		$lapso = $request->lapso;
		
		// NOTA(RECKER): Cargar zip al servidor
		$zipPath = Storage::putFile('unzipped', new File($zip));
		
		BoletasProcess::dispatch($user, $zipPath, $lapso)->onQueue('high');
		
		return response()->json([
			'msg' => "Boletas en progreso",
		],200);
	}
	
	public function destroy(Boleta $boleta, $massive = false)
	{
		$filePath = $boleta->boleta;
		$boleta_curso = $boleta->curso->curso;
		$boleta_seccion = $boleta->curso->seccion;
		$boleta_username = $boleta->user->username;
		$boleta_name = $boleta->user->name;
		
		// NOTA(RECKER): Delete boleta
		if (!$boleta->forceDelete()) {
			return response()->json([
				'msg' => "No se pudo eliminar la boleta",
			],400);
		}

		// NOTA(RECKER): Delete dir if exist boleta
		if (!Storage::exists($filePath)) {
			Storage::delete($filePath);
		}

		$boleta->user->notify(new SocketsNotification(
			'Boleta eliminada manualmente',
			"Un administrador borró tu boleta {$boleta_curso} año {$boleta_seccion} - {$boleta->lapso}° lapso"
		));
			
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
			'msg' => "Boleta eliminada",
		],200);
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