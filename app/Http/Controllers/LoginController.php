<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Validación en try
use Illuminate\Validation\ValidationException;
//Auth Class
use Illuminate\Support\Facades\Auth;
//Model User
use App\User;
use App\Ban;
use App\Logs;

class LoginController extends Controller
{
    public function username()
    {
        return 'user_cedula';
    }

    public function login()
    {
        //Verificar baneos
        $banStatus = Ban::getStatusBlock(request()->user);

        if ($banStatus !== 'ok') {
            return response()->json($banStatus, 400);
        }

        //ValidateData
        try {
            //Verify pass
            $dataValidate = request()->validate([
                'user' => 'required|string|min:4',
                'pass' => 'required|string|min:4',
                'checkbox' => 'required',
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

        //Verificar credenciales
        $verifyAuth = Auth::attempt([
            'user_cedula' => $dataValidate['user'],
            'user_password' => $dataValidate['pass']
        ]);


        //Añadir attemps
        if(!$verifyAuth){
            $jsonMessage = Ban::checkAttemps($dataValidate['user']);
            return response()->json($jsonMessage, 400);
        }

        //Limpiar baneos
        $clearBan = Ban::find($dataValidate['user']);

        if ($clearBan) {
            $clearBan->delete();
        }

        //Modelo para interaccionar con las tablas
        $UserModel = new User;

        //Datos
        $cedula = Auth::user()->user_cedula;
        $privilegio = Auth::user()->user_privilegio;

        //Obtener datos.
        $dataUser = $UserModel->getUserData($privilegio, $cedula);
			return $dataUser;
			
				//Verificar que el privilegio de esa persona esté registrado.
        if ($dataUser === null) {
            $jsonMessage = [
                'code' => 400,
                'msg'=>'not_found_privilegio',
								'description' => 'No se pudo encontrar el usuario en el sistema'
            ];

            return response()->json($jsonMessage, 400);
        }

        /* TODO OC */
				//LOG
				$Log = new Logs;
				$Log->log_cedula = $dataUser->cedula;
				$Log->log_action = 'Inicio de sesión.';
				$Log->save();

				//Regresar datos
        return response($dataUser, 200);
    }

    public function relogin()
    {
        //Modelo para interaccionar con las tablas
        $UserModel = new User;

        //Obtener datos.
        $privilegio = request()->user()->user_privilegio;
				$cedula = request()->user()->user_cedula;
        $dataUser = $UserModel->getUserData($privilegio,$cedula);

        //Verificaciones extras

        /* TODO OC */
        return response($dataUser, 200);
    }
}
