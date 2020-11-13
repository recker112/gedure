<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
	use HasFactory;
	
	protected $fillable = [
		'code',
		'name',
		'seccion',
	];
	
	protected $hidden = [
		'created_at', 'updated_at', 'id', 'code'
	];
	
	public function alumnos()
	{
		return $this->hasMany('App\Models\Alumno')->orderBy('n_lista', 'Asc');
	}
}