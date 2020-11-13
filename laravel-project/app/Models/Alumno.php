<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{
  use HasFactory;
	
	protected $fillable = [
		'curso_id',
		'user_id',
		'n_lista',
	];
	
	protected $hidden = [
		'created_at', 'updated_at', 'curso_id'
	];
	
	/*
		RELACIONES
	*/
	/*
		NOTA (RECKER): Esta funcion se coloca de esta forma para que se pueda recorrer desde cursos el usuario: Curso->alumnos->user, de esta forma el usuario es alcanzable desde cualquier punto.
	*/
	public function user()
	{
		return $this->hasOne('App\Models\User', 'id', 'user_id');
	}
	
	public function curso()
	{
		return $this->belongsTo('App\Models\Curso');
	}
}
