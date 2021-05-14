<?php

namespace App\Models\Gedure;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PersonalDataUser extends Model
{
  use HasFactory, SoftDeletes;
	protected $fillable = [
		'madre_nombre',
		'madre_nacionalidad',
		'madre_cedula',
		'madre_telefono',
		'madre_direccion',
		'padre_nombre',
		'padre_nacionalidad',
		'padre_cedula',
		'padre_telefono',
		'padre_direccion',
		'repre_nombre',
		'repre_nacionalidad',
		'repre_cedula',
		'repre_telefono',
		'repre_direccion',
		'repre_sexo',
		'repre_tipo_familiar',
		'repre_estado_civil',
		'repre_nacimiento',
		'repre_email',
		'repre_ubi_estado',
		'repre_ubi_municipio',
		'repre_ubi_parroquia',
		'repre_ubi_via',
		'repre_empleo',
		'repre_empleo_profesion',
		'repre_empleo_lugar',
		'estudi_sexo',
		'estudi_estado_civil',
		'estudi_lateralidad',
		'estudi_nacionalidad',
		'estudi_nacimiento',
		'estudi_nacimiento_estado',
		'estudi_nacimiento_lugar',
		'estudi_ubi',
		'estudi_ubi_tipo',
		'estudi_ubi_zona',
		'estudi_ubi_condiInfra',
		'estudi_ubi_condiVivienda',
		'estudi_otros_canaima',
		'estudi_otros_beca',
		'estudi_otros_alojado',
		'estudi_otros_direccion',
	];
	
	protected $dates = [
		'repre_nacimiento',
		'estudi_nacimiento',
	];
	
	protected $hidden = [
		'created_at', 'updated_at', 'id', 'deleted_at'
	];
	
	public function user()
	{
		return $this->morphOne('App\Models\User', 'personal_data');
	}
}
