<?php

namespace App\Models\Gedure;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
	use HasFactory;
	
	protected $fillable = [
		'code',
		'curso',
		'seccion',
	];
	
	protected $hidden = [
		'created_at', 'updated_at', 'id', 'code'
	];
	
	public function alumnos()
	{
		return $this->hasMany('App\Models\Gedure\Alumno')->orderBy('n_lista', 'Asc');
	}
	
	public function boletas()
	{
		return $this->hasMany('App\Models\Gedure\Boleta');
	}
	
	/*
		BOOT FUNCTION
		
		NOTA (RECKER): Esta funcion ayuda a eliminar todas las relaciones de la base de datos usando soft delete, hay que poner manualmente las relaciones que se deben de eliminar y las que se deben de restaurar.
	*/
	public static function boot() {
		parent::boot();

		static::deleting(function($curso) {
			foreach($curso->alumnos as $alumno) {
				$alumno->delete();
			}
		});
	}
}