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
	
	public function searchSeccion($seccion)
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
		$cursosList = $curso->getStudiends($seccion);
		
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
		$privilegioUser = request()->user()->user_privilegio;
		$cedula = request()->cedula;

		if ($privilegioUser !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//modelo
		$user = new User;
		
		//Verificar que no exista
		$userExist = $user->find(request()->cedula);
		if ($userExist){
			return response()->json([
				'code' => 400,
				'msg' => 'user_exist',
				'description' => "El usuario con la cedula $cedula ya existe"
			], 400);
		}
		
		//Crear usuario
		$user->user_cedula = request()->cedula;
		$user->user_privilegio = request()->privilegio;
		$user->user_password = User::encript_password(request()->pass);
		$user->api_token = Str::random(70);
		$user->create_at = now();
		$user->save();
		
		//Cargar datos de usuario
		if (request()->privilegio === 'V-') {
			$estuData = new EstudiantesData;
			
			$estuData->estudiante_name = request()->name;
			$estuData->estudiante_cedula = request()->cedula;
			$curso = request()->curso;
			$seccion = request()->seccion;
			$estuData->estudiante_alumno_id = 'E_'.$curso.$seccion.'_1';
			
			$estuData->save();
		}else if (request()->privilegio === 'A-') {
			$adminData = new AdminsData;
			
			$adminData->admin_name = request()->name;
			$adminData->admin_cedula = request()->cedula;
			
			$adminData->save();
		}else if (request()->privilegio === 'A-') {
			$creaData = new CreadoresData;
			
			$creaData->creador_name = request()->name;
			$creaData->creador_cedula = request()->cedula;
			
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
			'description' => "El usuario con la cedula ".request()->privilegio.$cedula." fue creado"
		], 201);
	}
}
