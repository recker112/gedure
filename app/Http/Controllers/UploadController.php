<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Storage
use Illuminate\Support\Facades\Storage;
//Excel
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\WhitSheetsMatricula;
use App\Exports\MatriculaExport;
//Modelos
use App\Logs;
use App\User;
use App\EstudiantesData;
//Controladores
use App\Http\Controllers\ModifyUserController;

class UploadController extends Controller
{	
	public function uploadMatricula()
	{
		//Config datos
		$privilegio = request()->user()->user_privilegio;
		$files = request()->file('files');
		$curso = request()->curso;
		$seccion = request()->seccion;
		$combiCurso = $curso.$seccion;
		//Directorio de la lista de los estudiantes cargados.
		$dirUsersUpload = 'matricula';

		if ($privilegio !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}

		foreach ($files as $archivo) {
			//Datos del archivo.
			$filename = $archivo->getClientOriginalName();
			$fileSize = $archivo->getSize();
			$mimeType = $archivo->getMimeType();

			//Clase para seleccionar hoja de excel
			$import = new WhitSheetsMatricula();
			//Seleccionar hoja de excel
			$import->onlySheets($combiCurso);
			//Obtener datos conseguidos
			$Studiends = ($import)->toArray($archivo);
		}

		//Verificar que no esté vacio
		if (count($Studiends)<=0){
			return response()->json([
				'code' => 400,
				'msg' => 'sheet_not_found',
				'description' => 'La hoja '.$combiCurso.' no existe en el excel'
			], 400);
		}
		
		//Cabeza del excel
		$exportData[0] = [
			'Cedula',
			'Nombre',
			'Apellido',
			'Contraseña',
		];
		//Comenzar en la fila 2
		$row=1;
		//Insertar estudiantes
		foreach($Studiends[$combiCurso] as $studiend) {
			//Config data
			$cedulaExcel = $studiend['cedula'];
			$nombreExcel = $studiend['nombre'];
			$apellidoExcel = $studiend['apellido'];
			$passExcel = User::password_generate(4);
			
			//Modelos
			$user = new User;
			$modify = new ModifyUserController;
			
			//UserExist
			$UserExist = $user->find($cedulaExcel);
			
			//Verificar existencia
			if (!$UserExist){
				//Crear estudiante
				$modify->createUser(
					$cedulaExcel, 
					'V-', 
					$passExcel, 
					$nombreExcel." ".$apellidoExcel,
					$combiCurso,
					false,
				);
				
				//modelo
				$estuData = new EstudiantesData;
				
				//Actualizar lista
				$estuData->orderCursos($combiCurso);
				//Contraseña
				$passExist = $passExcel;
			}else {
				//Actualizar estudiante
				$modify->updateUserF(
					$cedulaExcel, 
					'V-', 
					$nombreExcel." ".$apellidoExcel,
					$combiCurso
				);
				//Contraseña
				$passExist = 'Contraseña ya generada';
			}
			
			//Array data
			$exportData[$row] = [
				'Cedula' => 'V-'.$cedulaExcel,
				'Nombre' => $nombreExcel,
				'Apellido' => $apellidoExcel,
				'Contraseña' => $passExist,
			];
			
			$row++;
		}
		
		//Exportar archivo
		$export = new MatriculaExport;
		$export->data = $exportData;
		Excel::store($export, "$dirUsersUpload/$combiCurso.xlsx");

		//LOG
		$Log = new Logs;
		$Log->log_cedula = request()->user()->user_cedula;
		$Log->log_action = 'Matricula '.$curso.$seccion.' cargada.';
		$Log->save();
		return response()->json([
			'code' => 200,
			'msg' => 'update_matricula',
			'description' => 'Se cargó la sección '.$combiCurso.' correctamente'
		], 200);
	}
}
