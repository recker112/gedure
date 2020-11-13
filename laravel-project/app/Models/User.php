<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
	use HasFactory, Notifiable, HasApiTokens, SoftDeletes;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'cedula',
		'nombre',
		'email',
		'password',
		'avatar',
		'privilegio'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'created_at', 'updated_at', 'password', 'deleted_at'
	];
	
	/*
		RELACIONES
	*/
	
	public function configAdmin()
	{
		return $this->hasOne('App\Models\AdminConfig');
	}
	
	public function configUser()
	{
		return $this->hasOne('App\Models\UserConfig');
	}
	
	public function personalDataUser()
	{
		return $this->hasOne('App\Models\PersonalDataUser');
	}
	
	public function personalDataAdmin()
	{
		return $this->hasOne('App\Models\PersonalDataAdmin');
	}
	
	public function alumno()
	{
		return $this->hasOne('App\Models\Alumno');
	}
	
	public function blocks()
	{
		return $this->hasMany('App\Models\Block');
	}
	
	public function logs()
	{
		return $this->hasMany('App\Models\Log');
	}
	
	public function posts()
	{
		return $this->hasMany('App\Models\Post');
	}
	
	/*
		FUNCIONES ESPECIALES
	*/
	public function config()
	{
		/*
			NOTA (RECKER): Esto es solo una verificacion de si el usuario fue soft deleteado para asi poder recuperar sus datos.
		*/
		if ($this->trashed()) {
			if ($this->attributes['privilegio'] === 'V-') {
				return $this->configUser()->onlyTrashed()->first();
			}else {
				return $this->configAdmin()->onlyTrashed()->first();
			}
		}else {
			if ($this->attributes['privilegio'] === 'V-') {
				return $this->configUser()->first();
			}else {
				return $this->configAdmin()->first();
			}
		}
	}
	
	public function personalData()
	{
		if ($this->trashed()) {
			if ($this->attributes['privilegio'] === 'V-') {
				return $this->personalDataUser()->onlyTrashed()->first();
			}else {
				return $this->personalDataAdmin()->onlyTrashed()->first();
			}
		}else {
			if ($this->attributes['privilegio'] === 'V-') {
				return $this->personalDataUser()->first();
			}else {
				return $this->personalDataAdmin()->first();
			}
		}
	}
	
	/*
		BOOT FUNCTION
		
		NOTA (RECKER): Esta funcion ayuda a eliminar todas las relaciones de la base de datos usando soft delete, hay que poner manualmente las relaciones que se deben de eliminar y las que se deben de restaurar.
	*/
	public static function boot() {
		parent::boot();

		static::deleting(function($user) {
			$user->personalData()->delete();
			$user->config()->delete();
			
			if ($user->privilegio === 'A-') {
				foreach($user->posts as $post) {
					$post->user_id = null;
					$post->save();
				}
			}else if($user->privilegio === 'V-') {
				if ($user->alumno()){
					$user->alumno()->delete();
				}
			}
		});
		
		static::restoring(function($user) {
			if ($user->privilegio === 'V-') {
				$user->personalDataUser()->restore();
			} else if ($user->privilegio === 'A-') {
				$user->configAdmin()->restore();
				$user->personalDataAdmin()->restore();
			}
		});
	}
	
	/*
		ATRIBUTOS
	*/
}