<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PersonalDataAdmin extends Model
{
  use HasFactory, SoftDeletes;
	
	protected $fillable = [
		'nacimiento',
		'telefono',
		'sexo',
		'direccion',
		'docente',
		'docente_ingreso_MPPE',
		'docente_ingreso',
		'user_id'
	];
	
	protected $hidden = [
		'created_at', 'updated_at', 'user_id', 'id', 'deleted_at'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
}