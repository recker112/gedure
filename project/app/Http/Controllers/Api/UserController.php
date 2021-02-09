<?php

namespace App\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserEditRequest;
use App\Http\Requests\MatriculaRequest;
use App\Http\Requests\MassiveUsersRequest;
use App\Http\Requests\MassiveUsersUpdateRequest;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\CursoController;

// Excel
use App\Imports\StudiendImport;

// Models
use App\Models\User;
use App\Models\Curso;

class UserController extends Controller
{
  public function index(TableRequest $request)
	{
		$search = urldecode(request()->search);
		$type = $request->type;
		if ($type === 'V-NA') {
			$type = 'V-';
			$onlyNoAlumno = true;
		}
		$curso = $request->curso;
		$seccion = $request->seccion;

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$users = User::where(function ($query) {
				$search = urldecode(request()->search);
				$query->where('username', 'like', '%'.$search.'%')
					->orWhere('name', 'like', '%'.$search.'%')
					->orWhere('email', 'like', '%'.$search.'%');
			})
			->when($type === 'V-' && !isset($onlyNoAlumno), function ($query) {
				$query->whereHas('alumno', function (Builder $query) {
					$query->whereHas('curso', function (Builder $query) {
						$code = request()->curso.'-'.request()->seccion;
						$query->where('code', 'like', '%'.$code.'%');
					});
				});
			})
			->when(isset($onlyNoAlumno), function ($query) {
				$query->doesntHave('alumno');
			})
			->when(!empty($curso) && !empty($seccion), function ($query) {
				$query->with(['alumno' => function ($query) {
						$query->orderBy('n_lista');
					}]);
			})
			->when(empty($curso) && empty($seccion), function ($query) {
				$query->orderBy('users.id', 'desc');
			})
			->when(!$request->user()->can('users_edit_admins'), function ($query) {
				$query->where('privilegio', '!=', 'A-');
			})
			->where('privilegio', 'like', '%'.$type.'%')
			->offset($page)
			->limit($perPage)
			->get()
			->makeHidden(['personal_data', 'estudiante_data'])
			->toArray();
		
		$usersCount = User::where('privilegio', 'like', '%'.$type.'%')
			->where(function ($query) {
				$search = urldecode(request()->search);
				$query->where('username', 'like', '%'.$search.'%')
					->orWhere('name', 'like', '%'.$search.'%')
					->orWhere('email', 'like', '%'.$search.'%');
			})
			->when($type === 'V-', function ($query) {
				$query->whereHas('alumno', function (Builder $query) {
					$query->whereHas('curso', function (Builder $query) {
						$code = request()->curso.'-'.request()->seccion;
						$query->where('code', 'like', '%'.$code.'%');
					});
				});
			})
			->when(!empty($curso) && !empty($seccion), function ($query) {
				$query->join('alumnos', 'users.id', '=', 'alumnos.user_id')
					->orderBy('n_lista');
			})
			->when(!$request->user()->can('users_edit_admins'), function ($query) {
				$query->where('privilegio', '!=', 'A-');
			})
			->where('privilegio', 'like', '%'.$type.'%')
			->count();
		
		return response()->json([
			'data' => $users,
			'page' => $request->page * 1, 
			'totalUsers' => $usersCount,
		], 200);
	}
	
	public function show(Request $request, $id)
	{
		$user = User::findOrFail($id);
		
		if ($user->privilegio === 'A-' && !$request->user()->can('users_edit_admins')) {
			return response()->json([
				'msg' => 'No puede editar administradores',
			],403);
		}
		
		return response()->json([
			'user' => $user->toArray(),
			'permissions' => $this->formatPermissions($user),
		], 200);
	}
	
	public function create(UserRequest $request) 
	{
		// Verificar existencia del curso
		if ($request->privilegio === 'V-') {
			$code = $request->curso.'-'.$request->seccion;
			$curso = Curso::firstWhere('code', $code);
			
			if (!$curso) {
				return response()->json([
					'msg' => 'El curso '.$code.' no existe',
				],404);
			}
		}
		
		$dataUser = $request->only(['username', 'name', 'privilegio', 'email', 'password']);
		$dataUser['password'] = bcrypt($dataUser['password']);
		$user = User::create($dataUser);
		
		$user->personalData(false)->create();
		
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
		
		return response()->json([
			'msg' => 'Usuario creado'
		],201);
	}
	
	public function edit(UserEditRequest $request, $id)
	{
		$avatar = $request->file('avatar');
		$user = User::where('id',$id)->first();
		$delete_avatar = json_decode($request->delete_avatar);
		
		if ($user->privilegio === 'A-' && !$request->user()->can('users_edit_admins')) {
			return response()->json([
				'msg' => 'No puede editar administradores',
			],403);
		}
		
		// Actualizar curso
		if ($user->privilegio === 'V-' && !empty($request->curso) && !empty($request->seccion)) {
			$code = $request->curso.'-'.$request->seccion;
			$curso = Curso::firstWhere('code', $code);
			
			if (!$curso) {
				return response()->json([
					'msg' => 'El curso '.$code.' no existe',
				],404);
			}
			
			$curso_old = $user->alumno;
			
			$user->alumno()->updateOrCreate(['user_id' => $user->id],
				[
					'curso_id' => $curso->id,
					'n_lista' => 99,
				]);
			
			CursoController::orderAlumnos($curso->id);
			if ($curso_old && $curso_old !== $curso->id) {
				CursoController::orderAlumnos($curso_old->curso_id);
			}
		}
		
		if ($delete_avatar) {
			Storage::disk('public')->delete($user->avatarOriginal);
			$user->avatar = null;
			$user->save();
		}
		
		// Actualizar avatar
		if ($avatar && !$delete_avatar) {
			Storage::disk('public')->delete($user->avatarOriginal);
			$path = $avatar->storeAs(
				"avatars", 'avatar_'.$user->username.'.'.$avatar->getClientOriginalExtension(), 'public'
			);
			$user->avatar = $path;
			$user->save();
		}
		
		// Actualizar user
		if ($request->only(['username', 'name', 'email', 'password'])) {
			if ($request->password) {
				$request->merge([
					'password' => bcrypt($request->password),
				]);
			}
			
			$user->update($request->only(['username', 'name', 'email', 'password']));
		}
		
		// Actualizar data personal
		if ($request->personalData) {
			$user->personalData(false)->update($request->personalData);
		}
		
		// Actualizar permisos
		$permissions = [];
		if ($request->super_admin && $user->privilegio === 'A-') {
			$user->assignRole('super-admin');
			$user->syncPermissions();
		}else if ($request->permissions) {
			$user->removeRole('super-admin');
			$arrayPermissions = [];
			foreach($request->permissions as $clave => $value) {
				if ($value) {
					$arrayPermissions[] = $clave;
				}
			}
			$user->syncPermissions($arrayPermissions);
		}
		
		return response()->json([
			'user' => $user->toArray(),
			'permissions' => $this->formatPermissions($user),
		],200);
	}
	
	public function editSelf(UserEditRequest $request)
	{
		$avatar = $request->file('avatar');
		$user = $request->user();
		$delete_avatar = json_decode($request->delete_avatar);
		
		if ($delete_avatar && $user->privilegio !== 'V-') {
			Storage::disk('public')->delete($user->avatarOriginal);
			$user->avatar = null;
			$user->save();
		}
		
		// Actualizar avatar
		if ($avatar && !$delete_avatar && $user->privilegio !== 'V-') {
			Storage::disk('public')->delete($user->avatarOriginal);
			$path = $avatar->storeAs(
				"avatars", 'avatar_'.$user->username.'.'.$avatar->getClientOriginalExtension(), 'public'
			);
			$user->avatar = $path;
			$user->save();
		}
		
		// Actualizar user
		if ($request->only(['username', 'name', 'email', 'password'])) {
			if ($request->password) {
				$request->merge([
					'password' => bcrypt($request->password),
				]);
			}
			
			if ($user->privilegio === 'V-') {
				$data = $request->only(['email', 'password']);
			}else {
				$data = $request->only(['name', 'email', 'password']);
			}
			
			$user->update($data);
		}
		
		// Actualizar data personal
		if ($request->personalData) {
			$user->personalData(false)->update($request->personalData);
		}
		
		// Activar cuenta
		if (!$user->actived_at) {
			$user->actived_at = now();
			$user->save();
		}
		
		return response()->json([
			'user' => $user->toArray(),
		],200);
	}
	
	public function delete($id)
	{
		$user = User::findOrFail($id);
		
		Storage::disk('public')->delete($user->avatarOriginal);
		$curso_id = $user->alumno;
		$user->delete();
		
		if ($curso_id) {
			$curso_id = $curso_id->curso_id;
			CursoController::orderAlumnos($curso_id);
		}
		
		return response()->json([
			'msg' => 'Cuenta desactivada'
		],200);
	}
	
	public function deleteMassive(MassiveUsersRequest $request)
	{
		$ids = json_decode(urldecode($request->ids));
		
		$i=0;
		foreach($ids as $id) {
			$user = User::find($id);
			
			if ($user) {
				$this->delete($id);
				$i++;
			}
		}
		return response()->json([
			'msg' => "Desactivadas $i cuentas"
		],200);
	}
	
	public function updateSeccionMassive(MassiveUsersUpdateRequest $request)
	{
		$ids = $request->ids;
		
		$code = $request->curso.'-'.$request->seccion;
		$curso = Curso::firstWhere('code', $code);

		if (!$curso) {
			return response()->json([
				'msg' => 'El curso '.$code.' no existe',
			],404);
		}
		
		$i=0;
		foreach($ids as $id) {
			$user = User::find($id);
			
			if ($user && $user->privilegio === 'V-') {
				$curso_old = $user->alumno;

				$user->alumno()->updateOrCreate(['user_id' => $user->id],
					[
						'curso_id' => $curso->id,
						'n_lista' => 99,
					]);

				if ($curso_old && $curso_old !== $curso->id) {
					CursoController::orderAlumnos($curso_old->curso_id);
				}
				$i++;
			}
		}
		
		if ($i) {
			CursoController::orderAlumnos($curso->id);
		}
		
		return response()->json([
			'msg' => "$i estudiantes actualizados"
		],200);
	}
	
	public function uploadMassiveStudiends(MatriculaRequest $request)
	{
		$file = $request->file('database');
		
		$result = (new StudiendImport)->queue($file)->allOnQueue('high');
		
		return response()->json([
			'msg' => 'Matricula en progreso',
		],200);
	}
	
	public function indexDeleted(TableRequest $request)
	{
		$search = urldecode(request()->search);
		$type = $request->type;

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$users = User::onlyTrashed()
			->where(function ($query) {
				$search = urldecode(request()->search);
				$query->where('username', 'like', '%'.$search.'%')
					->orWhere('name', 'like', '%'.$search.'%')
					->orWhere('email', 'like', '%'.$search.'%');
			})
			->where('privilegio', 'like', '%'.$type.'%')
			->offset($page)
			->limit($perPage)
			->get()
			->makeHidden(['personal_data', 'estudiante_data'])
			->toArray();
		
		$usersCount = User::onlyTrashed()
			->where(function ($query) {
				$search = urldecode(request()->search);
				$query->where('username', 'like', '%'.$search.'%')
					->orWhere('name', 'like', '%'.$search.'%')
					->orWhere('email', 'like', '%'.$search.'%');
			})
			->where('privilegio', 'like', '%'.$type.'%')
			->count();
		
		return response()->json([
			'data' => $users,
			'page' => $request->page * 1, 
			'totalUsers' => $usersCount,
		], 200);
	}
	
	public function restoreDeleted($id)
	{
		$user = User::onlyTrashed()->findOrFail(intVal($id));
		
		$user->restore();
		
		return response()->json([
			'msg' => 'Cuenta reactivada',
		], 200);
	}
	
	public function restoreDeletedMassive(MassiveUsersRequest $request)
	{
		$ids = json_decode(urldecode($request->ids));
		
		$i=0;
		foreach($ids as $id) {
			$user = User::onlyTrashed()->find($id);
			
			if ($user) {
				$this->restoreDeleted($id);
				$i++;
			}
		}
		return response()->json([
			'msg' => "$i cuentas reactivadas",
			'users_restored' => $i,
		],200);
	}
	
	public function destroy($id) {
		$user = User::onlyTrashed()->findOrFail(intVal($id));
		
		Storage::deleteDirectory("users/$user->id");
		
		if ($user->forceDelete()) {
			return response()->json([
				'msg' => "Cuenta eliminada",
			],200);
		}else {
			return response()->json([
				'msg' => "No se pudo eliminar la cuenta",
			],400);
		}
	}
	
	public function destroyMassive(MassiveUsersRequest $request) {
		$ids = json_decode(urldecode($request->ids));
		
		$i=0;
		foreach($ids as $id) {
			$user = User::onlyTrashed()->find($id);
			
			if ($user) {
				$this->destroy($id);
				$i++;
			}
		}
		return response()->json([
			'msg' => "$i cuentas reactivadas",
			'users_destroy' => $i,
		],200);
	}
	
	public function formatPermissions($user)
	{
		$permissions = [];
		if ($user->hasRole('super-admin')) {
			$permissions = [
				'super_admin' => true,
			];
		}else {
			$dbPermissions = $user->getPermissionNames();
			foreach ($dbPermissions as $clave) {
				$permissions[$clave] = true;
			}
		}
		
		return $permissions;
	}
}