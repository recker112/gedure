<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RecoveryPassRequest;
use App\Http\Requests\RecoveryVerifyRequest;
use App\Http\Requests\RecoveryChangeRequest;
use Illuminate\Support\Facades\Mail;

//Mails
use App\Mail\CodeSecurity;

// Auth Class
use Illuminate\Support\Facades\Auth;

// Models
use App\Models\User;
use App\Models\Block;
use App\Models\Log;
use App\Models\RecoveryPassword;
use Spatie\Permission\Models\Permission;

class LoginController extends Controller
{
  public function login(LoginRequest $request)
	{
		// Verificar baneos
		$blockStatus = Block::getStatus($request->cedula);
		
		if ($blockStatus !== 'ok') {
			return response()->json($blockStatus, 400);
		}
		
		$credenciales = $request->only(['cedula', 'password']);
		
		$verifyAuth = Auth::attempt($credenciales);
		
		if (!$verifyAuth) {
			$jsonMessage = Block::checkAttemps($request->cedula);
			return response()->json($jsonMessage, 400);
		}
		
		$user = $request->user();
		
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
		if($request->checkbox) {
			$token->expires_at =now()->addMonths(6);
		}
		
		$token->save();
		
		$permissions = $this->makePermissions($user);
		
		Log::create([
			'user_id' => $user->id,
			'action' => "Inicio de sesión.",
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
		
		Log::create([
			'user_id' => $user->id,
			'action' => "Inicio de sesión por relogin.",
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
		
		Log::create([
			'user_id' => $user->id,
			'action' => "Sesión cerrada.",
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
		
		Log::create([
			'user_id' => $user->id,
			'action' => "Sesiones cerradas.",
			'type' => 'session'
		]);
		
		return response()->json([
			'msg' => 'Sesiones cerradas'
		], 200);
	}
	
	public function recoveryPassword(RecoveryPassRequest $request)
	{
		$user = User::where('email', $request->email)->firstOrFail();
		
		$code = $this->generateCode(5);
		$timeNow = now();
		$step;
		
		
		if (!$user->recoveryPassword) {
			// Crear un nuevo code
			RecoveryPassword::create([
				'code' => $code,
				'user_id' => $user->id,
			]);
			
			Mail::to($user)->queue(new CodeSecurity($user, $code));
			$step=0;
		}else {
			// Si existe un registro
			$timeUpdated = $user->recoveryPassword->updated_at->addMinutes(2);
			$timeCreated = $user->recoveryPassword->created_at->addMinutes(10);
			
			if ($user->recoveryPassword && $timeNow >= $timeCreated) {
				// Regenerar code después de 10 minutos
				$user->recoveryPassword->delete();
				
				// Crear un nuevo code
				RecoveryPassword::create([
					'code' => $code,
					'user_id' => $user->id,
				]);
				
				Mail::to($user)->queue(new CodeSecurity($user, $code));
				$step=2;
			}else if ($user->recoveryPassword && $timeNow >= $timeUpdated) {
				// Reenviar code si han pasado más de dos minutos
				$codeRegistred = $user->recoveryPassword->code;
				$user->recoveryPassword->updated_at = $timeNow;
				$user->recoveryPassword->save();

				Mail::to($user)->queue(new CodeSecurity($user, $codeRegistred));
				$step=1;
			} else {
				$waitSeconds = $timeUpdated->diffInSeconds($timeNow);
				$minutes = $timeUpdated->diffInMinutes($timeNow);
				$seconds = $waitSeconds % 60;
				$wait = $minutes.'m y '.$seconds.'s';

				return response()->json([
					'msg' => "Espere $wait para reenviar el correo"
				], 400);
			}
		}
		
		//Log
		Log::create([
			'user_id' => $user->id,
			'action' => 'Correo de recuperación enviado.',
			'type' => 'user'
		]);
		
		return response()->json([
			'msg' => 'Correo enviado',
			'step' => $step,
		], 200);
	}
	
	public function recoveryPasswordVerifyCode(RecoveryVerifyRequest $request)
	{
		$user = User::where('email', $request->email)->firstOrFail();
		
		$serverCode = $user->recoveryPassword->code;
		
		if ($request->code !== $serverCode) {
			return response()->json([
				'msg' => 'Error al verificar el codigo'
			], 400);
		}
			
		$user->recoveryPassword->confirm = 1;
		$user->recoveryPassword->save();
		
		return response()->json([
			'msg' => 'Codigo confirmado'
		], 200);
	}
	
	public function recoveryChangePassword(RecoveryChangeRequest $request)
	{
		$user = User::where('email', $request->email)->firstOrFail();
		
		if (!$user->recoveryPassword->confirm) {
			return response()->json([
				'msg' => 'No se ha verificado el correo'
			], 400);
		}
		
		$user->password = bcrypt($request->password);
		$user->save();
		$user->recoveryPassword->delete();
		
		//Log
		Log::create([
			'user_id' => $user->id,
			'action' => 'Contraseña cambiada via correo.',
			'type' => 'user'
		]);
		
		return response()->json([
			'msg' => 'Contraseña cambiada'
		], 200);
	}
	
	public function generateCode($size)
	{
		$charset = "ABCDEFGHIJKMNOPQRSTUVWXYZ0123456789";
		$charsetLen = strlen($charset) - 1;
		$password = array();
		for ($i = 0; $i < $size; ++$i) {
			$n = rand(0, $charsetLen);
			$password[] = $charset[$n];
		}
		return implode($password);
	}
	
	public function makePermissions($user)
	{
		$permissionsDB = $user->permissions;
		if (!count($permissionsDB) && $user->hasRole('soy-admin')) {
			$permissionsDB = Permission::all();
		}
		
		if ($user->privilegio === 'A-') {
			$listA = array();
			$listG = array();
			foreach ($permissionsDB as $perm) {
				if ($perm->name === 'registros_index') {
					$listA['registros_index'] = true;
				}
				
				if ($perm->name === 'registros_user') {
					$listA['registros_user'] = true;
				}
				
				if ($perm->name === 'users_index') {
					$listA['users_index'] = true;
				}
				
				if ($perm->name === 'users_show') {
					$listA['users_show'] = true;
				}
				
				if ($perm->name === 'users_create') {
					$listA['users_create'] = true;
				}
				
				if ($perm->name === 'users_edit') {
					$listA['users_edit'] = true;
				}
				
				if ($perm->name === 'users_delete') {
					$listA['users_delete'] = true;
				}
				
				if ($perm->name === 'soliContact_index') {
					$listA['soliContact_index'] = true;
				}
				
				if ($perm->name === 'soliContact_destroy') {
					$listA['soliContact_destroy'] = true;
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
			}
			
			$permissions = [
				'administrar' => $listA,
				'gedure' => $listG,
			];
		}else {
			$permissions = [];
		}
		
		return $permissions;
	}
}
