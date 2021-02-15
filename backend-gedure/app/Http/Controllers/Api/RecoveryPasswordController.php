<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\RecoveryPassRequest;
use App\Http\Requests\RecoveryVerifyRequest;
use App\Http\Requests\RecoveryChangeRequest;
use Illuminate\Support\Facades\Mail;

//Mails
use App\Mail\CodeSecurity;

use App\Models\User;

class RecoveryPasswordController extends Controller
{
  public function recoveryPassword(RecoveryPassRequest $request)
	{
		$user = User::where('email', $request->email)->firstOrFail();
		
		$code = $this->generateCode(5);
		$timeNow = now();
		$step;
		
		
		if (!$user->recoveryPassword) {
			// Crear un nuevo code
			$user->recoveryPassword()->create([
				'code' => $code,
			]);
			
			Mail::to($user)->queue((new CodeSecurity($user, $code))->onQueue('emails'));
			$step=0;
		}else {
			// Si existe un registro
			$timeUpdated = $user->recoveryPassword->updated_at->addMinutes(4);
			$timeCreated = $user->recoveryPassword->created_at->addMinutes(10);
			
			if ($user->recoveryPassword && $timeNow >= $timeCreated) {
				// Regenerar code después de 10 minutos
				$user->recoveryPassword->delete();
				
				// Crear un nuevo code
				$user->recoveryPassword()->create([
					'code' => $code,
				]);
				
				Mail::to($user)->queue((new CodeSecurity($user, $code))->onQueue('emails'));
				$step=2;
			}else if ($user->recoveryPassword && $timeNow >= $timeUpdated) {
				// Reenviar code si han pasado más de dos minutos
				$codeRegistred = $user->recoveryPassword->code;
				$user->recoveryPassword->updated_at = $timeNow;
				$user->recoveryPassword->save();

				Mail::to($user)->queue((new CodeSecurity($user, $codeRegistred))->onQueue('emails'));
				$step=1;
			} else {
				$waitSeconds = $timeUpdated->diffInSeconds($timeNow);
				$minutes = $timeUpdated->diffInMinutes($timeNow);
				$seconds = $waitSeconds % 60;
				$wait = $minutes.'m y '.$seconds.'s';

				return response()->json([
					'msg' => "Espere $wait para reenviar el correo"
				], 400);
			}
		}
		
		//Log
		$user->logs()->create([
			'action' => 'Correo de recuperación',
			'type' => 'user'
		]);
		
		return response()->json([
			'msg' => 'Correo solicitado',
			'step' => $step,
		], 200);
	}
	
	public function recoveryPasswordVerifyCode(RecoveryVerifyRequest $request)
	{
		$user = User::where('email', $request->email)->firstOrFail();
		
		$serverCode = $user->recoveryPassword->code;
		
		if ($request->code !== $serverCode) {
			return response()->json([
				'msg' => 'Error al verificar el codigo'
			], 400);
		}
			
		$user->recoveryPassword->confirm = 1;
		$user->recoveryPassword->save();
		
		return response()->json([
			'msg' => 'Codigo confirmado'
		], 200);
	}
	
	public function recoveryChangePassword(RecoveryChangeRequest $request)
	{
		$user = User::where('email', $request->email)->firstOrFail();
		
		if (!$user->recoveryPassword->confirm) {
			return response()->json([
				'msg' => 'No se ha verificado el correo'
			], 400);
		}
		
		$user->password = bcrypt($request->password);
		$user->save();
		$user->recoveryPassword->delete();
		
		//Log
		$user->logs()->create([
			'user_id' => $user->id,
			'action' => 'Contraseña cambiada via correo',
			'type' => 'user'
		]);
		
		return response()->json([
			'msg' => 'Contraseña cambiada via correo'
		], 200);
	}
	
	public function generateCode($size)
	{
		$charset = "ABCDEFGHIJKMNOPQRSTUVWXYZ0123456789";
		$charsetLen = strlen($charset) - 1;
		$password = array();
		for ($i = 0; $i < $size; ++$i) {
			$n = rand(0, $charsetLen);
			$password[] = $charset[$n];
		}
		return implode($password);
	}
}
