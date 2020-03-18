<?php

namespace App\Http\Controllers;

use Validator;
use DB;
use Auth;
use Illuminate\Validation\ValidationException;
//Model
use App\Users;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

        //Obtener datos
        $datosRecibidos = $dataValidate;
        // $SearchUser = Users::select('user_privilegio as privilegio')
        //     ->where('user_cedula', $datosRecibidos['user'])
        //     ->first();

        // //Verificar existencia de usuario
        // if (!$SearchUser) {
        //     $response = array('status' => 'error','msg' => 'not_found');
        //     return response()->json($response);
        // }

        // switch ($SearchUser->privilegio) {
        //     case 'V-':
        //         $verifyBan = $this->checkBans($datosRecibidos['user']);
        //         if (!$verifyBan){
        //             return 'BANEADO';
        //         }
        //         //Consulta
        //         $DataUser = Users::select('user_cedula as cedula', 'user_password as pass','estudiante_name as name', 'estudiante_avatar as avatar', 'curso_grado as curso', 'curso_seccion as seccion', 'alumno_n_lista as lista', 'alumno_nota_status as nota', 'alumno_horario_status as horario', 'profe_guia_name as profe_guia')
        //             ->where('user_cedula', $datosRecibidos['user'])
        //             ->join('estudiantes_data', 'users.user_cedula', '=', 'estudiantes_data.estudiante_cedula')
        //             ->join('alumnos_data', 'estudiantes_data.estudiante_alumno_id', '=', 'alumnos_data.alumno_id')
        //             ->join('cursos_data', 'alumnos_data.alumno_curso', '=', 'cursos_data.curso_id')
        //             ->join('profes_guias_data', 'cursos_data.curso_profe_guia', '=', 'profes_guias_data.profe_guia_id')
        //             ->first();

        //         //Add privilegio
        //         $DataUser->privilegio = $SearchUser->privilegio;
        //         break;
        //     case 'A-':
        //         //Consulta
        //         $DataUser = Users::select('user_cedula as cedula', 'user_password as pass', 'admin_name as name', 'admin_avatar as avatar')
        //             ->join('admins_data', 'users.user_cedula', '=', 'admins_data.admin_cedula')
        //             ->first();

        //         //Add privilegio
        //         $DataUser->privilegio = $SearchUser->privilegio;
        //         break;
        //     case 'CR-':
        //         //Consulta
        //         $DataUser = Users::select('user_cedula as cedula', 'user_password as pass', 'creador_name as name', 'creador_avatar as avatar')
        //             ->join('creadores_data', 'users.user_cedula', '=', 'creadores_data.creador_cedula')
        //             ->first();

        //         //Add privilegio
        //         $DataUser->privilegio = $SearchUser->privilegio;
        //         break;
        //     default:
        //         $response = array('status' => 'error','msg' => 'not_found');
        //         return response()->json($response);
        //         break;
        // }

        // //Verificar passwords
        // $passEnc = Users::encript_password($datosRecibidos['pass'], false);
        // $verifyPass = Users::verify_password($passEnc, $DataUser->pass);

        // if (!$verifyPass) {
        //     $response = array('status' => 'error','msg' => 'password_error');
        //     return response()->json($response);
        // }

        // unset($DataUser->pass);
        // $response = array('status' => 'ok','data' => $DataUser);
        // $var = session()->all();
        if (Auth::guard('custom')->attempt(['user_cedula'=>$datosRecibidos['user'],'user_password'=>$datosRecibidos['pass']])) {
            // Authentication passed...
            $user = Auth::user();
            $user->save();
            return $user;
        }else {
             return response('nel',200);
        }
    }

    public function username()
    {
        return 'user_cedula';
    }

    public static function checkBans($cedula) {
        return true;
    }
}
