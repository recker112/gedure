<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Logs extends Model
{
	/**
	 *
	 * @var string
	 */
  protected $primaryKey = 'log_id';
	
	/**
	 *
	 * @var string
	 */
	const CREATED_AT = 'log_create_at';
	
	/**
	 *
	 * @var array
	 */
	protected $hidden = [
			'log_id'
	];
	
	/**
	 *
	 * @var boolean
	 */
	public $timestamps = false;
	
	//OBTENER LOGS
	public function getLogs($option)
	{
		if ($option === 'bans') {
			$dataLogs = Logs::select(
					'log_create_at as fecha',
					'log_action as action',
					'log_cedula as cedula',
					'user_privilegio as privilegio'
				)
				->where('log_action', 'like', '%ban%')
				->join('users', 'users.user_cedula', '=', 'logs.log_cedula')
				->orderBy('log_create_at', 'DESC')
				->limit(100)
				->get();
		}else if ($option === 'session') {
			$dataLogs = Logs::select(
					'log_create_at as fecha',
					'log_action as action',
					'log_cedula as cedula',
					'user_privilegio as privilegio'
				)
				->where('log_action', 'Inicio de sesión.')
				->join('users', 'users.user_cedula', '=', 'logs.log_cedula')
				->orderBy('log_create_at', 'DESC')
				->limit(100)
				->get();
		}else if ($option === 'changePass') {
			$dataLogs = Logs::select(
					'log_create_at as fecha',
					'log_action as action',
					'log_cedula as cedula',
					'user_privilegio as privilegio'
				)
				->where('log_action', 'Cambio de contraseña.')
				->join('users', 'users.user_cedula', '=', 'logs.log_cedula')
				->orderBy('log_create_at', 'DESC')
				->limit(100)
				->get();
		}else {
			//All
			$dataLogs = Logs::select(
					'log_create_at as fecha',
					'log_action as action',
					'log_cedula as cedula',
					'user_privilegio as privilegio'
				)
				->join('users', 'users.user_cedula', '=', 'logs.log_cedula')
				->orderBy('log_create_at', 'DESC')
				->limit(100)
				->get();
		}
		
		return $dataLogs;
	}
}