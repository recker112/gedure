<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
//Se usa el FACADES DB para poder realizar consultas con deternimadas condiciones

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
		$studiendsInCurso = EstudiantesData::select('*', DB::raw('CAST(estudiante_cedula AS UNSIGNED) AS ConverToNumber'))
                        ->where('estudiante_alumno_id', 'LIKE','E-'.$curso.$seccion.'-%')
			->orderBy('ConverToNumber', 'ASC')
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