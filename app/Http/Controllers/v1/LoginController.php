<?php

namespace App\Http\Controllers\v1;

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
	public function username()
	{
			return 'cedula';
	}
	
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
		
		// Limpiar baneos
		$clearBan = Bloqueos::find($dataValidate['user']);

		if ($clearBan) {
			$clearBan->delete();
		}


		// Obtener datos.
		$user = request()->user();
		
		// Token
		$tokenResult = $user->createToken($user->cedula.' access', ['*']);
    $token = $tokenResult->token;
		
		// expired_at
		if(request()->checkbox) {
			$token->expires_at =now()->addMonths(6);
		}
		$token->save();

		// Verificar que el privilegio de esa persona esté registrado.
		if (!$user) {
			$jsonMessage = [
					'code' => 400,
					'msg'=>'not_found_privilegio',
					'description' => 'No se pudo encontrar el usuario en el sistema'
			];

			return response()->json($jsonMessage, 400);
		}
		
		$Log = new Log;
		$Log->cedula = $user->cedula;
		$Log->action = 'Inicio de sesión.';
		$Log->save();
		
		$permissions = $this->makePermissions($user->cedula, $user->privilegio);
		
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
			'code' => 200,
			'msg'=>'logout',
			'description' => 'Sesión cerrada'
		];
		
		$Log = new Log;
		$Log->cedula = $user->cedula;
		$Log->action = 'Cierre de sesión.';
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
		$Log->cedula = $user->cedula;
		$Log->action = 'Cierre de todas las sesiones.';
		$Log->save();
		
		return response()->json($jsonMessage, 200);
	}
	
	public function relogin()
	{
		$user = request()->user();
		
		$permissions = $this->makePermissions($user->cedula, $user->privilegio);
		
		$jsonMessage = [
			'user' => $user,
			'permissions' => $permissions
		];
		
		$Log = new Log;
		$Log->cedula = $user->cedula;
		$Log->action = 'Inicio de sessión por relogin.';
		$Log->save();
		
		return response()->json($jsonMessage, 200);
	}
	
	public function makePermissions($cedula, $privilegio)
	{
		if ($privilegio === 'A-') {
			$permissionsDB = AdminConfig::find($cedula);
			
			$listA = array();
			$listG = array();
			$listP = array();
			foreach ($permissionsDB as $perm) {
				if ($permissionsDB->registros_ver) {
					$listA['registro']['ver'] = true;
				}
				
				if ($permissionsDB->user_ver) {
					$listA['user']['ver'] = true;
				}
				
				if ($permissionsDB->user_modify) {
					$listA['user']['ver'] = true;
				}
				
				if ($permissionsDB->gedure_control) {
					$listG['control'] = true;
				}
				
				if ($permissionsDB->upload_boletas) {
					$listA['upload']['boletas'] = true;
				}
				
				if ($permissionsDB->upload_matricula) {
					$listA['upload']['matricula'] = true;
				}
				
				if ($permissionsDB->post_modify) {
					$listP['modify'] = true;
				}
				
				if ($permissionsDB->post_delete_other) {
					$listP['delete_other'] = true;
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
