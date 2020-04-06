<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\User;
use App\CursosData;
use App\AdminsData;
use App\EstudiantesData;
use App\CreadoresData;

class ModifyUserController extends Controller
{
	public function searchUser($userSearch)
	{
		$privilegio = request()->user()->user_privilegio;

		if ($privilegio !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}

		if ($userSearch === 'all') {
			//Obtener TODOS los usuarios
			$users = User::get();
			//Modelo
			$modelUser = new User;

			//Obtener TODOS los datos
			for($i=0; $i < count($users); $i++){
				$index = $users[$i];

				$dataUsers[$i] = $modelUser->searchUser(
					$index->user_privilegio,
					$index->user_cedula
				);

				//Unir Cedula y Privilegio
				$dataUsers[$i]->combiCedula = $dataUsers[$i]
					->privilegio.$dataUsers[$i]
					->cedula;
			}
		}else {
			//Buscar usuario
			$user = User::find($userSearch);
			//Modelo
			$modelUser = new User;
			//Buscar datos
			$dataUsers = $modelUser->searchUser(
					$user->user_privilegio,
					$user->user_cedula
				);

			//Unir Cedula y Privilegio
			$dataUsers->combiCedula = $dataUsers->privilegio.$dataUsers->cedula;
		}
		return response()->json($dataUsers, 200);
	}
	
	public function searchStudiendsForCurso($cursoSearch)
	{
		$privilegio = request()->user()->user_privilegio;

		if ($privilegio !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//Model
		$curso = new CursosData;
		
		//Listado
		$cursosList = $curso->getStudiends($cursoSearch);
		
		if($cursosList === 'option_not_valid') {
			return response()->json([
				'code' => 400,
				'msg' => 'option_not_valid',
				'description' => 'El curso elegido no existe'
			], 400);
		}
		
		if($cursosList === 'no_studiends') {
			return response()->json([
				'code' => 400,
				'msg' => 'no_studiends',
				'description' => 'No hay estudiantes en esta sección'
			], 400);
		}
		
		//OK BRO
		return response()->json($cursosList, 200);
	}
	
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
		
		//Verificar que la sección no esté llena
		$combiCurso = $cursoReq.$seccionReq;
		$limitList = $estuData->where('estudiante_alumno_id', "E-$combiCurso-40")
			->first();
		if ($limitList) {
			return response()->json([
				'code' => 400,
				'msg' => 'limit_estudient_in_curso',
				'description' => "El curso $combiCurso está lleno"
			], 400);
		}
			
		//modelos
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
			//Meter estudiante de último.
			$estuData->estudiante_alumno_id = 'E-'.$cursoReq.$seccionReq.'-40';
			
			$estuData->save();
			
			//Re-organizar sección.
			$order = $cursoReq.$seccionReq;
			$estuData->orderCursos($order);
		}else if ($privilegio === 'A-') {
			//Datos
			$adminData->admin_name = $name;
			$adminData->admin_cedula = $cedula;
			
			$adminData->save();
		}else if ($privilegio === 'A-') {
			//Datos
			$creaData->creador_name = $name;
			$creaData->creador_cedula = $cedula;
			
			$creaData->save();
		}else {
			return response()->json([
				'code' => 400,
				'msg' => 'privilegio_not_found',
				'description' => "No se ha registrado el privilegio $privilegio en el sistema"
			], 400);
		}
		
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
		
		//modelos
		$creadoresData = new CreadoresData;
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
			$studiend->estudiante_alumno_id = 'E-'.$cursoReq.$seccionReq.'-40';
			//Guardar datos del estudiante
			$status = $studiend->save();
			
			//Re-organizar sección.
			if ($status >= 1) {
				$newCurso = $cursoReq.$seccionReq;
				$estuData->orderCursos($newCurso);
				
				//Verificar que el curso viejo sea diferente
				if ($newCurso !== $oldCurso[1]) {
					$estuData->orderCursos($oldCurso[1]);
				}
			}else {
				return response()->json([
					'code' => 200,
					'msg' => 'user_updated',
					'description' => "No se han realizando cambios"
				], 200);
			}
		}else if ($privilegio === 'A-') {
			//Search Admins
			$admin = $adminData->where('admin_cedula', $cedula);
			//Datos
			$admin->admin_name = $name;
			
			$admin->save();
		}else if ($privilegio === 'A-') {
			$creador = $creadoresData->where('creador_cedula', $cedula);
			//Datos
			$creador->creador_name = $name;
			
			$creador->save();
		}else {
			return response()->json([
				'code' => 400,
				'msg' => 'privilegio_not_found',
				'description' => "No se ha registrado el privilegio $privilegio en el sistema"
			], 400);
		}
		
		return response()->json([
			'code' => 200,
			'msg' => 'user_updated',
			'description' => "El usuario con la cedula ".$privilegio.$cedula." fue actualizado"
		], 200);
	}
	
	public function deleteUser($userSearch)
	{
		//Datos request
		$privilegioUser = request()->user()->user_privilegio;
		$cedula = $userSearch;
		$cursoReq = request()->curso.request()->seccion;

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
			
			//Verificar que exista el usuario en esa sección.
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
		$userExist->delete();
		
		//Re-organizar lista
		if (isset($cursoActual)){
			$estuData->orderCursos($cursoActual[1]);
		}
		
		return response()->json([
			'code' => 200,
			'msg' => 'user_deleted',
			'description' => "El usuario con la cedula $cedula fue eliminado"
		], 200);
	}
}
