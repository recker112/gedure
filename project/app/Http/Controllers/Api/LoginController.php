<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RecoveryPassRequest;
use App\Http\Requests\RecoveryVerifyRequest;
use App\Http\Requests\RecoveryChangeRequest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

//Mails
use App\Mail\CodeSecurity;

// Auth Class
use Illuminate\Support\Facades\Auth;

// Models
use App\Models\User;
use App\Models\Block;
use App\Models\Log;
use App\Models\RecoveryPassword;

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
		
		Log::create([
			'user_id' => $user->id,
			'action' => "Inicio de sesión.",
			'type' => 'session'
		]);
		
		$permissions = $this->makePermissions($user);

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
		
		if ($user->recoveryPassword) {
			$user->recoveryPassword->delete();
		}
		
		$code = $this->generateCode(5);
			
		RecoveryPassword::create([
			'code' => Hash::make($code),
			'user_id' => $user->id,
		]);
		
		Mail::to($user)->queue(new CodeSecurity($user, $code));
		
		return response()->json([
			'msg' => 'Correo enviado'
		], 200);
	}
	
	public function recoveryPasswordVerifyCode(RecoveryVerifyRequest $request)
	{
		$user = User::where('email', $request->email)->firstOrFail();
		
		$hashCode = $user->recoveryPassword->code;
		
		if (!Hash::check($request->code, $hashCode)) {
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
		if ($user->privilegio === 'A-') {
			$permissionsDB = $user->config();
			
			$listA = array();
			$listG = array();
			$listP = array();
			foreach ($permissionsDB as $perm) {
				if ($permissionsDB->registros_ver) {
					$listA['registro_ver'] = true;
				}
				
				if ($permissionsDB->user_ver) {
					$listA['user_ver'] = true;
				}
				
				if ($permissionsDB->user_modify) {
					$listA['user_modify'] = true;
				}
				
				if ($permissionsDB->gedure_control) {
					$listG['control'] = true;
				}
				
				if ($permissionsDB->upload_boletas) {
					$listA['upload_boletas'] = true;
				}
				
				if ($permissionsDB->upload_matricula) {
					$listA['upload_matricula'] = true;
				}
				
				if ($permissionsDB->noticia_modify) {
					$listP['modify'] = true;
				}
				
				if ($permissionsDB->noticia_modify_otros) {
					$listP['modify_otros'] = true;
				}
			}
			
			$permissions = [
				'administrar' => $listA,
				'gedure' => $listG,
				'publicaciones' => $listP
			];
		}else {
			$permissions = [];
		}
			
		return $permissions;
	}
}
