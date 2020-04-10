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
	
	public function uploadAvatar()
	{
		//Config datos
		$privilegio = request()->user()->user_privilegio;
		$cedula = request()->user()->user_cedula;
		$avatar = request()->file('avatar');
		$extension = $avatar->extension();
		$mimeType = $avatar->getMimeType();
		$filename = Str::random(80);
		$filenameUploaded = $filename.".".$extension;
		$dir = 'avatars';
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'avatar' => 'required'
			], [
				/*
				Custom message
				GLOBAL [propiedad] = required
				ESPECIFICO [value].[propiedad] = user.required
				*/
				'required' => 'Campo obigatorio'
			]);
		} catch (ValidationException $exception) {
			return response()->json([
				'code' => 422,
				'msg'    => 'validation_error',
				'errors' => $exception->errors(),
				'description' => 'El servidor rechazó su solicitud'
			], 422);
		}
		
		//Verificar tamaño
		if ($avatar->getSize() / 1024 > 3072){
			return response()->json([
				'code' => 422,
				'msg'    => 'image_size',
				'description' => 'La imagen supera el tamaño máximo'
			], 422);
		}
		
		//Verificar MIME
		$verifyMIME = $this->verifyMime($mimeType, [
			'image/png',
			'image/jpeg'
		]);
		
		if (!$verifyMIME) {
			return response()->json([
				'code' => 422,
				'msg'    => 'image_mime',
				'description' => 'Solo se aceptan imagenes .png/.jpg/.jpeg'
			], 422);
		}
		
		//Verificar privilegio
		if ($privilegio === 'V-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//Genear url
		$uploadedAvatarDir = env('APP_URL').
			"/api/imagenes/$dir/$filename?extension=$extension";
		
		//Cargar archivo al servidor
		$path = Storage::disk('public')->putFileAs(
			"$dir", $avatar, $filenameUploaded
		);
		
		//Verificar tipo de usuario
		if ($privilegio === 'A-'){
			$adminsData = new AdminsData;
			$userFound = $adminsData->where('admin_cedula', $cedula)->first();
			$oldAvatar = $userFound->admin_avatar;
			$userFound->admin_avatar = $uploadedAvatarDir;
		} else if ($privilegio === 'V-'){
			$estuData = new EstudiantesData;
			$userFound = $estuData->where('estudiante_avatar', $cedula)->first();
			$oldAvatar = $userFound->estudiante_avatar;
			$userFound->estudiante_avatar = $uploadedAvatarDir;
		} else if ($privilegio === 'CR-'){
			$creadorData = new EstudiantesData;
			$userFound = $creadorData->where('creador_avatar', $cedula)->first();
			$oldAvatar = $userFound->creador_avatar;
			$userFound->creador_avatar = $uploadedAvatarDir;
		}
		
		//Actualizar avatar en la base de datos.
		$userFound->save();
		
		if ($oldAvatar !== null){
			$dirDelete = $this->splitUrl($oldAvatar, $dir);
			if (Storage::disk('public')->exists($dirDelete)){
				Storage::disk('public')->delete($dirDelete);
			}
		}
		
		return response()->json([
			'code' => 200,
			'msg' => 'update_avatar',
			'description' => 'Avatar cambiado correctamente',
			'newAvatar' => $uploadedAvatarDir
		], 200);
	}
	
	//Funciones reutilizables
	public function splitUrl($oldAvatar, $dir)
	{
		//Obtener avatar viejo y dividir url
		$oldAvatar = explode('/', $oldAvatar);
		//Quitar el ? del url
		$oldAvatar = explode('?', $oldAvatar[6]);
		//Quitar el = del url
		$oldExtension = explode('=', $oldAvatar[1]);
		//Quitar arrays
		$oldAvatar = $oldAvatar[0];
		$oldExtension = $oldExtension[1];
		//Borrar avatar viejo
		$dirDelete = "$dir/$oldAvatar.$oldExtension";
		
		return $dirDelete;
	}
	
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
