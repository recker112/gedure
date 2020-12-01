<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\TableRequest;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\CursoController;
use Carbon\Carbon;

// Mails
use App\Mail\Invitation;

// Models
use App\Models\User;
use App\Models\Curso;

class UserController extends Controller
{
  public function index(TableRequest $request)
	{
		$user = $request->user();

		$search = urldecode($request->search);
		$type = $request->type;

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$users = User::where('cedula', 'like', '%'.$search.'%')
			->orWhere('nombre', 'like', '%'.$search.'%')
			->orWhere('email', 'like', '%'.$search.'%')
			->orderBy('id', 'desc')
			->offset($page)
			->limit($perPage)
			->get()
			->makeHidden(['personal_data', 'estudiante_data'])
			->toArray();
		
		$usersCount = User::where('cedula', 'like', '%'.$search.'%')
			->orWhere('nombre', 'like', '%'.$search.'%')
			->orWhere('email', 'like', '%'.$search.'%')
			->count();
		
		return response()->json([
			'data' => $users,
			'page' => $request->page * 1, 
			'totalUsers' => $usersCount,
		], 200);
	}
	
	public function create(UserRequest $request) 
	{
		// Verificar no existencia
		$userCedulaExist = User::withTrashed()
			->firstWhere('cedula', $request->cedula);
		
		if ($userCedulaExist) {
			return response()->json([
				'msg' => "La cédula o usuario $request->cedula ya existe"
			],400);
		}
		
		// Verificar existencia del curso
		if ($request->privilegio === 'V-') {
			$code = $request->curso.'-'.$request->seccion;
			$curso = Curso::firstWhere('code', $code);
			
			if (!$curso) {
				return response()->json([
					'msg' => 'El curso '.$request->curso.'-'.$request->seccion.' no existe',
				],404);
			}
		}
		
		$dataUser = $request->only(['cedula', 'nombre', 'privilegio', 'email', 'password']);
		$dataUser['password'] = bcrypt($dataUser['password']);
		$dataUser['registred_at'] = now();
		$user = User::create($dataUser);
		
		$user->personalData(false)->create([
			'user_id' => $user->id,
		]);
		
		if ($user->privilegio === 'V-') {
			$user->alumno()->create([
				'curso_id' => $curso->id,
				'user_id' => $user->id,
				'n_lista' => 99,
			]);
			
			CursoController::orderAlumnos($curso->id);
		}
		
		// Permissions
		if ($request->super_admin && $user->privilegio === 'A-') {
			$user->assignRole('super-admin');
		}else {
			foreach($request->permissions as $clave => $value) {
				if ($value) {
					$user->givePermissionTo($clave);
				}
			}
		}
		
		return response()->json($user->only(['id', 'cedula', 'email', 'nombre', 'privilegio']),201);
	}
	
	public function invite(UserRequest $request) 
	{
		// Verificar no existencia
		$userCedulaExist = User::withTrashed()
			->firstWhere('cedula', $request->cedula);
		
		if ($userCedulaExist) {
			return response()->json([
				'msg' => "La cédula o usuario $request->cedula ya existe"
			],400);
		}
		
		// Verificar existencia del curso
		if ($request->privilegio === 'V-') {
			$code = $request->curso.'-'.$request->seccion;
			$curso = Curso::firstWhere('code', $code);
			
			if (!$curso) {
				return response()->json([
					'msg' => 'El curso '.$request->curso.'-'.$request->seccion.' no existe',
				],404);
			}
		}
		
		$dataUser = $request->only(['cedula', 'nombre', 'privilegio', 'email']);
		$user = User::create($dataUser);
		
		$user->personalData(false)->create([
			'user_id' => $user->id,
		]);
		
		if ($user->privilegio === 'V-') {
			$user->alumno()->create([
				'curso_id' => $curso->id,
				'user_id' => $user->id,
				'n_lista' => 99,
			]);
			
			CursoController::orderAlumnos($curso->id);
		}
		
		// Permissions
		if ($request->super_admin && $user->privilegio === 'A-') {
			$user->assignRole('super-admin');
		}else {
			foreach($request->permissions as $clave => $value) {
				if ($value) {
					$user->givePermissionTo($clave);
				}
			}
		}
		
		// Crear y enviar invitación
		$user->invitation()->create([
			'invitation_key' => Str::random(40),
		]);
		
		Mail::to($user)->queue(new Invitation($user, $user->invitation->invitation_key));
		
		return response()->json([
			'msg' => 'Invitación enviada'
		],201);
	}
	
	public function updatePersonalData(Request $request, $id)
	{
		$user = User::findOrFail($id);
		
		if ($user->personalData()->update($request->personalData)) {
			return response()->json([
				'msg' => "Datos personales actualizados"
			],200);
		}else {
			return response()->json([
				'msg' => "No se pudo actualizar la información"
			],400);
		}
	}
	
	public function delete($id)
	{
		$user = User::findOrFail($id);
		
		$user->delete();
		
		return response()->json([
			'msg' => 'Usuario eliminado'
		],200);
	}
}
