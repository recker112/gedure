<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

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
        if(!Auth::attempt(['user_cedula' => $dataValidate['user'], 'password' => $dataValidate['pass']])){

            return response('Error en el usuario y/o contraseña', 200);
        }


        return response()->json(['access_key'=>Auth::user()->api_token]);
    }
}
