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
	
	public function permissionsAdmin()
	{
		return $this->hasOne('App\Models\AdminConfig');
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
}
