<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
//Storage
use Illuminate\Support\Facades\Storage;
//Validación en try
use Illuminate\Validation\ValidationException;
//Excel
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\WhitSheetsMatricula;
use App\Exports\MatriculaExport;
//Modelos
use App\Logs;
use App\User;
use App\EstudiantesData;
use App\AdminsData;
use App\CreadoresData;
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
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'files' => 'required',
				'curso' => 'required|string|max:5',
				'seccion' => 'required|string|max:3'
			], [
				/*
				Custom message
				GLOBAL [propiedad] = required
				ESPECIFICO [value].[propiedad] = user.required
				*/
				'required' => 'Campo obigatorio',
				'string' => 'No válido',
				'max' => 'No válido'
			]);
		} catch (ValidationException $exception) {
			return response()->json([
				'code' => 422,
				'msg'    => 'validation_error',
				'errors' => $exception->errors(),
				'description' => 'El servidor rechazó su solicitud'
			], 422);
		}

		//Verificar privilegio
		if ($privilegio !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}

		foreach ($files as $archivo) {
			//Datos del archivo.
			$mimeType = $archivo->getMimeType();
			
			//Verificar tamaño
			if ($archivo->getSize() / 1024 > 1024){
				return response()->json([
					'code' => 422,
					'msg'    => 'file_size',
					'description' => 'El archivo supera el tamaño máximo'
				], 422);
			}

			//Verificar MIME
			$verifyMIME = $this->verifyMime($mimeType, [
				'text/csv',
				'application/vnd.ms-excel',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheetapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'application/vnd.oasis.opendocument.spreadsheet'
			]);

			if (!$verifyMIME) {
				return response()->json([
					'code' => 422,
					'msg'    => 'image_mime',
					'description' => 'Solo se aceptan archivos .xlsx/.xls/.ods/.csv'
				], 422);
			}

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
					false
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
		
		//Respuesta
		return response()->json([
			'code' => 200,
			'msg' => 'update_matricula',
			'description' => 'Se cargó la sección '.$combiCurso.' correctamente',
			'fileName' => $combiCurso,
			'fileExtension' => 'xlsx'
		], 200);
	}
	
	public function uploadBoletas()
	{
		//Config datos
		$privilegio = request()->user()->user_privilegio;
		$cedula = request()->user()->user_cedula;
		$boletas = request()->file('files');
		$curso = request()->curso;
		$seccion = request()->seccion;
		$combiCurso = $curso.$seccion;
		//Directorio de la lista de los estudiantes cargados.
		$dir = 'boletas';
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'files' => 'required',
				'curso' => 'required|string|max:5',
				'seccion' => 'required|string|max:3'
			], [
				/*
				Custom message
				GLOBAL [propiedad] = required
				ESPECIFICO [value].[propiedad] = user.required
				*/
				'required' => 'Campo obigatorio',
				'string' => 'No válido',
				'max' => 'No válido'
			]);
		} catch (ValidationException $exception) {
			return response()->json([
				'code' => 422,
				'msg'    => 'validation_error',
				'errors' => $exception->errors(),
				'description' => 'El servidor rechazó su solicitud'
			], 422);
		}

		//Verificar privilegio
		if ($privilegio !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//Cargar boletas
		$e = 0;
		$add = 0;
		$errorLogs = [];
		foreach($boletas as $boleta) {
			$extension = $boleta->extension();
			$mimeType = $boleta->getMimeType();
			$size = $boleta->getSize();
			//Quitar extension
			$filename = $boleta->getClientOriginalName();
			$filename = explode('.', $filename);
			$filename = $filename[0];
			$nLista = intval($filename);
			
			//Error
			$error = [];
			
			//Verificar tamaño
			if ($size / 1024 > 3072){
				$error = [
					'type' => 'archive_mime',
					'msg' => "El archivo supera el tamaño máximo"
				];
			}
			
			//Verificar MIME
			$verifyMIME = $this->verifyMime($mimeType, [
				'application/pdf',
				'application/msword',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			]);

			if (!$verifyMIME) {
				$error = [
					'type' => 'archive_mime',
					'msg' => "Solo se aceptan archivos .pdf/.doc/.docx"
				];
			}
			
			//Modelo
			$estuData = new EstudiantesData;
			
			//Buscar estudiante
			$findUser = $estuData
				->where('estudiante_alumno_id', "E-$combiCurso-$nLista")
				->first();
			
			//Verificar existencia
			if (!$findUser) {
				$error = [
					'type' => 'no_exist',
					'msg' => "El estudiante $nLista no existe en la seccion $combiCurso"
				];
			}
			
			if ($findUser && !$error) {
				$cedulaStudiend = $findUser->estudiante_cedula;
				$boleta->storeAs("$dir/$curso/$seccion", "$cedulaStudiend.$extension");
				$add++;
			}else {
				$errorLogs[$e] = $error;
				$e++;
			}
		}
		
		//Verificar que se cargó al menos 1 boleta
		if ($add) {
			//Log
			$Log = new Logs;
			$Log->log_cedula = $cedula;
			$Log->log_action = "Se cargaron $add boletas en $combiCurso.";
			$Log->save();
		}
		
		//Verificar errores
		if (count($errorLogs) === count($boletas)) {
			return response()->json([
				'code' => 400,
				'msg' => 'not_upload_boletas',
				'description' => 'Ninguna de las boletas se pudo cargar',
				'errors' => $errorLogs
			], 400);
		}else if (count($errorLogs) > 0) {
			return response()->json([
				'code' => 400,
				'msg' => 'not_all_upload_boletas',
				'description' => 'Se cargaron algunas boletas en la seccion '.$combiCurso,
				'errors' => $errorLogs
			], 400);
		}
		
		return response()->json([
			'code' => 200,
			'msg' => 'upload_boletas',
			'description' => 'Se cargaron las boletas en la seccion '.$combiCurso
		], 200);
	}
	
	//funciones reutilizables
	public function verifyMime($mime, $list)
	{
		$found = 0;
		for ($i=0; $i < count($list); $i++){
			if ($mime === $list[$i]){
				$found = 1;
			}
		}
		
		return $found;
	}
}
