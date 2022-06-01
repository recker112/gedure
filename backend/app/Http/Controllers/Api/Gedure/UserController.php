<?php

namespace App\Http\Controllers\Api\Gedure;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\FindLikeRequest;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserEditRequest;
use App\Http\Requests\MatriculaRequest;
use App\Http\Requests\MassiveUsersRequest;
use App\Http\Requests\MassiveUsersUpdateRequest;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Gedure\CursoController;

// Intervention
use Intervention\Image\Facades\Image;

// Excel
use App\Imports\StudiendImport;

// Models
use App\Models\User;
use App\Models\Gedure\Curso;
use App\Models\Gedure\PersonalDataAdmin;
use App\Models\Gedure\PersonalDataUser;

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
			->when(!empty($curso) && !empty($seccion) && $type === 'V-' && !isset($onlyNoAlumno), function ($query) {
				$query->select('users.id', 'users.avatar', 'users.actived_at', 'users.email', 'users.name', 'users.username', 'users.privilegio', 'alumnos.n_lista')
					->join('alumnos', 'users.id', '=', 'alumnos.user_id')
					->orderBy('n_lista');
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
			->toArray();
		
		$usersCount = User::where(function ($query) {
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
			->when(!empty($curso) && !empty($seccion) && $type === 'V-' && !isset($onlyNoAlumno), function ($query) {
				$query->select('users.id', 'users.avatar', 'users.actived_at', 'users.email', 'users.name', 'users.username', 'users.privilegio', 'alumnos.n_lista')
					->join('alumnos', 'users.id', '=', 'alumnos.user_id')
					->orderBy('n_lista');
			})
			->when(empty($curso) && empty($seccion), function ($query) {
				$query->orderBy('users.id', 'desc');
			})
			->when(!$request->user()->can('users_edit_admins'), function ($query) {
				$query->where('privilegio', '!=', 'A-');
			})
			->where('privilegio', 'like', '%'.$type.'%')
			->count();
		
		return response()->json([
			'data' => $users,
			'page' => $request->page * 1, 
			'totalRows' => $usersCount,
		], 200);
	}
	
	public function findLike(FindLikeRequest $request) {
		$search = urldecode(request()->search);
		
		$users = User::select('id','username','name','privilegio')
			->when($request->privilegio, function ($query) {
				$query->where('privilegio', request()->privilegio);
			})
			->where('username', 'like', "%$search%")
			->limit(15)
			->get();
		
		return response()->json($users, 200);
	}
	
	public function show(Request $request, $id)
	{
		$user = User::with(['alumno', 'alumno.curso', 'personal_data'])
			->findOrFail(intVal($id));
		
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
		// NOTA(RECKER): Verificar existencia del curso
		if ($request->privilegio === 'V-') {
			$curso = Curso::find(intVal($request->curso_id));
			
			if (!$curso) {
				return response()->json([
					'msg' => 'El curso '.$curso->code.' no existe',
				],404);
			}
		}
		
		$dataUser = $request->only(['username', 'name', 'privilegio', 'email', 'password']);
		$dataUser['password'] = bcrypt($dataUser['password']);
		$user = User::create($dataUser);
		
		// NOTA(RECKER): Crear datos adicionales
		if ($user->privilegio === 'V-') {
			$personal_data = PersonalDataUser::create();
			$personal_data->user()->save($user);
			
			$user->alumno()->create([
				'curso_id' => $curso->id,
				'user_id' => $user->id,
				'n_lista' => 99,
			]);
			
			CursoController::orderAlumnos($curso->id);
		}else if ($user->privilegio === 'A-') {
			$personal_data = PersonalDataAdmin::create();
			$personal_data->user()->save($user);
		}
		
		// NOTA(RECKER): Crear wallet
		$user->wallet()->create();
		
		// NOTA(RECKER): Asignar permisos
		if ($request->super_admin && $user->privilegio === 'A-') {
			$user->assignRole('super-admin');
		}else {
			foreach($request->permissions as $clave => $value) {
				if ($value) {
					$user->givePermissionTo($clave);
				}
			}
		}
		
		// NOTA(RECKER): Log
		$payload = [
			'privilegio' => $user->privilegio,
			'username' => $user->username,
			'email' => $user->email,
			'name' => $user->name,
		];
		$request->user()->logs()->create([
			'action' => 'Usuario creado',
			'payload' => $payload,
			'type' => 'user',
		]);
		
		return response()->json([
			'msg' => 'Usuario creado'
		],201);
	}
	
	public function edit(UserEditRequest $request, $id)
	{
		$avatar = $request->file('avatar');
		$user = User::with(['alumno', 'alumno.curso', 'personal_data', 'wallet'])
			->find(intVal($id));
		$delete_avatar = json_decode($request->delete_avatar);
		
		if ($user->privilegio === 'A-' && !$request->user()->can('users_edit_admins')) {
			return response()->json([
				'msg' => 'No puede editar administradores',
			],403);
		}
		
		// NOTA(RECKER): Actualizar cuso
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
		
		// NOTA(RECKER): Eliminar avatar
		if ($delete_avatar && $user->avatarOriginal !== null) {
			Storage::disk('user_avatars')->delete($user->avatarOriginal);
			$user->avatar = null;
			$user->save();
		}
		
		// NOTA(RECKER): Actualizar avatar
		if ($avatar && !$delete_avatar) {
			$rmAvatar = $user->avatarOriginal ? $user->avatarOriginal : [];
			Storage::disk('public')->delete($rmAvatar);
			$path = $avatar->store('', 'user_avatars');
			
			// NOTA(RECKER): Resize img
			$pathToResize = Storage::disk('user_avatars')->path($path);
			$img = Image::make($pathToResize);
			$img->resize(200, null, function ($constraint) {
				$constraint->aspectRatio();
			})->save($pathToResize);
			
			$user->avatar = $path;
			$user->save();
		}
		
		// NOTA(RECKER): Actualizar user
		if ($request->only(['username', 'name', 'email', 'password'])) {
			if ($request->password) {
				$request->merge([
					'password' => bcrypt($request->password),
				]);
			}
			
			$user->update($request->only(['username', 'name', 'email', 'password']));
		}
		
		// NOTA(RECKER): Actualizar datos personales
		if ($request->personal_data) {
			$user->personal_data->update($request->personal_data);
		}
		
		// NOTA(RECKER): Actualizar permisos
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
		
		// NOTA(RECKER): Log
		$payload = [
			'privilegio' => $user->privilegio,
			'username' => $user->username,
		];
		$request->user()->logs()->create([
			'action' => 'Usuario editado',
			'payload' => $payload,
			'type' => 'user',
		]);
		
		// NOTA(RECKER): Ocultar datos innecesarios
		$user->makeHidden(['permissions', 'roles']);
		
		return response()->json([
			'user' => $user->toArray(),
			'permissions' => $this->formatPermissions($user),
		],200);
	}
	
	public function editSelf(UserEditRequest $request)
	{
		$avatar = $request->file('avatar');
		$user = User::with(['alumno', 'personal_data', 'wallet'])
			->findOrFail($request->user()->id);
		$delete_avatar = json_decode($request->delete_avatar);
		
		// NOTA(RECKER): Eliminar avatar
		if ($delete_avatar && $user->privilegio !== 'V-' || $delete_avatar && $user->privilegio === 'V-' && $user->can('change_avatar')) {
			$rmAvatar = $user->avatarOriginal ? $user->avatarOriginal : [];
			Storage::disk('user_avatars')->delete($rmAvatar);
			$user->avatar = null;
			$user->save();
		}
		
		// NOTA(RECKER): Actualizar avatar
		if (($avatar && !$delete_avatar && $user->privilegio !== 'V-') || ($avatar && !$delete_avatar && $user->privilegio === 'V-' && $user->can('change_avatar'))) {
			$rmAvatar = $user->avatarOriginal ? $user->avatarOriginal : [];
			Storage::disk('user_avatars')->delete($rmAvatar);
			$path = $avatar->store('', 'user_avatars');
			
			// NOTA(RECKER): Rezise img
			$pathToResize = Storage::disk('user_avatars')->path($path);
			$img = Image::make($pathToResize);
			$img->resize(200, null, function ($constraint) {
				$constraint->aspectRatio();
			})->save($pathToResize);
			
			$user->avatar = $path;
			$user->save();
		}
		
		// NOTA(RECKER): Actualizar usuario
		if ($request->only(['name', 'email', 'password'])) {
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
		
		// NOTA(RECKER): Actualizar datos personales
		if ($request->personal_data) {
			$user->personal_data()->update($request->personal_data);
		}
		
		// NOTA(RECKER): Activar cuenta si no se encuentra activa
		if (!$user->actived_at) {
			$user->actived_at = now();
			$user->save();
		}
		
		// NOTA(RECKER): Log
		$request->user()->logs()->create([
			'action' => 'Actualización de datos',
			'type' => 'user',
		]);
		
		// NOTA(RECKER): Necesario para refrescar las tablas polimorficas
		$user->refresh();
		
		// NOTA(RECKER): Ocultar datos innecesarios
		$user->makeHidden(['permissions', 'roles']);
		
		return response()->json([
			'user' => $user->toArray(),
		],200);
	}
	
	public function delete(User $user, $massive = false)
	{
		$rmAvatar = $user->avatarOriginal ? $user->avatarOriginal : [];
		Storage::disk('user_avatars')->delete($rmAvatar);
		$curso_id = $user->alumno;
		$user->delete();
		
		if ($curso_id) {
			$curso_id = $curso_id->curso_id;
			CursoController::orderAlumnos($curso_id);
		}
		
		// NOTA(RECKER): Log
		if (!$massive) {
			$payload = [
				'privilegio' => $user->privilegio,
				'username' => $user->username,
				'email' => $user->email,
				'name' => $user->name,
			];
			request()->user()->logs()->create([
				'action' => 'Usuario desactivado',
				'payload' => $payload,
				'type' => 'user',
			]);
		}
		
		return response()->json([
			'msg' => 'Usuario desactivado'
		],200);
	}
	
	public function deleteMassive(MassiveUsersRequest $request)
	{
		$ids = json_decode(urldecode($request->ids));
		$users = User::whereIn('id', $ids)->get();
		
		$i=0;
		$users_list = [];
		foreach($users as $user) {
			$this->delete($user, true);
			$users_list[] = $user->privilegio.$user->username." ($user->name)";
			$i++;
		}
		
		if (!$i) {
			return response()->json([
				'msg' => "No se ha eliminado ningún usuario",
			], 200);
		}
		
		// NOTA(RECKER): Log
		$payload = [
			'users_disabled_count' => $i,
			'users_disabled' => $users_list,
		];
		$request->user()->logs()->create([
			'action' => 'Usuarios desactivados masivamente',
			'payload' => $payload,
			'type' => 'user',
		]);
		
		return response()->json([
			'msg' => "$i usuarios desactivados"
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
		$users=[];
		foreach($ids as $id) {
			$user = User::find($id);
			
			if ($user && $user->privilegio === 'V-') {
				$curso_old = $user->alumno;
				$users[] = $user->privilegio.$user->username." ($user->name)";

				$user->alumno()->updateOrCreate(['user_id' => $user->id], [
						'curso_id' => $curso->id,
						'n_lista' => 99,
					]);

				if ($curso_old && $curso_old !== $curso->id) {
					CursoController::orderAlumnos($curso_old->curso_id);
				}
				$i++;
			}
		}
		
		if ($i > 0) {
			CursoController::orderAlumnos($curso->id);
		}
		
		// NOTA(RECKER): Log
		$payload = [
			'massive_seccion_update_count' => $i,
			'massive_seccion_update' => $users,
			'curso' => $code,
		];
		$request->user()->logs()->create([
			'action' => 'Actualización de sección masiva',
			'payload' => $payload,
			'type' => 'user',
		]);
		
		return response()->json([
			'msg' => "$i estudiantes actualizados"
		],200);
	}
	
	public function uploadMassiveStudiends(MatriculaRequest $request)
	{
		$file = $request->file('database');
		
		$result = (new StudiendImport)->queue($file)->allOnQueue('high');
		
		$request->user()->logs()->create([
			'action' => 'Carga de matricula',
			'type' => 'gedure',
		]);
		
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
			'totalRows' => $usersCount,
		], 200);
	}
	
	public function restoreDeleted($id, $massive = false)
	{
		$user = User::onlyTrashed()->findOrFail(intVal($id));
		
		$user->restore();
		
		// NOTA(RECKER): Log
		if (!$massive) {
			$payload = [
				'privilegio' => $user->privilegio,
				'username' => $user->username,
				'email' => $user->email,
				'name' => $user->name,
			];
			request()->user()->logs()->create([
				'action' => 'Usuario restaurado',
				'payload' => $payload,
				'type' => 'user',
			]);
		}
		
		return response()->json([
			'msg' => 'Usuario reactivado',
		], 200);
	}
	
	public function restoreDeletedMassive(MassiveUsersRequest $request)
	{
		$ids = json_decode(urldecode($request->ids));
		$users = User::onlyTrashed()
			->whereIn('id', $ids)
			->get();
		
		$i=0;
		$users_list=[];
		foreach($users as $user) {
			$users_list[] = $user->privilegio.$user->username." ($user->name)";
			$this->restoreDeleted($user->id, true);
			$i++;
		}
		
		// NOTA(RECKER): Log
		$payload = [
			'users_restored_count' => $i,
			'users_restored' => $users_list,
		];
		$request->user()->logs()->create([
			'action' => 'Usuarios restaurados masivamente',
			'payload' => $payload,
			'type' => 'user',
		]);
		
		return response()->json([
			'msg' => "$i usuarios reactivados",
			'users_restored' => $i,
		],200);
	}
	
	public function destroy($id, $massive = false) {
		$user = User::onlyTrashed()->findOrFail(intVal($id));
		
		Storage::deleteDirectory("users/$user->id");
		
		// NOTA(RECKER): Log
		if (!$massive) {
			$payload = [
				'privilegio' => $user->privilegio,
				'username' => $user->username,
				'email' => $user->email,
				'name' => $user->name,
			];
			request()->user()->logs()->create([
				'action' => 'Usuario eliminado',
				'payload' => $payload,
				'type' => 'user',
			]);
		}
		
		if ($user->forceDelete()) {
			return response()->json([
				'msg' => "Usuario eliminado",
			],200);
		}else {
			return response()->json([
				'msg' => "No se pudo eliminar al usuario",
			],400);
		}
	}
	
	public function destroyMassive(MassiveUsersRequest $request) {
		$ids = json_decode(urldecode($request->ids));
		$users = User::onlyTrashed()
			->whereIn('id', $ids)
			->get();
		
		$i=0;
		$users_list=[];
		foreach($users as $user) {
			$users[] = $user->privilegio.$user->username." ($user->name)";
			$this->destroy($user->id, true);
			$i++;
		}
		
		// NOTA(RECKER): Log
		$payload = [
			'users_destroy_count' => $i,
			'users_destroy' => $users_list,
		];
		$request->user()->logs()->create([
			'action' => 'Usuarios eliminados masivamente',
			'payload' => $payload,
			'type' => 'user',
		]);
		
		return response()->json([
			'msg' => "$i usuarios eliminados",
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