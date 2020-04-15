<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Modelos
use App\User;
use App\CursosData;

class GetUserController extends Controller
{
	public function searchUser($userSearch)
	{
		$privilegio = request()->user()->user_privilegio;
		$limit = request()->limit;
		$like = request()->like;

		if ($privilegio !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}

		if ($userSearch === 'all') {
			//Obtener usuarios los usuarios
			if ($limit){
				$users = User::limit($limit)->get();
			}else {
				$users = User::get();
			}
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
			if ($like){
				$users = User::where('user_cedula', 'LIKE', "%".$userSearch."%")
					->limit(10)
					->get();
				
				$modelUser = new User;
				
				$dataUsers = [];
				for ($i=0; $i < count($users); $i++){
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
			}else{
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
				'description' => 'No hay estudiantes en esta secciรณn'
			], 400);
		}
		
		//OK BRO
		return response()->json($cursosList, 200);
	}
}
