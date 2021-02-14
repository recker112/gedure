<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
	use HasFactory, Notifiable, HasApiTokens, SoftDeletes, HasRoles;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'username',
		'name',
		'email',
		'password',
		'avatar',
		'privilegio',
		'actived_at',
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'created_at', 'updated_at', 'password', 'deleted_at'
	];
	
	protected $appends = [
		'personal_data',
		'estudiante_data',
	];
	
	/*
		RELACIONES
	*/
	
	public function personalDataUser()
	{
		return $this->hasOne('App\Models\PersonalDataUser');
	}
	
	public function personalDataAdmin()
	{
		return $this->hasOne('App\Models\PersonalDataAdmin');
	}
	
	public function recoveryPassword()
	{
		return $this->hasOne('App\Models\RecoveryPassword');
	}
	
	public function alumno()
	{
		return $this->hasOne('App\Models\Alumno');
	}
	
	public function boletas()
	{
		if ($this->trashed()) {
			return $this->hasMany('App\Models\Boleta')->onlyTrashed();
		}else {
			return $this->hasMany('App\Models\Boleta');	
		}
	}
	
	public function blocks()
	{
		return $this->hasOne('App\Models\Block');
	}
	
	public function logs()
	{
		return $this->hasMany('App\Models\Log');
	}
	
	public function posts()
	{
		return $this->hasMany('App\Models\Post');
	}
	
	public function invitation()
	{
		return $this->hasOne('App\Models\Invitation');
	}
	
	public function getAvatarOriginalAttribute()
	{
		return $this->attributes['avatar'];
	}
	
	public function getAvatarAttribute()
	{
		$avatar = $this->attributes['avatar'];
		if($avatar) {
			$url = Storage::disk('public')->url($avatar);
		}else {
			$url = null;
		}
		return $url;
	}
	
	/*
		FUNCIONES ESPECIALES
	*/
	
	public function personalData($first = true)
	{
		/*
			NOTA (RECKER): Esto es solo una verificacion de si el usuario fue soft deleteado para asi poder recuperar sus datos.
		*/
		if ($this->trashed()) {
			if ($this->attributes['privilegio'] === 'V-') {
				if ($first) {
					return $this->personalDataUser()->onlyTrashed()->first();	
				}else {
					return $this->personalDataUser()->onlyTrashed();
				}
			}else {
				if ($first) {
					return $this->personalDataAdmin()->onlyTrashed()->first();
				}else {
					return $this->personalDataAdmin()->onlyTrashed();
				}
			}
		}else {
			if ($this->attributes['privilegio'] === 'V-') {
				if ($first) {
					return $this->personalDataUser()->first();
				}else {
					return $this->personalDataUser();
				}
			}else {
				if ($first) {
					return $this->personalDataAdmin()->first();
				}else {
					return $this->personalDataAdmin();
				}
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
			if ($user->isForceDeleting()){
				$user->personalData->forceDelete();
				
				foreach($user->boletas as $boleta) {
					$boleta->forceDelete();
				}
			}else {
				$user->personalData(false)->delete();
			
				if($user->privilegio === 'V-') {
					if ($user->alumno){
						$user->alumno()->delete();
					}

					foreach($user->boletas as $boleta) {
						$boleta->delete();
					}
				}	
			}
		});
		
		static::restoring(function($user) {
			if ($user->privilegio === 'V-') {
				$user->personalDataUser()->restore();
				
				foreach($user->boletas as $boleta) {
					$boleta->restore();
				}
			} else if ($user->privilegio === 'A-') {
				$user->personalDataAdmin()->restore();
			}
		});
	}
	
	/*
		ATRIBUTOS
	*/
	public function getPersonalDataAttribute()
	{
		return $this->personalData();
	}
	
	public function getEstudianteDataAttribute()
	{
		return $this->alumno()->first();
	}
}