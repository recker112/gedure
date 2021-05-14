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
		'created_at',
		'updated_at',
		'password',
		'deleted_at',
		'personal_data_id',
		'personal_data_type',
	];
	
	/*
		RELACIONES
	*/
	
	public function personal_data()
	{
		return $this->morphTo()->withTrashed();
	}
	
	public function blocks()
	{
		return $this->hasOne('App\Models\Auth\Block');
	}
	
	public function recoveryPassword()
	{
		return $this->hasOne('App\Models\Auth\RecoveryPassword');
	}
	
	public function alumno()
	{
		return $this->hasOne('App\Models\Gedure\Alumno');
	}
	
	public function boletas()
	{
		return $this->hasMany('App\Models\Gedure\Boleta')->withTrashed();
	}
	
	public function logs()
	{
		return $this->hasMany('App\Models\Gedure\Log');
	}
	
	public function posts()
	{
		return $this->hasMany('App\Models\Gedure\Post');
	}
	
	public function invitation()
	{
		return $this->hasOne('App\Models\Auth\Invitation');
	}
	
	public function debts()
	{
		return $this->hasMany('App\Models\WalletSystem\Debt')->withTrashed();
	}
	
	public function wallet()
	{
		return $this->hasOne('App\Models\WalletSystem\Wallet')->withTrashed();
	}
	
	public function transactions()
	{
		return $this->hasOne('App\Models\WalletSystem\Transaction')->withTrashed();
	}
	
	/*
		ATRIBUTOS
	*/
	
	public function getAvatarOriginalAttribute()
	{
		return $this->attributes['avatar'];
	}
	
	public function getAvatarAttribute()
	{
		$avatar = $this->attributes['avatar'];
		if($avatar) {
			$url = Storage::disk('user_avatars')->url($avatar);
		}else {
			$url = null;
		}
		return $url;
	}
	
	/*
		BOOT FUNCTION
		
		NOTA (RECKER): Esta funcion ayuda a eliminar todas las relaciones de la base de datos usando soft delete, hay que poner manualmente las relaciones que se deben de eliminar y las que se deben de restaurar.
	*/
	public static function boot() {
		parent::boot();

		static::deleting(function($user) {
			if ($user->isForceDeleting()){
				$user->personal_data()->forceDelete();
				
				foreach($user->boletas as $boleta) {
					$boleta->forceDelete();
				}
			}else {
				$user->personal_data()->delete();
			
				if($user->privilegio === 'V-') {
					$user->alumno()->delete();

					foreach($user->boletas as $boleta) {
						$boleta->delete();
					}
				}
			}
		});
		
		static::restoring(function($user) {
			$user->personal_data()->restore();
			
			if ($user->privilegio === 'V-') {
				foreach($user->boletas as $boleta) {
					$boleta->restore();
				}
			}
		});
	}
}