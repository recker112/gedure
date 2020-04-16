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
		$privilegioAuth = request()->user()->user_privilegio;
		$cedulaReq = request()->cedula;
		$nameReq = request()->name;
		$passReq = request()->pass;
		$privilegioReq = request()->privilegio;
		$cursoReq = request()->curso;
		$seccionReq = request()->seccion;
		$combiCursoReq = $cursoReq.$seccionReq;
		
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
		
		//modelos
		$user = new User;
		$curso = new CursosData;
		$estuData = new EstudiantesData;
		
		//Verificar que no exista
		$userExist = $user->find($cedulaReq);
		if ($userExist){
			return response()->json([
				'code' => 400,
				'msg' => 'user_exist',
				'description' => "El usuario con la cedula $cedulaReq ya existe"
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
		$limitList = $estuData->where('estudiante_alumno_id', "E-$combiCursoReq-40")
			->first();
		if ($limitList) {
			return response()->json([
				'code' => 400,
				'msg' => 'limit_estudient_in_curso',
				'description' => "El curso $combiCursoReq está lleno"
			], 400);
		}
		
		//Crear usuario
		$addUser = $this->createUser(
			$cedulaReq, 
			$privilegioReq, 
			$passReq, 
			$nameReq, 
			$cursoReq,
			$seccionReq
		);
		
		if ($addUser === 'privilegio_not_found') {
			return response()->json([
				'code' => 400,
				'msg' => $addUser,
				'description' => "No se ha registrado el privilegio $privilegioReq en el sistema"
			], 400);
		}
		
		//LOG
		$Log = new Logs;
		$Log->log_cedula = request()->user()->user_cedula;
		$Log->log_action = 'Usuario '.$privilegioReq.$cedulaReq.' creado.';
		$Log->save();
		
		return response()->json([
			'code' => 201,
			'msg' => 'user_created',
			'description' => "El usuario con la cedula ".$privilegioReq.$cedulaReq." fue creado"
		], 201);
	}
	
	public function updateUser($userSearch)
	{
		//Datos request
		$privilegioAuth = request()->user()->user_privilegio;
		$cedulaReq = $userSearch;
		$nameReq = request()->name;
		$privilegioReq = request()->privilegio;
		$cursoReq = request()->curso;
		$seccionReq = request()->seccion;
		$combiCursoReq = $cursoReq.$seccionReq;
		
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
		if ($privilegioAuth !== 'A-') {
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
		$userExist = $user->find($cedulaReq);
		if (!$userExist){
			return response()->json([
				'code' => 400,
				'msg' => 'user_not_exist',
				'description' => "El usuario con la cedula $cedulaReq no existe"
			], 400);
		}
		
		//Verificar exista el curso
		$cursoExist = $curso->find('C-'.$cursoReq.'-'.$seccionReq);
		if (!$cursoExist){
			return response()->json([
				'code' => 400,
				'msg' => 'curso_not_exist',
				'description' => "El curso ".$cursoReq.$seccionReq." no existe"
			], 400);
		}
		
		$updateUser = $this->updateUserF(
			$cedulaReq, $privilegioReq, $nameReq, $cursoReq, $seccionReq
		);
		
		if ($updateUser === 'privilegio_not_found') {
			return response()->json([
				'code' => 400,
				'msg' => $updateUser,
				'description' => 
				"No se ha registrado el privilegio $privilegioReq en el sistema"
			], 400);
		}
		
		//LOG
		$Log = new Logs;
		$Log->log_cedula = request()->user()->user_cedula;
		$Log->log_action = 'Usuario '.$privilegioReq.$cedulaReq.' modificado.';
		$Log->save();
		
		//Respuesta
		return response()->json([
			'code' => 200,
			'msg' => 'user_updated',
			'description' => 
			"El usuario con la cedula ".$privilegioReq.$cedulaReq." fue actualizado"
		], 200);
	}
	
	public function deleteUser($userSearch)
	{
		//Datos request
		$privilegioAuth = request()->user()->user_privilegio;
		$privilegioReq = request()->privilegio;
		$cedulaReq = $userSearch;
		$cursoReq = request()->curso;
		$seccionReq = request()->seccion;
		$combiCursoReq = $cursoReq.$seccionReq;
		
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
		if ($privilegioAuth !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//modelos
		$user = new User;
		
		//Verificar que no exista
		$userExist = $user->searchUser($privilegioReq, $cedulaReq);
		if (!$userExist){
			return response()->json([
				'code' => 400,
				'msg' => 'user_not_exist',
				'description' => "El usuario con la cedula $cedulaReq no existe"
			], 400);
		}
		
		//obtener curso actual
		if ($userExist->user_privilegio === 'V-'){
			//Obtener curso actual
			$cursoActual = $userExist->alumno_id;
			$cursoActual = explode("-", $cursoActual);
			
			//Verificar que exista el usuario en esa sección.
			if ($cursoActual[1] === $combiCursoReq){
				$inSecccion = true;
			}else {
				$inSecccion = false;
			}
		}
		
		//Verificar que existe en la seccion
		if (isset($inSecccion) && !$inSecccion){
			return response()->json([
				'code' => 400,
				'msg' => 'not_found',
				'description' => "No se ha podido encontrar al estudiante en la seccion $cursoReq"
			], 400);
		}
		
		//Eliminar usuario
		$privilegioUser = $userExist->privilegio;
		$cursoUser = $userExist->curso;
		$seccionUser = $userExist->seccion;
		$deleteUserFunction = $this->deleteUserF(
			$userExist->cedula, $privilegioUser, $cursoUser, $seccionUser
		);
		
		if ($deleteUserFunction !== 'ok') {
			return response()->json([
				'code' => 400,
				'msg' => 'not_del_user',
				'description' => "No se pudo borrar al usuario con la cedula ".
				$privilegioUser.$cedulaReq
			], 400);
		}
		
		//Re-organizar lista
		if (isset($cursoActual)){
			$estuData = new EstudiantesData;
			$estuData->orderCursos($cursoUser, $seccionUser);
		}
		
		//LOG
		$Log = new Logs;
		$Log->log_cedula = request()->user()->user_cedula;
		$Log->log_action = 'Usuario '.$privilegioReq.$cedulaReq.' eliminado.';
		$Log->save();
		
		//Respuesta
		return response()->json([
			'code' => 200,
			'msg' => 'user_deleted',
			'description' => "El usuario con la cedula ".$privilegioReq.
			$cedulaReq." fue eliminado"
		], 200);
	}
	
	public function changePass()
	{
		//Datos request
		$cedulaReq = request()->user()->user_cedula;
		$newPassReq = request()->newPass;
		$actualPassReq = request()->actualPass;
		$passwordInDBAuth = request()->user()->user_password;
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'newPass' => 'required|string|min:4'
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
				'description' => 'El servidor rechazรณ su solicitud'
			], 422);
		}
		
		//modelos
		$users = new User;
		
		//Buscar usuario
		$userFound = $users->find($cedulaReq);
		
		//Verificar contraseña
		$actualPassNoEncrypt = User::encript_password($actualPassReq, false);
		$verifyPass = User::verify_password($actualPassNoEncrypt, $passwordInDBAuth);
		
		if (!$verifyPass) {
			return response()->json([
				'code' => 400,
				'msg'    => 'pass_error',
				'description' => 'La contraseña actual es incorrecta'
			], 400);
		}
		
		//Registrar nueva contraseña
		$userFound->user_password = User::encript_password($newPassReq);
		
		$userFound->save();
		
		//LOG
		$Log = new Logs;
		$Log->log_cedula = $cedulaReq;
		$Log->log_action = 'Cambio de contraseña.';
		$Log->save();
		
		return response()->json([
			'code' => 201,
			'msg' => 'update_password',
			'description' => "Contraseña cambiada correctamente"
		], 200);
	}
	
	public function deleteUserMassive()
	{
		$privilegioAuth = request()->user()->user_privilegio;
		$cursoReq = request()->curso;
		$seccionReq = request()->seccion;
		$combiCursoReq = $cursoReq.$seccionReq;
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
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
		
		//Verificar privilegio
		if ($privilegioAuth !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		$user = new User;
		
		$users = $user->searchMassiveUsersForCurso($cursoReq, $seccionReq);
		
		if (!count($users)){
			return response()->json([
				'code' => 400,
				'msg' => 'no_access',
				'description' => "No hay estudiantes en la seccion $combiCursoReq"
			], 400);
		}
		
		$delete=0;
		$errosLogs = [];
		$e = 0;
		foreach($users as $studiend) {
			$error = [];
			$cedulaUser = $studiend->cedula;
			$privilegioUser = $studiend->privilegio;
			$cursoUser = $studiend->curso;
			$seccionUser = $studiend->seccion;
			$status = $this->deleteUserF(
				$cedulaUser, $privilegioUser, $cursoUser, $seccionUser
			);
			
			if ($status !== 'ok'){
				$error = [
					'cedula' => $cedulaUser,
					'msg' => 'not_delete',
					'description' => 'Hubo un problema al intentar eliminar al estudiante'
				];
			}
			
			if (!$error) {
				$delete++;
			}
		}
		
		return response()->json([
			'code' => 200,
			'msg' => 'delete_users',
			'description' => "Se borraron $delete estudiantes",
			'errors' => $errosLogs
		], 200);
	}
	
	//Funciones reutilizables
	public function createUser(
		$cedula, 
		$privilegio, 
		$pass, 
		$name, 
		$curso = false,
		$seccion = false,
		$updateCursos = true
	)
	{
		$combiCurso = $curso.$seccion;
		
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
				$estuData->orderCursos($curso, $seccion);
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
	
	public function updateUserF(
		$cedula, $privilegio, $name, $curso = false, $seccion = false
	)
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
			$oldCurso = str_split($oldCurso[1]);
			if (count($oldCurso) > 2) {
				$oldSeccion = $oldCurso[2];
				$oldCurso = $oldCurso[0].$oldCurso[1];
			}else {
				$oldSeccion = $oldCurso[1];
				$oldCurso = $oldCurso[0];
			}
			//Mover estudante
			$studiend->estudiante_alumno_id = 'E-'.$curso.$seccion.'-40';
			//Guardar datos del estudiante
			$status = $studiend->save();
			
			//Re-organizar sección.
			if ($status >= 1) {
				$estuData->orderCursos($curso, $seccion);
				
				//Verificar que el curso viejo sea diferente
				if ($curso.$seccion !== $oldCurso.$oldSeccion) {
					$estuData->orderCursos($oldCurso, $oldSeccion);
				}
			}
			
			//Mover boleta
			$dir = 'boletas';
			$oldDir = "$dir/$oldCurso/$oldSeccion/$cedula.pdf";
			$newDir = "$dir/$curso/$seccion/$cedula.pdf";
			
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
	
	public function deleteUserF(
		$cedula, 
		$privilegio = false, 
		$curso = false,
		$seccion = false
	)
	{
		//Variables
		$userModel = new User;
		$user = $userModel->find($cedula);
		$cedula = $user->user_cedula;
		
		if ($privilegio === 'V-'){
			//Buscar boleta
			$dirBoleta = "boletas/$curso/$seccion/$cedula.pdf";
			
			$existFile = Storage::exists($dirBoleta);
			
			if ($existFile) {
				Storage::delete($dirBoleta);
			}
			
			//Borrar usuario
			$user->delete();
		}else if ($privilegio === 'A-') {
			$userModel->delete();
		}else if ($privilegio === 'CR-') {
			$userModel->delete();
		}else {
			return 'privilegio_not_found';
		}
		
		return 'ok';
	}
}
