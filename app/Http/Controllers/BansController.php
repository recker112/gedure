<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Models
use App\Ban;
use App\User;

class BansController extends Controller
{
	public function searchBanUser($userSearch)
	{
		$privilegioUser = request()->user()->user_privilegio;
		$limitReq = request()->limit;
		$like = request()->like;

		if ($privilegioUser !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}

		if ($userSearch === 'all') {
			//Obtener usuarios los usuarios
			if ($limitReqReq){
				$users = Ban::join(
					'users',
					'users.user_cedula', 
					'=', 
					'bans_data.ban_cedula')
					->limit($limitReq)->get();
			}else {
				$users = Ban::join(
					'users',
					'users.user_cedula', 
					'=', 
					'bans_data.ban_cedula')
					->get();
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
					->privilegio.
					$dataUsers[$i]->cedula;
				$dataUsers[$i]->locks = $index->ban_locks;
				$dataUsers[$i]->attemps = $index->ban_attemps;
			}
		}else {
			//Buscar usuario
			if ($like){
				$users = Ban::join(
					'users',
					'users.user_cedula', 
					'=', 
					'bans_data.ban_cedula')
					->where('ban_cedula', 'LIKE', "%".$userSearch."%")
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
						->privilegio.
						$dataUsers[$i]->cedula;
					$dataUsers[$i]->locks = $index->ban_locks;
					$dataUsers[$i]->attemps = $index->ban_attemps;
				}
			}else{
				$user = Ban::join(
					'users',
					'users.user_cedula', 
					'=', 
					'bans_data.ban_cedula')
					->find($userSearch);
				
				//Modelo
				$modelUser = new User;
				//Buscar datos
				$dataUsers = $modelUser->searchUser(
						$user->user_privilegio,
						$user->user_cedula
					);

				//Unir Cedula y Privilegio
				$dataUsers->combiCedula = $dataUsers->privilegio.$dataUsers->cedula;
				$dataUsers->locks = $user->ban_locks;
				$dataUsers->attemps = $user->ban_attemps;
			}
		}
		return response()->json($dataUsers, 200);
	}
	
	public function unlockUser($user) 
	{
		$privilegioUser = request()->user()->user_privilegio;
		
		if ($privilegioUser !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		$Ban = new Ban;
		$userFound = $Ban->find($user);
		
		if (!$userFound) {
			return response()->json([
				'code' => 400,
				'msg' => 'not_found',
				'description' => "La cédula $user no está baneada"
			], 400);
		}
		
		$userFound->delete();
		
		return response()->json([
			'code' => 200,
			'msg' => 'user_unlock',
			'description' => "La cédula $user fue desbloqueada"
		], 200);
	}
}
