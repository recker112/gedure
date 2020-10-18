<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
	use SoftDeletes, HasApiTokens, Notifiable;
	
	protected $fillable = [
		'cedula', 
		'privilegio', 
		'nombre',
		'password',
		'avatar',
		'email'
	];
	
	protected $hidden = [
		'created_at', 'updated_at', 'password', 'deleted_at'
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

	//Generar contraseña.
	protected static function password_generate($cantidad) {
		$lista = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
		$largoLista = strlen($lista)-1;
		$string = "";

		for($i=0; $i<=$cantidad; $i++){
			// Hasta que tengamos $longitud caracteres agregamos una letra al azar del conjunto $listaChar
			$string .= $lista[rand(0, $largoLista)];
		}
		return $string;
	}
	
	public function getAuthPassword()
	{
		return $this->password;
	}
	
	public function permissionsAdmin()
	{
		return $this->hasOne('App\AdminConfig');
	}
	
	public function bloqueos()
	{
		return $this->hasOne('App\Bloqueos');
	}
	
	public function news()
	{
		return $this->hasMany('App\News', 'user_id_owner');
	}
	
	public function logs()
	{
		return $this->hasMany('App\Bloqueos');
	}
}
