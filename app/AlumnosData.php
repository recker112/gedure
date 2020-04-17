<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AlumnosData extends Model
{
  /**
	*
	* @var string
	*/
  protected $primaryKey = 'alumno_id';
	
	/**
	* The attributes that should be cast to native types.
	*
	* @var string
	*/
	protected $keyType = 'string';
	
	public $timestamps = false;
	
	public function searchAlumnosForCurso($cursoId)
	{
		$alumnosTotal = AlumnosData::select(
			'user_cedula as cedula',
			'user_privilegio as privilegio',
			'estudiante_name as name',
			'alumno_n_lista as lista',
			'alumno_id',
			'curso_name as curso',
			'curso_seccion as seccion'
			)
			->where('alumno_curso', $cursoId)
			->join(
			'cursos_data', 
			'cursos_data.curso_id', 
			'=', 
			'alumnos_data.alumno_curso')
			->join(
			'estudiantes_data',
			'estudiantes_data.estudiante_alumno_id',
			'=',
			'alumnos_data.alumno_id')
			->join(
			'users', 
			'users.user_cedula', 
			'=', 
			'estudiantes_data.estudiante_cedula')
			->orderBy('alumno_n_lista', 'ASC')
			->get();
		return $alumnosTotal;
	}
	
	public function searchAlumnoForStudiend($cedula)
	{
		$alumnosTotal = AlumnosData::select(
			'estudiante_name as name',
			'alumno_id as id',
			'alumno_horario_status as horario',
			'alumno_nota_status as nota'
			)
			->where('estudiante_cedula', $cedula)
			->join(
			'estudiantes_data',
			'estudiantes_data.estudiante_alumno_id',
			'=',
			'alumnos_data.alumno_id')
			->orderBy('alumno_n_lista', 'ASC')
			->first();
		return $alumnosTotal;
	}
}
