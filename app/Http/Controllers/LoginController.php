<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// Validaciรณn en try
use Illuminate\Validation\ValidationException;
// Auth Class
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Bloqueos;
use App\Log;
use App\AdminConfig;

class LoginController extends Controller
{	
	public function login()
	{
		// Verificar baneos
		$blockStatus = Bloqueos::getStatus(request()->user);

		if ($blockStatus !== 'ok') {
			return response()->json($blockStatus, 400);
		}
		
		//ValidateData
		try {
			$dataValidate = request()->validate([
				'user' => 'required|string|min:4',
				'password' => 'required|string|min:4'
			], [
				/*
				Custom message
				GLOBAL [propiedad] = required
				ESPECIFICO [value].[propiedad] = user.required
				*/
				'required' => 'Campo obigatorio',
				'string' => 'No válido',
				'min' => 'No válido',

			]);
		} catch (ValidationException $exception) {
			return response()->json([
				'code' => 422,
				'msg'    => 'validation_error',
				'errors' => $exception->errors(),
				'description' => 'El servidor rechazó su solicitud'
			], 422);
		}
		
		$verifyAuth = Auth::attempt([
			'cedula' => $dataValidate['user'],
			'password' => $dataValidate['password']
		]);
		
		if (!$verifyAuth) {
			$jsonMessage = Bloqueos::checkAttemps($dataValidate['user']);
			return response()->json($jsonMessage, 400);
		}
		
		// Obtener datos.
		$user = request()->user();
		
		// Limpiar baneos
		if ($user->bloqueos){
			$user->bloqueos->delete();
		}
		
		// Token
		$tokenResult = $user->createToken($user->cedula.' access', ['*']);
    $token = $tokenResult->token;
		
		// expired_at
		if(request()->checkbox) {
			$token->expires_at =now()->addMonths(6);
		}
		$token->save();
		
		$Log = new Log;
		$Log->user_id = $user->id;
		$Log->action = 'Inicio de sesión.';
		$Log->type = 'session';
		$Log->save();
		
		$permissions = $this->makePermissionsJSON($user);
		
		//Ocultar permissions en la variable $user
		$user->makeHidden('permissionsAdmin');
		
		$jsonMessage = [
			'access_key' => $tokenResult->accessToken,
			'user' => $user,
			'permissions' => $permissions
		];

		//Regresar datos
		return response()->json($jsonMessage, 200);
	}
	
	public function logout()
	{
		$user = request()->user();
		
		$user->token()->revoke();
		
		$jsonMessage = [
			'msg'=>'logout',
			'description' => 'Sesión cerrada'
		];
		
		$Log = new Log;
		$Log->user_id = $user->id;
		$Log->action = 'Cierre de sesión.';
		$Log->type = 'session';
		$Log->save();
		
		return response()->json($jsonMessage, 200);
	}
	
	public function logoutAllTokens()
	{
		$user = request()->user();
		$tokens = $user->tokens;
		
		foreach ($tokens as $token) {
			$token->revoke();
		}
		
		$Log = new Log;
		$Log->user_id = $user->id;
		$Log->action = 'Cierre de todas las sesiones.';
		$Log->type = 'session';
		$Log->save();
		
		return response()->json($jsonMessage, 200);
	}
	
	public function relogin()
	{
		$user = request()->user();
		
		$permissions = $this->makePermissionsJSON($user);
		
		$user->makeHidden('permissionsAdmin');
		
		$jsonMessage = [
			'user' => $user,
			'permissions' => $permissions
		];
		
		$Log = new Log;
		$Log->user_id = $user->id;
		$Log->action = 'Inicio de sessión por relogin.';
		$Log->type = 'session';
		$Log->save();
		
		return response()->json($jsonMessage, 200);
	}
	
	public function makePermissionsJSON($user)
	{
		if ($user->privilegio === 'A-') {
			$permissionsDB = $user->permissionsAdmin;
			
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
		}
			
		return $permissions;
	}
}
