<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;

// Auth Class
use Illuminate\Support\Facades\Auth;

// Models
use App\Models\User;
use App\Models\Block;
use Spatie\Permission\Models\Permission;

class LoginController extends Controller
{
  public function login(LoginRequest $request)
	{
		// Verificar baneos
		$blockStatus = Block::getStatus($request->username);
		
		if ($blockStatus !== 'ok') {
			return response()->json($blockStatus, 400);
		}
		
		$credenciales = $request->only(['username', 'password']);
		
		$verifyAuth = Auth::attempt($credenciales);
		
		if (!$verifyAuth) {
			$jsonMessage = Block::checkAttemps($request->username);
			return response()->json($jsonMessage, 400);
		}
		
		$user = $request->user();
		
		// Verificar bloqueos
		$block = Block::firstWhere('user_id', $user->id);
		
		if ($block) {
			$block->delete();
		}
		
		// Token
		if ($user->privilegio === 'A-') {
			$tokenResult = $user->createToken($user->cedula.' access', ['*']);
		}else if ($user->privilegio === 'P-') {
			$tokenResult = $user->createToken($user->cedula.' access', ['profesor']);
		}else {
			$tokenResult = $user->createToken($user->cedula.' access', ['user']);
		}
    $token = $tokenResult->token;
		
		// expired_at
		if(!$request->checkbox) {
			$token->expires_at = now()->addHours(8);
		}
		
		$token->save();
		
		$permissions = $this->makePermissions($user);
		
		$user->logs()->create([
			'action' => "Inicio de sesión",
			'type' => 'session'
		]);

		//Regresar datos
		return response()->json([
			'access_key' => $tokenResult->accessToken,
			'user' => $user->toArray(),
			'permissions' => $permissions,
		], 200);
	}
	
	public function relogin()
	{
		$user = request()->user();
		
		$user->logs()->create([
			'action' => "Inicio de sesión por relogin",
			'type' => 'session'
		]);
		
		$permissions = $this->makePermissions($user);
		
		return response()->json([
			'user' => $user->makeHidden(['permissions']),
			'permissions' => $permissions
		], 200);
	}
	
	public function logout()
	{
		$user = request()->user();
		
		$user->token()->revoke();
		
		$user->logs()->create([
			'action' => "Sesión cerrada",
			'type' => 'session'
		]);
		
		return response()->json([
			'msg'=>'Sesi贸n cerrada',
		], 200);
	}
	
	public function logoutAllTokens()
	{
		$user = request()->user();
		$tokens = $user->tokens;
		
		foreach ($tokens as $token) {
			$token->revoke();
		}
		
		$payload = [
			'tokens' => count($tokens)
		];
		
		$user->logs()->create([
			'action' => "Sesiones cerradas",
			'payload' => json_encode($payload),
			'type' => 'session'
		]);
		
		return response()->json([
			'msg' => 'Sesiones cerradas'
		], 200);
	}
	
	public function makePermissions($user)
	{
		// Formatear permissos
		$permissionsDB = [];
		$allPermissions = $user->getPermissionNames();
		if (!count($allPermissions) && $user->hasRole('super-admin')) {
			$allPermissions = Permission::all();
			foreach($allPermissions as $perm) {
				$permissionsDB[$perm->name] = true;
			}
		}else if (count($allPermissions)) {
			foreach($allPermissions as $perm) {
				$permissionsDB[$perm] = true;
			}
		}
		
		// Organizar permisos
		$permissions = [];
		$listNA = [
			'A-' => [
				'registros_index',
			],
			'V-' => [
				'boleta_download',
				'change_avatar',
			]
		];
		
		foreach($listNA[$user->privilegio] as $perm) {
			if (isset($permissionsDB[$perm])) {
				$permissions['sin_asignar'][$perm] = true;
			}
		}
		
		$listA = [
			'A-' => [
				'users_index',
				'users_create',
				'users_upload_matricula',
				'users_edit',
				'users_edit_admins',
				'users_delete',
				'posts_index',
				'posts_create',
				'posts_edit',
				'posts_destroy',
				'posts_others',
				'boletas_index',
				'boletas_upload',
				'boletas_edit',
				'boletas_destroy',
			],
			'V-' => [
				//
			]
		];
		
		foreach($listA[$user->privilegio] as $perm) {
			if (isset($permissionsDB[$perm])) {
				$permissions['administrar'][$perm] = true; 
			}
		}
		
		$listG = [
			'A-' => [
				'users_disabled_index',
				'users_disabled_restore',
				'users_disabled_destroy',
				'cursos_index',
				'cursos_create',
				'cursos_destroy',
			],
			'V-' => [
				//
			]
		];
		foreach($listG[$user->privilegio] as $perm) {
			if (isset($permissionsDB[$perm])) {
				$permissions['gedure'][$perm] = true; 
			}
		}
		
		return $permissions;
	}
}
