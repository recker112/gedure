<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    //Seleccionar la tabla manualmente
    protected $table = 'users';

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
}
