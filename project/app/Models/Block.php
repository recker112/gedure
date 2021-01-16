<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use Carbon\Carbon;

class Block extends Model
{
	use HasFactory;
	
	protected $fillable = [
		'user_id',
		'locks',
		'attemps'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	/* 
		CONFIG SYSTEM BLOCK 
	*/
	// NOTA (RECKER): Sistema de bloqueo.
	/* Esta variable define si el sistema de bloqueo estará activo en el sistema.
		 En caso de no estar activa no se bloqueara la cuenta en ningún momento.*/
	public static $blockSystem = true;
	// NOTA (RECKER): Máximo de errores antes de ser bloqueado.
	/* Esta variable controla el máximo de errores que un usuario puede cometer
		 antes de que su cuenta quede bloqueada. Tenga en cuenta que el 0 es un valor
		 contable. (4 = 5)*/
	public static $maxErorresBeforeBlock = 4;

	// NOTA (RECKER): Minutos de bloqueos.
	/* Esta variable controla la cantidad de minutos de bloqueo que recibirá la
		 cuenta, esta cantidad aumenta progresivamente por el nivel del bloqueo */
	public static $minutesOfBlock = 2;

	// NOTA (RECKER): Nivel máximo.
	/* Esta variable controla la cantidad de niveles que se pueden obtener en el 
		 sistema de bloqueos, esta variable va de la mano con $minutesOfBlock. (2 = 3) */
	public static $maxNivel = 2;
	
	public static function getStatus($username) {
		$user = User::firstWhere('username', $username);

		$dataBan = $user->blocks;
		
		//Verificar si no existe
		if (!$dataBan) {
			return 'ok';
		}

		if ($dataBan->attemps >= self::$maxErorresBeforeBlock + 1 && self::$blockSystem) {
			$locks = $dataBan->locks;
			$dateBan = $dataBan->updated_at;
			$dateNow = Carbon::now()->sub(
				self::$minutesOfBlock * ($dataBan->locks + 1), 'minutes'
			);

			//Verificar tiempo de bloqueo
			if($dateBan >= $dateNow){
				//Date
				$waitSeconds = $dateBan->diffInSeconds($dateNow);
				$minutes = $dateBan->diffInMinutes($dateNow);
				$seconds = $waitSeconds % 60;
				$wait = $minutes.'m y '.$seconds.'s';

				return $jsonMessage = [
					'msg' => "Cuenta bloqueada, espere $wait"
				];
			}
		}

		//Regresar un ok si no hay algún bloqueo
		return 'ok';
	}
	
	public static function checkAttemps($username)
	{
		$userExist = User::firstWhere('username', $username);

		//Verificar que exista el usuario
		if (!$userExist) {
			return [
				'msg' => 'Usuario y/o contraseña incorrecta ',//Not found
			];
		}

		//Buscar usuario en baneos
		$datosBlock = $userExist->blocks;

		//Si el usario existe verificar los attemps
		if ($datosBlock) {
			if ($datosBlock->attemps == self::$maxErorresBeforeBlock && self::$blockSystem) {
				//Si attemps es === $maxErorresBeforeBlock
				
				$datosBlock->attemps = $datosBlock->attemps + 1;
				$datosBlock->save();
				
				$nivel = $datosBlock->locks + 1;
				$time = self::$minutesOfBlock * $nivel;
				
				$payload = [
					'nivel' => $nivel,
					'time_block' => $time
				];
				
				$userExist->logs()->create([
					'action' => "Bloqueo de cuenta",
					'payload' => json_encode($payload),
					'type' => 'session'
				]);
				
				return [
					'msg' => "Cuenta bloqueada, espere $time minutos",//Account Block
				];
			} else if ($datosBlock->attemps >= (self::$maxErorresBeforeBlock + 1) && self::$blockSystem) {
				//Si attemps es >= $maxErorresBeforeBlock + 1
				$datosBlock->attemps = 0;
				
				if ($datosBlock->locks < self::$maxNivel) {
					$datosBlock->locks = $datosBlock->locks + 1;
				}
				
				$datosBlock->save();
				return [
					'msg' => 'Revisa tus datos, los sigues poniendo mal',//Check credentials
				];
			} else {
				//Si attemps es < $maxErorresBeforeBlock
				$datosBlock->attemps = $datosBlock->attemps + 1;
				$datosBlock->save();
				return [
					'msg' => 'Usuario y/o contraseña incorrecta',//Add Attemps
				];
			}
		}

		//Si no existe, registralo
		$userExist->blocks()->create([
			'attemps' => 1,
			'locks' => 0
		]);
		
		return [
			'msg' => 'Usuario y/o contraseña incorrecta',//First Error
		];;
	}
}
