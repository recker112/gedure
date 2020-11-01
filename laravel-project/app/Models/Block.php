<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\Log;

class Block extends Model
{
	use HasFactory;
	
	protected $fillable = [
		'user_id',
		'cedula',
		'locks',
		'attemps'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	public static function getStatus($cedula) {
		$dataBan = Block::firstWhere('cedula', $cedula);

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
		$userExist = User::firstWhere('cedula', $cedula);

		//Verificar que exista el usuario
		if (!$userExist) {
			return [
				'msg'=>'credentials_error',//Not found
				'description' => 'Usuario y/o contraseña incorrecta'
			];
		}

		//Buscar usuario en baneos
		$datosBlock = Block::firstWhere('user_id', $userExist->id);

		//Si el usario existe verificar los attemps
		if ($datosBlock) {
			//Si attemps es < 4
			if ($datosBlock->attemps < 4){
				$datosBlock->attemps = $datosBlock->attemps + 1;
				$datosBlock->save();
				return [
					'msg'=>'credentials_error',//add_attemps
					'description' => 'Usuario y/o contraseña incorrecta'
				];
			}else if ($datosBlock->attemps == 4) {
				//Si attemps es === 4
				
				$datosBlock->attemps = $datosBlock->attemps + 1;
				$datosBlock->save();
				
				$nivel = $datosBlock->locks + 1;
				$time = 2 * $nivel;
				
				Log::create([
					'user_id' => $userExist->id,
					'action' => "Bloqueo de cuenta nivel: $nivel.",
					'type' => 'session'
				]);
				
				return [
					'msg'=>'account_block',
					'description' => "Cuenta bloqueada, espere $time minutos"
				];
			}else if ($datosBlock->attemps >= 5) {
				//Si attemps es >= 5
				$datosBlock->attemps = 0;
				
				if ($datosBlock->locks < 2) {
					$datosBlock->locks = $datosBlock->locks + 1;
				}
				
				$datosBlock->save();
				return [
					'msg'=>'check_credentials',
					'description' => 'Revisa tus datos, los sigues poniendo mal'
				];
			}
		}

		//Si no existe, registralo
		Block::create([
			'user_id' => $userExist->id,
			'cedula' => $cedula,
			'attemps' => 1,
			'locks' => 0
		]);
		return [
			'msg'=>'credentials_error',
			'description' => 'Usuario y/o contraseña incorrecta'
		];;
	}
}
