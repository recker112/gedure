<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\CursosData;

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
			]);
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
				$dataUsers[$i]->combiCedula = $dataUsers[$i]->privilegio.$dataUsers[$i]->cedula;
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
			]);
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
}
