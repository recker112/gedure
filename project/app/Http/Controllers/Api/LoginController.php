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
			'user' => $user,
			'permissions' => $permissions
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
			'user' => $user,
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
		$permissionsDB = $user->permissions;
		if (!count($permissionsDB) && $user->hasRole('super-admin')) {
			$permissionsDB = Permission::all();
		}
		
		if ($user->privilegio === 'A-') {
			$listNA = array();
			$listA = array();
			$listG = array();
			foreach ($permissionsDB as $perm) {
				if ($perm->name === 'registros_index') {
					$listNA['registros_index'] = true;
				}
				
				if ($perm->name === 'users_index') {
					$listA['users_index'] = true;
				}
				
				if ($perm->name === 'users_create') {
					$listA['users_create'] = true;
				}
				
				if ($perm->name === 'users_upload_matricula') {
					$listA['users_upload_matricula'] = true;
				}
				
				if ($perm->name === 'users_edit') {
					$listA['users_edit'] = true;
				}
				
				if ($perm->name === 'users_delete') {
					$listA['users_delete'] = true;
				}
				
				if ($perm->name === 'posts_index') {
					$listA['posts_index'] = true;
				}
				
				if ($perm->name === 'posts_create') {
					$listA['posts_create'] = true;
				}
				
				if ($perm->name === 'posts_edit') {
					$listA['posts_edit'] = true;
				}
				
				if ($perm->name === 'posts_destroy') {
					$listA['posts_destroy'] = true;
				}
				
				if ($perm->name === 'posts_others') {
					$listA['posts_others'] = true;
				}
				
				if ($perm->name === 'boletas_index') {
					$listA['boletas_index'] = true;
				}
				
				if ($perm->name === 'boletas_upload') {
					$listA['boletas_upload'] = true;
				}
				
				if ($perm->name === 'boletas_edit') {
					$listA['boletas_edit'] = true;
				}
				
				if ($perm->name === 'boletas_destroy') {
					$listA['boletas_destroy'] = true;
				}
				
				/*
				* GEDURE
				*/
				if ($perm->name === 'cursos_index') {
					$listG['cursos_index'] = true;
				}
				
				if ($perm->name === 'cursos_create') {
					$listG['cursos_create'] = true;
				}
				
				if ($perm->name === 'cursos_destroy') {
					$listG['cursos_destroy'] = true;
				}
				
				if ($perm->name === 'users_disabled_index') {
					$listG['users_disabled_index'] = true;
				}
				
				if ($perm->name === 'users_disabled_restore') {
					$listG['users_disabled_restore'] = true;
				}
				
				if ($perm->name === 'users_disabled_destroy') {
					$listG['users_disabled_destroy'] = true;
				}
			}
			
			$permissions = [
				'sin_asignar' => $listNA,
				'administrar' => $listA,
				'gedure' => $listG,
			];
		}else {
			$permissions = [];
		}
		
		return $permissions;
	}
}
