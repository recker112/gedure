<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_cedula', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'user_password', 'api_token', 'validate_at'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //Encriptado de contraseña.
    protected static function encript_password($password, $register = true){
        $supermd5 = md5(sha1($password));
        $encript1 = crypt($password, $supermd5);
        $encript2 = crypt($encript1, $supermd5);
        $encript3 = crypt($encript2, $encript1);
        $encript4 = password_hash($encript3, PASSWORD_BCRYPT);
        if ($register) {
            return $encript4;
        }else {
            return $encript3;
        }
    }

    //Verificacion de contraseñas encriptadas
    protected static function verify_password($password, $password_encript){
        $verify = password_verify($password, $password_encript);
        if ($verify === true) {
            return true;
        }else {
            return false;
        }
    }

    public function getAuthPassword()
    {
        return $this->user_password;
    }

    public function getUserData($privilegio, $cedula)
    {
        $verifyBan = $this->checkBans($cedula);
        if($verifyBan){
            return $verifyBan;
        }

        switch ($privilegio) {
            case 'V-':
                //Consulta
                $DataUser = User::select('user_cedula as cedula', 'api_token as access_key', 'user_privilegio as privilegio','estudiante_name as name', 'estudiante_avatar as avatar', 'curso_grado as curso', 'curso_seccion as seccion', 'alumno_n_lista as lista', 'alumno_nota_status as nota', 'alumno_horario_status as horario', 'profe_guia_name as profeGuia')
                    ->where('user_cedula', $cedula)
                    ->join('estudiantes_data', 'users.user_cedula', '=', 'estudiantes_data.estudiante_cedula')
                    ->join('alumnos_data', 'estudiantes_data.estudiante_alumno_id', '=', 'alumnos_data.alumno_id')
                    ->join('cursos_data', 'alumnos_data.alumno_curso', '=', 'cursos_data.curso_id')
                    ->join('profes_guias_data', 'cursos_data.curso_profe_guia', '=', 'profes_guias_data.profe_guia_id')
                    ->first();
                break;

            case 'A-':
                //Consulta
                $DataUser = User::select('user_cedula as cedula', 'api_token as access_key', 'user_privilegio as privilegio', 'admin_name as name', 'admin_avatar as avatar')
                    ->join('admins_data', 'users.user_cedula', '=', 'admins_data.admin_cedula')
                    ->first();
                break;

            case 'CR-':
                //Consulta
                $DataUser = User::select('user_cedula as cedula', 'api_token as access_key', 'user_privilegio as privilegio', 'creador_name as name', 'creador_avatar as avatar')
                    ->join('creadores_data', 'users.user_cedula', '=', 'creadores_data.creador_cedula')
                    ->first();
                break;

            default:
                $DataUser = null;
                break;
        }
        return $DataUser;
    }

    public function checkBans()
    {
        return false;
    }
}
