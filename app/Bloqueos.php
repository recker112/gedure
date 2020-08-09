<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\User;
use App\Log;

class Bloqueos extends Model
{
	protected $table = 'bloqueos';
	
	protected $primaryKey = 'cedula';
	
	protected $keyType = 'string';
	
		public static function getStatus($cedula) {
		$dataBan = Bloqueos::find($cedula);

		//Verificar si no existe
		if (!$dataBan) {
			return 'ok';
		}

		if ($dataBan->attemps >= 5) {
			$locks = $dataBan->locks;
			$dateBan = $dataBan->updated_at;
			$dateNow = Carbon::now()->sub(2 * ($dataBan->locks + 1), 'minutes');

			//Verificar tiempo de bloqueo
			if($dateBan >= $dateNow){
				//Date
				$waitSeconds = $dateBan->diffInSeconds($dateNow);
				$minutes = $dateBan->diffInMinutes($dateNow);
				$seconds = $waitSeconds % 60;
				$wait = $minutes.'m y '.$seconds.'s';

				return $jsonMessage = [
					'code' => 400,
					'msg'=>'account_lock',
					'description' => "Cuenta bloqueada, espere $wait"
				];
			}
		}

		//Regresar un ok si no hay algún bloqueo
		return 'ok';
	}
	
	public static function checkAttemps($cedula)
	{
		$userExist = User::find($cedula);

		//Verificar que exista el usuario
		if (!$userExist) {
			return $jsonMessage = [
				'code' => 400,
				'msg'=>'credentials_error',//Not found
				'description' => 'Usuario y/o contraseña incorrecta'
			];
		}

		//Buscar usuario en baneos
		$datosBlock = Bloqueos::find($cedula);

		//Si el usario existe verificar los attemps
		if ($datosBlock) {
			//Si attemps es < 4
			if ($datosBlock->attemps < 4){
				$datosBlock->attemps = $datosBlock->attemps + 1;
				$datosBlock->save();
				$jsonMessage = [
					'code' => 400,
					'msg'=>'credentials_error',//add_attemps
					'description' => 'Usuario y/o contraseña incorrecta'
				];
			}else if ($datosBlock->attemps === 4) {
				//Si attemps es === 4
				$datosBlock->attemps = $datosBlock->attemps + 1;
				$datosBlock->save();
				
				$nivel = $datosBlock->locks + 1;
				$time = 2 * $nivel;
				$jsonMessage = [
					'code' => 400,
					'msg'=>'account_block',
					'description' => "Cuenta bloqueada, espere $time minutos"
				];
				$Log = new Log;
				$Log->cedula = $dataUser->cedula;
				$Log->action = "Bloqueo de cuenta nivel: $nivel.";
				$Log->save();
			}else if ($datosBlock->attemps >= 5) {
				//Si attemps es >= 5
				$datosBlock->attemps = 0;
				
				if ($datosBlock->locks < 2) {
					$datosBlock->locks = $datosBlock->locks + 1;
				}
				
				$datosBlock->save();
				$jsonMessage = [
					'code' => 400,
					'msg'=>'check_credentials',
					'description' => 'Revisa tus datos, los sigues poniendo mal'
				];
			}
			return $jsonMessage;
		}

		//Si no existe, registralo
		$newBlock = new Bloqueos;
		$newBlock->cedula = $cedula;
		$newBlock->attemps = 1;
		$newBlock->locks = 0;
		$newBlock->save();
		$jsonMessage = [
			'code' => 400,
			'msg'=>'credentials_error',
			'description' => 'Usuario y/o contraseña incorrecta'
		];
		return $jsonMessage;
	}
}
