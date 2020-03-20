<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Validación en try
use Illuminate\Validation\ValidationException;
//Auth Class
use Illuminate\Support\Facades\Auth;
//Model User
use App\User;

class LoginController extends Controller
{
    public function username()
    {
        return 'user_cedula';
    }

    public function login()
    {
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
                'status' => 'error',
                'msg'    => 'validation_error',
                'errors' => $exception->errors(),
            ], 422);
        }

        //Verificar credenciales
        $verifyAuth = Auth::attempt([
                'user_cedula' => $dataValidate['user'],
                'user_password' => $dataValidate['pass']
            ]);

        if(!$verifyAuth){
            $jsonMessage = [
                'status' => 'error',
                'msg'=>'credentials_error',
            ];

            return response()->json($jsonMessage);
        }

        //Modelo para interaccionar con las tablas
        $UserModel = new User;

        //Datos
        $cedula = Auth::user()->user_cedula;
        $privilegio = Auth::user()->user_privilegio;

        //Obtener datos.
        $dataUser = $UserModel->getUserData($privilegio,$cedula);

        if ($dataUser === null) {
            $jsonMessage = [
                'status' => 'error',
                'msg'=>'not_found_privilegio',
            ];

            return response()->json($jsonMessage);
        }

        //ALL OK
        $jsonMessage = [
            'status' => 'ok',
            'dataUser'=>$dataUser,
        ];

        return response()->json($jsonMessage);
    }

    public function relogin()
    {
        //Modelo para interaccionar con las tablas
        $UserModel = new User;

        //Obtener datos.
        $privilegio = request()->user()->user_privilegio;
        $cedula = request()->user()->user_cedula;
        $dataUser = $UserModel->getUserData($privilegio,$cedula);

        //ALL OK
        $jsonMessage = [
            'status' => 'ok',
            'dataUser'=>$dataUser,
        ];

        return response()->json($jsonMessage);
    }
}
