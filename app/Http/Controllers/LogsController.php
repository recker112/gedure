<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Logs;
use App\User;
use App\Ban;

class LogsController extends Controller
{
    public function getLogs()
		{
			//Datos del usuario
			$privilegio = request()->user()->user_privilegio;
			$option = request()->get;
			
			//Verificar $option
			if (!isset($option)){
				$option = "all";
			}
			
			//Verificar que sea administrador
			if ($privilegio !== 'A-') {
				return response('no_access', 401);
			}
			
			//Crear objeto para realizar consultas
			$Logs = new Logs;
			
			//Realizar consulta
			$query = $Logs->getLogs($option);
			
			//Buscar datos de usuario
			$User = new User;
			for($i=0; $i < count($query); $i++){
				//index
				$index = $query[$i];
				
				//Variables
				$privilegio = $index->privilegio;
				
				//Obtener datos
				$dataUser = $User->getUserData($privilegio);
				
				if ($privilegio === 'V-') {
					//Setear datos
					$index->name = $dataUser->name;
					$index->curso = $dataUser->curso;
					$index->seccion = $dataUser->seccion;
					/* Opciones */
					//Unlock
					$lock = Ban::getStatusBlock($index->cedula) !== 'ok' ? true : false;
					$index->options = array('lock' => $lock);
				}else {
					//Setear datos
					$index->name = $dataUser->name;
					/* Opciones */
					//Unlock
					$lock = Ban::getStatusBlock($index->cedula) !== 'ok' ? true : false;
					$index->options = array('lock' => $lock);
				}
			}
			
			return response()->json($query);
		}
}
