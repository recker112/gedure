<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Spatie\Permission\Models\Permission;

// Auth Class
use Illuminate\Support\Facades\Auth;

// Models
use App\Models\User;
use App\Models\Auth\Block;

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
		
		$verifyAuth = Auth::guard('web')->attempt($credenciales);
		
		if (!$verifyAuth) {
			$jsonMessage = Block::checkAttemps($request->username);
			return response()->json($jsonMessage, 400);
		}
		
		$user = User::with(['personal_data', 'alumno', 'alumno.curso', 'wallet'])
			->find(Auth::guard('web')->id());
		
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
		
		// NOTA(RECKER): Acortar fecha de expiraciรณn del token
		if(!$request->checkbox) {
			$token->expires_at = now()->addHours(8);
		}
		
		$token->save();
		
		$permissions = $this->makePermissions($user);
		
		$user->logs()->create([
			'action' => "Inicio de sesión",
			'type' => 'session'
		]);
		
		
		// NOTA(RECKER): Ocultar datos innecesarios
		$user->makeHidden(['roles', 'permissions']);

		return response()->json([
			'access_key' => $tokenResult->accessToken,
			'user' => $user->toArray(),
			'permissions' => $permissions,
			'count_notify' => $user->unreadNotifications->count(),
		], 200);
	}
	
	public function relogin()
	{
		$user = User::with(['personal_data', 'alumno', 'alumno.curso', 'wallet'])
			->find(Auth::id());
		
		$user->logs()->create([
			'action' => "Inicio de sesión por relogin",
			'type' => 'session'
		]);
		
		// NOTA(RECKER): Obtener los datos faltantes
		$permissions = $this->makePermissions($user);
		$user->makeHidden(['permissions', 'roles']);
		
		return response()->json([
			'user' => $user->toArray(),
			'permissions' => $permissions,
			'count_notify' => $user->unreadNotifications->count(),
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
			'msg'=>'Sesión cerrada',
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
			'payload' => $payload,
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
				'contact_index',
				'contact_destroy',
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
		
		$listAT = [
			'A-' => [
				'debt_lote_index',
				'debt_lote_create',
				'debt_lote_edit',
				'debt_lote_delete',
				'debt_create',
				'debt_delete',
				'debt_refund',
				'transaction_index',
				'wallet_index',
				'wallet_edit',
			],
			'V-' => [
				//
			]
		];
		foreach($listAT[$user->privilegio] as $perm) {
			if (isset($permissionsDB[$perm])) {
				$permissions['administrar_transac'][$perm] = true; 
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
				'bank_account_index',
				'bank_account_create',
				'bank_account_edit',
				'bank_account_destroy',
				'bank_transaction_index',
				'bank_transaction_upload',
				'bank_transaction_assign',
				'bank_transaction_delete',
				'gc_index',
				'gc_edit',
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
