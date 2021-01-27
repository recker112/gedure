<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Requests\BoletaRequest;
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
		
		return response()->json($boletas, 200);
	}
	
	public function download($id)
	{
		$user = request()->user();
		$boleta = Boleta::findOrFail($id);
		
		if (Storage::missing($boleta->boleta)) {
			return response()->json([
				'msg' => 'La boleta ya no existe',
			],404);
		}
		
		// Verificar permisos para descargar
		if ($user->privilegio === 'V-' && $user->can('boletas') && $user->id === intVal($boleta->user_id)) {
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
}
