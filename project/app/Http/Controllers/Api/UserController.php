<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\CursoController;
// Models
use App\Models\User;
use App\Models\PersonalDataUser;
use App\Models\PersonalDataAdmin;
use App\Models\Curso;
use App\Models\Alumno;

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
				],400);
			}
		}
		
		$dataUser = $request->only(['cedula', 'nombre', 'privilegio', 'email', 'password']);
		$dataUser['password'] = bcrypt($dataUser['password']);
		$dataUser['registred_at'] = now();
		$user = User::create($dataUser);
		
		if ($user->privilegio === 'V-') {
			PersonalDataUser::create([
				'user_id' => $user->id,
			]);
			
			Alumno::create([
				'curso_id' => $curso->id,
				'user_id' => $user->id,
				'n_lista' => 99
			]);
			
			CursoController::orderAlumnos($curso->id);
		}else if ($user->privilegio === 'A-') {
			PersonalDataAdmin::create([
				'user_id' => $user->id,
			]);
		}else {
			return response()->json([
				'msg' => "Privilegio no registrado"
			],400);
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
		
		return response()->json([
			'msg' => "Usuario creado"
		],201);
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
