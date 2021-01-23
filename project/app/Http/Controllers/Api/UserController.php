<?php

namespace App\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserEditRequest;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\CursoController;

// Models
use App\Models\User;
use App\Models\Curso;

class UserController extends Controller
{
  public function index(TableRequest $request)
	{
		$user = $request->user();

		$search = urldecode(request()->search);
		$type = $request->type;
		$curso = $request->curso;
		$seccion = $request->seccion;

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$users = User::where('privilegio', 'like', '%'.$type.'%')
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
			->orderBy('users.id', 'desc')
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
			->count();
		
		return response()->json([
			'data' => $users,
			'page' => $request->page * 1, 
			'totalUsers' => $usersCount,
		], 200);
	}
	
	public function show($id)
	{
		$user = User::findOrFail($id);
		
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
		
		// Actualizar curso
		if ($user->privilegio === 'V-' && !empty($request->curso) && !empty($request->seccion)) {
			$code = $request->curso.'-'.$request->seccion;
			$curso = Curso::firstWhere('code', $code);
			
			if (!$curso) {
				return response()->json([
					'msg' => 'El curso '.$code.' no existe',
				],404);
			}
			
			$user->alumno()->update([
				'curso_id' => $curso->id,
				'n_lista' => 99,
			]);
			
			CursoController::orderAlumnos($curso->id);
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
	
	public function delete($id)
	{
		$user = User::findOrFail($id);
		
		Storage::disk('public')->delete($user->avatarOriginal);
		$user->delete();
		
		return response()->json([
			'msg' => 'Cuenta desactivada'
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
