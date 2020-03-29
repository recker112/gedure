<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\User;

class Ban extends Model
{
    protected $table = 'bans_data';

    protected $primaryKey = 'ban_cedula';

    public static function getStatusBlock($cedula) {
        $dataBan = Ban::find($cedula);

        //Verificar si no existe
        if (!$dataBan) {
            return 'ok';
        }

        if ($dataBan->ban_locks >= 5) {
            return $jsonMessage = [
                'code' => 400,
                'msg'=>'max_locks',
								'description' => 'Comuniquese con un administrador para reactivar la cuenta'
            ];
        }

        if ($dataBan->ban_attemps >= 5) {
            $dateBan = $dataBan->updated_at;
            $dateNow = Carbon::now()->sub(5, 'minutes');

            //Verificar tiempo de bloqueo
            if($dateBan >= $dateNow){
								//Date
                $wait = $dateBan->diffInSeconds($dateNow);
							
                return $jsonMessage = [
                    'code' => 400,
                    'msg'=>'account_lock',
										'description' => "Cuenta bloqueada, espere $wait segundos"
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
        $datosBan = Ban::find($cedula);

        //Si el usario existe verificar los attemps
        if ($datosBan) {
            //Si attemps no es < 4
            if ($datosBan->ban_attemps < 4){
                $datosBan->ban_attemps = $datosBan->ban_attemps + 1;
                $datosBan->save();
                $jsonMessage = [
                    'code' => 400,
                    'msg'=>'credentials_error',//add_attemps
										'description' => 'Usuario y/o contraseña incorrecta'
                ];
            }else if ($datosBan->ban_attemps === 4 && $datosBan->ban_locks === 4) {
                //Si es perma block
                $datosBan->ban_attemps = 0;
                $datosBan->ban_locks = $datosBan->ban_locks + 1;
                $datosBan->save();
                $jsonMessage = [
                    'code' => 400,
                    'msg'=>'perma_block',
										'description' => 'Tu cuenta fue bloqueada permanentemente'
                ];
            }else if ($datosBan->ban_attemps === 4) {
                //Si es === 4
                $datosBan->ban_attemps = $datosBan->ban_attemps + 1;
                $datosBan->save();
                $jsonMessage = [
                    'code' => 400,
                    'msg'=>'account_block',
										'description' => 'Cuenta bloqueada, espere 300 segundos'
                ];
            }else if ($datosBan->ban_attemps >= 5) {
                //Si es >= 5
                $datosBan->ban_attemps = 0;
                $datosBan->ban_locks = $datosBan->ban_locks + 1;
                $datosBan->save();
                $jsonMessage = [
                    'code' => 400,
                    'msg'=>'check_credentials',
										'description' => 'Revisa tus datos, los sigues poniendo mal'
                ];
            }
            return $jsonMessage;
        }

        //Si no existe, registralo
        $newBan = new Ban;
        $newBan->ban_cedula = $cedula;
        $newBan->ban_attemps = 1;
        $newBan->ban_locks = 0;
        $newBan->save();
        $jsonMessage = [
            'code' => 400,
            'msg'=>'credentials_error',
						'description' => 'Usuario y/o contraseña incorrecta'
        ];
        return $jsonMessage;
    }
}
