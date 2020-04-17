<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Modelos
use App\EstudiantesData;
use App\AlumnosData;

class UserOptionsController extends Controller
{
  public function changeStudiendOptions()
	{
		$privilegioAuth = request()->user()->user_privilegio;
		$notaReq = request()->nota === 'activo' ? 1 : 0;
		$horarioReq = request()->horario === 'activo' ? 1 : 0;
		$estudianteReq = request()->estudiante;
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'estudiante' => 'required|string|min:3',
				'nota' => 'required|string',
				'horario' => 'required|string'
			], [
				/*
				Custom message
				GLOBAL [propiedad] = required
				ESPECIFICO [value].[propiedad] = user.required
				*/
				'required' => 'Campo obigatorio',
				'required' => 'No válido',
				'min' => 'No válido'
			]);
		} catch (ValidationException $exception) {
			return response()->json([
				'code' => 422,
				'msg'    => 'validation_error',
				'errors' => $exception->errors(),
				'description' => 'El servidor rechazó su solicitud'
			], 422);
		}
		
		//Verificar permiso
		if ($privilegioAuth !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//Modelos
		$alumnoData = new AlumnosData;
		
		$alumno = $alumnoData->searchAlumnoForStudiend($estudianteReq);
		if (!$alumno){
			return response()->json([
				'code' => 400,
				'msg' => 'studiend_not_exist',
				'description' => "El estudiante V-".$estudianteReq." no existe"
			], 400);
		}
		
		$alumno = $alumnoData->find($alumno->id);
		$alumno->alumno_nota_status = $notaReq;
		$alumno->alumno_horario_status = $horarioReq;
		
		if(!$alumno->save()){
			return response()->json([
				'code' => 400,
				'msg' => 'not_updated',
				'description' => "No se pudo actualizar al estudiante V-".$estudianteReq
			], 400);
		}
		
		return response()->json([
			'code' => 200,
			'msg' => 'studiends_update',
			'description' => "Configuración actualizada para el estudiante V-".$estudianteReq
		], 200);
	}
	
	public function changeSecciondOptions()
	{	
		$privilegioAuth = request()->user()->user_privilegio;
		$notaReq = request()->nota === 'activo' ? 1 : 0;
		$horarioReq = request()->horario === 'activo' ? 1 : 0;
		$cursoReq = request()->curso;
		$seccionReq = request()->seccion;
		$combiCursoReq = $cursoReq.$seccionReq;
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'seccion' => 'required|string',
				'curso' => 'required|string',
				'nota' => 'required|string',
				'horario' => 'required|string'
			], [
				/*
				Custom message
				GLOBAL [propiedad] = required
				ESPECIFICO [value].[propiedad] = user.required
				*/
				'required' => 'Campo obigatorio',
				'required' => 'No válido'
			]);
		} catch (ValidationException $exception) {
			return response()->json([
				'code' => 422,
				'msg'    => 'validation_error',
				'errors' => $exception->errors(),
				'description' => 'El servidor rechazó su solicitud'
			], 422);
		}
		
		//Verificar permiso
		if ($privilegioAuth !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//Modelos
		$alumnoData = new AlumnosData;
		
		$alumnos = $alumnoData->searchAlumnosForCurso("C-".$cursoReq."-".$seccionReq);
		if (!count($alumnos)){
			return response()->json([
				'code' => 400,
				'msg' => 'studiend_not_exist',
				'description' => "No existen estudiantes en la seccion $combiCursoReq"
			], 400);
		}
		
		foreach($alumnos as $alumno){
			$alumno = $alumnoData->find($alumno->alumno_id);
			$alumno->alumno_nota_status = $notaReq;
			$alumno->alumno_horario_status = $horarioReq;
			$alumno->save();
		}
		
		return response()->json([
			'code' => 200,
			'msg' => 'studiends_update',
			'description' => "Configuración actualizada para la seccion ".$combiCursoReq
		], 200);
	}
}
