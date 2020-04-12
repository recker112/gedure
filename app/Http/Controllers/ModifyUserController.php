<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
//Store
use Illuminate\Support\Facades\Storage;
//Validación en try
use Illuminate\Validation\ValidationException;
//Modelos
use App\User;
use App\CursosData;
use App\AdminsData;
use App\EstudiantesData;
use App\CreadoresData;
use App\Logs;

class ModifyUserController extends Controller
{
	public function addUser()
	{
		//Datos request
		$privilegioUser = request()->user()->user_privilegio;
		$cedula = request()->cedula;
		$name = request()->name;
		$pass = request()->pass;
		$privilegio = request()->privilegio;
		$cursoReq = request()->curso;
		$seccionReq = request()->seccion;
		$combiCurso = $cursoReq.$seccionReq;
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'cedula' => 'required|string|min:3',
				'name' => 'required|string|min:3',
				'pass' => 'required|string|min:4',
				'privilegio' => 'required|string|max:4',
				'curso' => 'required|string|max:5',
				'seccion' => 'required|string|max:3'
			], [
				/*
				Custom message
				GLOBAL [propiedad] = required
				ESPECIFICO [value].[propiedad] = user.required
				*/
				'required' => 'Campo obigatorio',
				'required' => 'No válido',
				'min' => 'No válido',
				'max' => 'No válido'

			]);
		} catch (ValidationException $exception) {
			return response()->json([
				'code' => 422,
				'msg'    => 'validation_error',
				'errors' => $exception->errors(),
				'description' => 'El servidor rechazรณ su solicitud'
			], 422);
		}

		//Verificar permiso
		if ($privilegioUser !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//modelos
		$user = new User;
		$curso = new CursosData;
		$estuData = new EstudiantesData;
		
		//Verificar que no exista
		$userExist = $user->find($cedula);
		if ($userExist){
			return response()->json([
				'code' => 400,
				'msg' => 'user_exist',
				'description' => "El usuario con la cedula $cedula ya existe"
			], 400);
		}
		
		//Verificar exista el curso
		$cursoExist = $curso->find('C-'.$cursoReq.'-'.$seccionReq);
		if (!$cursoExist){
			return response()->json([
				'code' => 400,
				'msg' => 'curso_not_exist',
				'description' => "El curso ".$curso.$seccion." no existe"
			], 400);
		}
		
		//Verificar que la sección no está llena
		$limitList = $estuData->where('estudiante_alumno_id', "E-$combiCurso-40")
			->first();
		if ($limitList) {
			return response()->json([
				'code' => 400,
				'msg' => 'limit_estudient_in_curso',
				'description' => "El curso $combiCurso está lleno"
			], 400);
		}
		
		//Crear usuario
		$addUser = $this->createUser(
			$cedula, 
			$privilegio, 
			$pass, 
			$name, 
			$combiCurso
		);
		
		if ($addUser === 'privilegio_not_found') {
			return response()->json([
				'code' => 400,
				'msg' => $addUser,
				'description' => "No se ha registrado el privilegio $privilegio en el sistema"
			], 400);
		}
		
		//LOG
		$Log = new Logs;
		$Log->log_cedula = request()->user()->user_cedula;
		$Log->log_action = 'Usuario '.$privilegio.$cedula.' creado.';
		$Log->save();
		
		return response()->json([
			'code' => 201,
			'msg' => 'user_created',
			'description' => "El usuario con la cedula ".$privilegio.$cedula." fue creado"
		], 201);
	}
	
	public function updateUser($userSearch)
	{
		//Datos request
		$privilegioUser = request()->user()->user_privilegio;
		$cedula = $userSearch;
		$name = request()->name;
		$privilegio = request()->privilegio;
		$cursoReq = request()->curso;
		$seccionReq = request()->seccion;
		$combiCurso = $cursoReq.$seccionReq;
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'cedula' => 'required|string|min:3',
				'name' => 'required|string|min:3',
				'pass' => 'required|string|min:4',
				'privilegio' => 'required|string|max:4',
				'curso' => 'required|string|max:5',
				'seccion' => 'required|string|max:3'
			], [
				/*
				Custom message
				GLOBAL [propiedad] = required
				ESPECIFICO [value].[propiedad] = user.required
				*/
				'required' => 'Campo obigatorio',
				'required' => 'No válido',
				'min' => 'No válido',
				'max' => 'No válido'

			]);
		} catch (ValidationException $exception) {
			return response()->json([
				'code' => 422,
				'msg'    => 'validation_error',
				'errors' => $exception->errors(),
				'description' => 'El servidor rechazรณ su solicitud'
			], 422);
		}

		//Verificar permiso
		if ($privilegioUser !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//modelos
		$user = new User;
		$curso = new CursosData;
		$estuData = new EstudiantesData;
		
		//Verificar que no exista
		$userExist = $user->find($cedula);
		if (!$userExist){
			return response()->json([
				'code' => 400,
				'msg' => 'user_not_exist',
				'description' => "El usuario con la cedula $cedula no existe"
			], 400);
		}
		
		//Verificar exista el curso
		$cursoExist = $curso->find('C-'.$cursoReq.'-'.$seccionReq);
		if (!$cursoExist){
			return response()->json([
				'code' => 400,
				'msg' => 'curso_not_exist',
				'description' => "El curso ".$curso.$seccion." no existe"
			], 400);
		}
		
		$updateUser = $this->updateUserF($cedula, $privilegio, $name, $combiCurso);
		
		if ($updateUser === 'privilegio_not_found') {
			return response()->json([
				'code' => 400,
				'msg' => $updateUser,
				'description' => 
				"No se ha registrado el privilegio $privilegio en el sistema"
			], 400);
		}
		
		//LOG
		$Log = new Logs;
		$Log->log_cedula = request()->user()->user_cedula;
		$Log->log_action = 'Usuario '.$privilegio.$cedula.' modificado.';
		$Log->save();
		
		//Respuesta
		return response()->json([
			'code' => 200,
			'msg' => 'user_updated',
			'description' => 
			"El usuario con la cedula ".$privilegio.$cedula." fue actualizado"
		], 200);
	}
	
	public function deleteUser($userSearch)
	{
		//Datos request
		$privilegioUser = request()->user()->user_privilegio;
		$cedula = $userSearch;
		$cursoReq = request()->curso.request()->seccion;
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'cedula' => 'required|string|min:3',
				'curso' => 'required|string|max:5',
				'seccion' => 'required|string|max:3'
			], [
				/*
				Custom message
				GLOBAL [propiedad] = required
				ESPECIFICO [value].[propiedad] = user.required
				*/
				'required' => 'Campo obigatorio',
				'required' => 'No válido',
				'min' => 'No válido',
				'max' => 'No válido'

			]);
		} catch (ValidationException $exception) {
			return response()->json([
				'code' => 422,
				'msg'    => 'validation_error',
				'errors' => $exception->errors(),
				'description' => 'El servidor rechazรณ su solicitud'
			], 422);
		}

		//Verificar permiso
		if ($privilegioUser !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//modelos
		$user = new User;
		
		//Verificar que no exista
		$userExist = $user->find($cedula);
		if (!$userExist){
			return response()->json([
				'code' => 400,
				'msg' => 'user_not_exist',
				'description' => "El usuario con la cedula $cedula no existe"
			], 400);
		}
		
		//obtener curso actual
		if ($userExist->user_privilegio === 'V-'){
			//Obtener curso actual
			$estuData = new EstudiantesData;
			$cursoActual = $estuData->select('estudiante_alumno_id')
				->where('estudiante_cedula', $userExist->user_cedula)
				->get();
			$cursoActual = explode("-", $cursoActual);
			
			//Verificar que exista el usuario en esa secciรณn.
			if ($cursoActual[1] === $cursoReq){
				$inSecccion = true;
			}else {
				$inSecccion = false;
			}
		}
		
		//Verificar que existe en la seccion
		if (isset($inSecccion) && !$inSecccion){
			return response()->json([
				'code' => 400,
				'msg' => 'user_deleted',
				'description' => "No se ha podido encontrar al estudiante en la seccion $cursoReq"
			], 400);
		}
		
		//Eliminar usuario
		$privilegio = $userExist->user_privilegio;
		$userExist->delete();
		
		//Re-organizar lista
		if (isset($cursoActual)){
			$estuData->orderCursos($cursoActual[1]);
		}
		
		//LOG
		$Log = new Logs;
		$Log->log_cedula = request()->user()->user_cedula;
		$Log->log_action = 'Usuario '.$privilegio.$cedula.' eliminado.';
		$Log->save();
		
		//Respuesta
		return response()->json([
			'code' => 200,
			'msg' => 'user_deleted',
			'description' => "El usuario con la cedula ".$privilegio.
			$cedula." fue eliminado"
		], 200);
	}
	
	public function createUser(
		$cedula, 
		$privilegio, 
		$pass, 
		$name, 
		$combiCurso, 
		$updateCursos = true
	)
	{
		//Modelos
		$user = new User;
		$estuData = new EstudiantesData;
		$creaData = new CreadoresData;
		$adminData = new AdminsData;
		
		//Crear usuario
		$user->user_cedula = $cedula;
		$user->user_privilegio = $privilegio;
		$user->user_password = User::encript_password($pass);
		$user->api_token = Str::random(70);
		$user->create_at = now();
		$user->save();
		
		//Cargar datos de usuario
		if ($privilegio === 'V-') {
			//Datos
			$estuData->estudiante_name = $name;
			$estuData->estudiante_cedula = $cedula;
			//Meter estudiante de รบltimo.
			$estuData->estudiante_alumno_id = 'E-'.$combiCurso.'-40';
			
			$estuData->save();
			
			//Re-organizar secciรณn.
			if ($updateCursos){
				$estuData->orderCursos($combiCurso);
			}
		}else if ($privilegio === 'A-') {
			//Datos
			$adminData->admin_name = $name;
			$adminData->admin_cedula = $cedula;
			
			$adminData->save();
		}else if ($privilegio === 'CR-') {
			//Datos
			$creaData->creador_name = $name;
			$creaData->creador_cedula = $cedula;
			
			$creaData->save();
		}else {
			return 'privilegio_not_found';
		}
		
		return 'ok';
	}
	
	public function updateUserF($cedula, $privilegio, $name, $combiCurso)
	{
		//Modelos
		$estuData = new EstudiantesData;
		$creaData = new CreadoresData;
		$adminData = new AdminsData;
		
		//Cargar datos de usuario
		if ($privilegio === 'V-') {
			//Search Studiend
			$studiend = $estuData->where('estudiante_cedula', $cedula)->first();
			//Actualizar datos
			$studiend->estudiante_name = $name;
			//Guardar curso viejo
			$oldCurso = $studiend->estudiante_alumno_id;
			$oldCurso = explode("-", $oldCurso);
			//Mover estudante
			$studiend->estudiante_alumno_id = 'E-'.$combiCurso.'-40';
			//Guardar datos del estudiante
			$status = $studiend->save();
			
			//Re-organizar sección.
			if ($status >= 1) {
				$estuData->orderCursos($combiCurso);
				
				//Verificar que el curso viejo sea diferente
				if ($combiCurso !== $oldCurso[1]) {
					$estuData->orderCursos($oldCurso[1]);
				}
			}
			
			//Mover boleta
			
			//Datos
			$archiveOldCurso = strlen($oldCurso[1]) === 2 ?
				str_split($oldCurso[1], 1)
			:
				str_split($oldCurso[1], 2);
			
			$archiveNewCurso = strlen($combiCurso) === 2 ?
				str_split($combiCurso, 1)
			:
				str_split($combiCurso, 2);
			
			$dir = 'boletas';
			$oldDir = "$dir/$archiveOldCurso[0]/$archiveOldCurso[1]/$cedula.pdf";
			$newDir = "$dir/$archiveNewCurso[0]/$archiveNewCurso[1]/$cedula.pdf";
			
			$existFile = Storage::exists($oldDir);
			
			//Verificar existencia del archivo
			if ($existFile && $oldDir !== $newDir) {
				Storage::move($oldDir, $newDir);
			}
		}else if ($privilegio === 'A-') {
			//Search Admins
			$admin = $adminData->where('admin_cedula', $cedula)->first();
			//Datos
			$admin->admin_name = $name;
			
			$admin->save();
		}else if ($privilegio === 'CR-') {
			$creador = $creadoresData->where('creador_cedula', $cedula)->first();
			//Datos
			$creador->creador_name = $name;
			
			$creador->save();
		}else {
			return 'privilegio_not_found';
		}
		
		return 'ok';
	}
}
