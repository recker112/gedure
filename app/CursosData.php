<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\AlumnosData;

class CursosData extends Model
{
  /**
	*
	* @var string
	*/
  protected $primaryKey = 'curso_id';
	
	/**
	* The attributes that should be cast to native types.
	*
	* @var string
	*/
	protected $keyType = 'string';
	
	public function getStudiends($seccion)
	{
		$cursos = CursosData::where('curso_id', 'like', 'C-'.$seccion.'-%')
			->get();
		
		if (count($cursos) <= 0) {
			return 'option_not_valid';
		}
		
		//Model
		$alumno = new AlumnosData;
		//contador
		$add=0;
		
		for($i=0; $i < count($cursos); $i++){
			$index = $cursos[$i];
			
			//Buscar todos los alumnos
			$datos = $alumno->searchAlumnosForCurso($index->curso_id);
			
			//Verificar que exista por lo menos 1 estudiante en la sección
			if (count($datos) > 0){
				$dataSeccion[$add] = [
					'seccion' => $index->curso_seccion,
					'estudiantes' => $datos
				];
				$add++;
			}
		}
		
		if (empty($dataSeccion)){
			return 'no_studiends';
		}
		
		//TODO OK BROS
		return $dataSeccion;
	}
}
