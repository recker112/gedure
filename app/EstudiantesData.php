<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EstudiantesData extends Model
{
  /**
	*
	* @var string
	*/
  protected $primaryKey = 'estudiante_id';
	
	/**
	* The attributes that should be cast to native types.
	*
	* @var string
	*/
	protected $keyType = 'string';
	
	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var boolean
	 */
	public $timestamps = false;
	
	public function orderCursos($curso, $seccion){
		$studiendsInCurso = EstudiantesData::where('estudiante_alumno_id', 'LIKE','E-'.$curso.$seccion.'-%')
			->orderBy('estudiante_cedula', 'ASC')
			->get();
		
		$list = 1;
		foreach ($studiendsInCurso as $row) {
			$row->estudiante_alumno_id = 'E-'.$curso.$seccion.'-'.$list;
			$row->save();
			$list++;
		}
		
		return $studiendsInCurso;
	}
}
