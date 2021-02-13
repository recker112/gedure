<?php

namespace App\Http\Controllers\Api;

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
use App\Models\Boleta;

class BoletaController extends Controller
{
	public function index(TableRequest $request)
	{
		$search = urldecode($request->search);
		$curso = $request->curso;
		$seccion = $request->seccion;
		
		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$users = User::withCount('boletas')
			->where('privilegio', 'V-')
			->has('alumno')
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
				$query->with(['alumno' => function ($query) {
						$query->orderBy('n_lista');
					}]);
			})
			->when(empty($curso) && empty($seccion), function ($query) {
				$query->orderBy('users.id', 'desc');
			})
			->offset($page)
			->limit($perPage)
			->get()
			->makeHidden(['personal_data', 'email', 'actived_at'])
			->toArray();
			
		$usersCount = User::withCount('boletas')
			->where('privilegio', 'V-')
			->has('alumno')
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
				$query->with(['alumno' => function ($query) {
						$query->orderBy('n_lista');
					}]);
			})
			->count();
		
		return response()->json([
			'data' => $users,
			'page' => $request->page * 1, 
			'totalUsers' => $usersCount,
		], 200);
	}
	
	public function show($id)
	{
		$boletas = Boleta::where('user_id', $id)->get()->toArray();
		$user = User::find(intVal($id))->only('name');
		
		return response()->json([
			'boletas' => $boletas,
			'user' => $user,
		], 200);
	}
	
	public function showStudiend(Request $request)
	{
		$user = $request->user();
		
		return response()->json($user->boletas, 200);
	}
	
	public function edit(BoletaEditRequest $request, $id)
	{
		$boleta = Boleta::findOrFail(intVal($id));
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
		
		
		return response()->json([
				'msg' => 'Boleta actualizada',
			],200);
	}
	
	public function download($id)
	{
		$user = request()->user();
		$boleta = Boleta::findOrFail(intVal($id));
		
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
			$parser = new Parser();
			$pdf = $parser->parseFile(Storage::path($file));
			$text = $pdf->getText();
			$user = explode(PHP_EOL, $text);
			$user = explode(' ', $user[7])[0];
			$user = str_replace(['V','-'], "", $user);
			$userExist = User::has('alumno')
				->firstWhere('username', $user);
			
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
		
		return response()->json([
			'msg' => "$i boletas asignadas",
		],200);
	}
	
	public function destroy($id)
	{
		$boleta = Boleta::findOrFail(intVal($id));
		$filePath = $boleta->boleta;
		
		if ($boleta->forceDelete() && Storage::exists($filePath)) {
			Storage::delete($filePath);
			
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
		
		$i=0;
		foreach($ids as $id) {
			$user = User::find($id);
			$boleta = $user->boletas()
				->where('curso_id', $user->alumno->curso_id)
				->where('lapso', $request->lapso)
				->first();
			
			if ($boleta) {
				$this->destroy($boleta->id);
				$i++;
			}
		}
		return response()->json([
			'msg' => "$i boletas eliminadas"
		],200);
	}
}
