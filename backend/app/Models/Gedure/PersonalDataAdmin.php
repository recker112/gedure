<?php

namespace App\Models\Gedure;

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
		'docente_titulo',
		'docente_ingreso_MPPE',
		'docente_ingreso',
	];

	protected $casts = [
		'telefono' => 'integer',
	];
	
	protected $hidden = [
		'created_at', 'updated_at', 'id', 'deleted_at'
	];
	
	public function user()
	{
		return $this->morphOne('App\Models\User', 'personal_data');
	}
}
