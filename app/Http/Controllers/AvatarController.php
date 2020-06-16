<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Response;
//Validación en try
use Illuminate\Validation\ValidationException;
//Storage
use Illuminate\Support\Facades\Storage;
//Modelos
use App\AdminsData;
use App\EstudiantesData;
use App\CreadoresData;
use App\Logs;
//Controladores
use App\Http\Controllers\UploadController;

class AvatarController extends Controller
{
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
		
		//Verificar privilegio
		if ($privilegio === 'V-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
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
		$modelo = new UploadController;
		$verifyMIME = $modelo->verifyMime($mimeType, [
			'image/png',
			'image/jpeg',
			'image/gif'
		]);
		
		if (!$verifyMIME) {
			return response()->json([
				'code' => 422,
				'msg'    => 'image_mime',
				'description' => 'Solo se aceptan imagenes .png/.jpg/.jpeg/.gif'
			], 422);
		}
		
		//Cargar archivo al servidor
		$avatar->storeAs("$dir", $filenameUploaded, 'public');
		
		$url = Storage::disk('public')->url("$dir/$filenameUploaded");
			
		//Verificar tipo de usuario
		if ($privilegio === 'A-'){
			$adminsData = new AdminsData;
			$userFound = $adminsData->where('admin_cedula', $cedula)->first();
			$oldAvatar = $userFound->admin_avatar;
			$userFound->admin_avatar = $url;
		} else if ($privilegio === 'V-'){
			$estuData = new EstudiantesData;
			$userFound = $estuData->where('estudiante_cedula', $cedula)->first();
			$oldAvatar = $userFound->estudiante_avatar;
			$userFound->estudiante_avatar = $url;
		} else if ($privilegio === 'CR-'){
			$creadorData = new CreadoresData;
			$userFound = $creadorData->where('creador_cedula', $cedula)->first();
			$oldAvatar = $userFound->creador_avatar;
			$userFound->creador_avatar = $url;
		}
		
		//Actualizar avatar en la base de datos.
		$userFound->save();
		
		//Borrar avatar viejo
		if ($oldAvatar !== null){
			$this->deleteAvatar($dir, $oldAvatar);
		}
		
		//Log
		$Log = new Logs;
		$Log->log_cedula = $cedula;
		$Log->log_action = 'Avatar actualizado.';
		$Log->log_create_at = now();
		$Log->save();
		
		//respuesta
		return response()->json([
			'code' => 200,
			'msg' => 'update_avatar',
			'description' => 'Avatar cambiado correctamente',
			'newAvatar' => $url
		], 200);
	}
	
	public function searchAvatar($privilegio, $cedula){
		//Verificar tipo de usuario
		if ($privilegio === 'A-'){
			$adminsData = new AdminsData;
			$userFound = $adminsData->where('admin_cedula', $cedula)->first();
			$avatar = $userFound->admin_avatar;
		} else if ($privilegio === 'V-'){
			$estuData = new EstudiantesData;
			$userFound = $estuData->where('estudiante_cedula', $cedula)->first();
			$avatar = $userFound->estudiante_avatar;
		} else if ($privilegio === 'CR-'){
			$creadorData = new CreadoresData;
			$userFound = $creadorData->where('creador_cedula', $cedula)->first();
			$avatar = $userFound->creador_avatar;
		} else {
			return false;
		}
		
		return $avatar;
	}
	
	public function deleteAvatar($dir, $avatar){
		/*
		El Index de la función "splitURL" lo tomamos de la siguiente manera:
		https:/ /example.com/resoruces/avatars/img
		0      1      2       3         4        5

		Como es explode(), se divide en un array, el index sería el dato que
		queremos que el split regrese, en este caso es la imagen.
		*/
		$imgDelete = $this->splitUrl($avatar, 5);
		
		if (Storage::disk('public')->exists("$dir/$imgDelete")){
			Storage::disk('public')->delete("$dir/$imgDelete");
			return true;
		}else {
			return false;
		}
	}
	
	//Funciones reutilizables
	public function splitUrl($oldAvatar, $index)
	{
		//Obtener avatar viejo y dividir url
		$oldAvatar = explode('/', $oldAvatar);
		//Quitar array
		$oldAvatar = $oldAvatar[$index];
		
		return $oldAvatar;
	}
}
