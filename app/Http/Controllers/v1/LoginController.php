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

		// Modelo para interaccionar con las tablas
		$UserModel = new User;

		// Datos
		$cedula = Auth::user()->cedula;
		$privilegio = Auth::user()->privilegio;

		// Obtener datos.
		$dataUser = $UserModel->getData($privilegio, $cedula);

		// Verificar que el privilegio de esa persona esté registrado.
		if (!$dataUser) {
			$jsonMessage = [
					'code' => 400,
					'msg'=>'not_found_privilegio',
					'description' => 'No se pudo encontrar el usuario en el sistema'
			];

			return response()->json($jsonMessage, 400);
		}
		
		$Log = new Log;
		$Log->cedula = $dataUser->cedula;
		$Log->action = 'Inicio de sesión.';
		$Log->save();

		//Regresar datos
		return response($dataUser, 200);
	}
}
