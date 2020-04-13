<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Validación en try
use Illuminate\Validation\ValidationException;
//Storage
use Illuminate\Support\Facades\Storage;
//Modelos
use App\NewsData;
use App\AnunciosData;
use Carbon\Carbon;
use App\Logs;
//Controladores
use App\Http\Controllers\UploadController;

class PostController extends Controller
{
	public function getNews()
	{
		//Preparar datos
		$news = new NewsData;
		$maxNews = request()->limit;
		$offset = request()->offset;

		//Verificar empty variables
		if (!$maxNews) {
			$maxNews = 5;
		}

		if (!$offset) {
			$offset = 0;
		}

		//Recibir noticias
		$dataNews = $news->getNews($maxNews, $offset);

		//Verificar existencia del último post
		for($i=0; $i < count($dataNews); $i++) {
			if ($dataNews[$i]->id === 1) {
				$finish = true;
			}else {
				$finish = false;
			}

			//Set Fecha
			$parse = Carbon::parse($dataNews[$i]->fecha)->locale('es');
			$dataNews[$i]->fecha = $parse->diffForHumans();
		}

		//Verifi empty
		if (!isset($finish)) {
			$finish = true;
		}

		//Preparar respuesta
		$jsonMessage = [
			'code' => 200,
			'finish' => $finish,
			'data' => $dataNews
		];

		//Regresar news
		return response()->json($jsonMessage);
	}
	
	public function getAnuncios()
	{
		//Preparar datos
		$anuncios = new AnunciosData;
		$maxAnuncios = request()->limit;
		$offset = request()->offset;

		//Verificar empty variables
		if (!$maxAnuncios) {
			$maxAnuncios = 7;
		}

		if (!$offset) {
			$offset = 0;
		}

		//Recibir noticias
		$dataAnuncios = $anuncios->getAnuncios($maxAnuncios, $offset);

		//Verificar existencia del último post
		for($i=0; $i < count($dataAnuncios); $i++) {
			if ($dataAnuncios[$i]->id === 1) {
				$finish = true;
			}else {
				$finish = false;
			}

			//Set fecha
			$parse = Carbon::parse($dataAnuncios[$i]->fecha)->locale('es');
			$dataAnuncios[$i]->fecha = $parse->diffForHumans();
		}

		//Verifi empty
		if (!isset($finish)) {
			$finish = true;
		}

		//Preparar respuesta
		$jsonMessage = [
			'code' => 200,
			'finish' => $finish,
			'data' => $dataAnuncios
		];

		//Regresar news
		return response()->json($jsonMessage);
	}
	
	public function publicarNews()
	{
		//Config datos
		$privilegio = request()->user()->user_privilegio;
		$cedula = request()->user()->user_cedula;
		$img = request()->file('img');
		$archives = request()->file('archives');
		$title = request()->title;
		$content = request()->content;
		$dir = 'news';
		
		//Verificar privilegio
		if ($privilegio !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'title' => 'required|string|max:50',
				'content' => 'required|string|min:20',
				'archives' => 'max:4'
			], [
				/*
				Custom message
				GLOBAL [propiedad] = required
				ESPECIFICO [value].[propiedad] = user.required
				*/
				'required' => 'Campo obigatorio',
				'string' => 'No válido',
				'max' => 'No válido',
				'min' => 'No válido'
			]);
		} catch (ValidationException $exception) {
			return response()->json([
				'code' => 422,
				'msg'    => 'validation_error',
				'errors' => $exception->errors(),
				'description' => 'El servidor rechazó su solicitud'
			], 422);
		}
		
		//Publicar noticia
		$new = new NewsData;
		
		$new->new_title = $title;
		$new->new_content = $content;
		$new->new_owner = $cedula;
		
		$new->save();
		
		//Cargar imagenes
		$errorLogs = [];
		$imgsUploaded= null;
		$e = 0;
		if (!empty($img)){
			//Guardar cada archivo
			$i = 0;
			foreach($img as $file) {
				//Datos
				$error = [];
				$mimeType = $file->getMimeType();
				$size = $file->getSize();
				//Nombre del archivo completo
				$filenameOriginal = $file->getClientOriginalName();
				//Extension
				$extension = $file->extension();
				//Nombre solo
				$filename = explode('.', $filenameOriginal);
				$filename = $filename[0];
				
				//Verificar MIME
				$modelo = new UploadController;
				$verifyMIME = $modelo->verifyMime($mimeType, [
					'image/png',
					'image/jpeg'
				]);
				
				if (!$verifyMIME) {
					$error = [
						'type_error' => 'mime',
						'msg' => 'Solo se aceptan imagenes .png/.jpg/.jpeg'
					];
				}else if ($size / 1024 > 3072){
					//Verificar SIZE
					$error = [
						'type_error' => 'size',
						'msg' => 'El archivo supera el tamaño máximo'
					];
				}
				
				//Upload
				if (!$error) {
					//Mover archivo
					$path = Storage::disk('public')->putFileAs(
						"$dir/$new->new_id", $file, $filenameOriginal
					);
					
					//URL
					$uploadedImgDir = env('APP_URL').
					"/api/resources/$path";
					
					$imgsUploaded[$i] = $uploadedImgDir;
					$i++;
				}else {
					$errorLogs[$e] = $error;
					$e++;
				}
			}
		}
		
		//Cargar archivos
		$archivesUploaded= null;
		if (!empty($archives)){
			//Guardar cada archivo
			$i = 0;
			foreach($archives as $file) {
				//Datos
				$error = [];
				$mimeType = $file->getMimeType();
				$size = $file->getSize();
				//Nombre del archivo completo
				$filenameOriginal = $file->getClientOriginalName();
				//Extension
				$extension = $file->extension();
				//Nombre solo
				$filename = explode('.', $filenameOriginal);
				$filename = $filename[0];
				
				//Verificar MIME
				$modelo = new UploadController;
				$verifyMIME = $modelo->verifyMime($mimeType, [
					'application/vnd.ms-excel',
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheetapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					'application/pdf',
					'application/msword',
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
				]);
				
				if (!$verifyMIME) {
					$error = [
						'type_error' => 'mime',
						'msg' => 'Solo se aceptan archivos .pdf/.doc/.docx/.xlsx/.xls'
					];
				}else if ($size / 1024 > 2048){
					//Verificar SIZE
					$error = [
						'type_error' => 'size',
						'msg' => 'El archivo supera el tamaño máximo'
					];
				}
				
				//Upload
				if (!$error) {
					//Mover archivo
					$path = Storage::disk('public')->putFileAs(
						"$dir/$new->new_id", $file, $filenameOriginal
					);
					
					//Url Archive
					$uploadedArchiveDir = env('APP_URL').
					"/api/resources/$path";
					
					//excel Image
					if ($extension === "xlsx" || $extension === "xls") {
						$extensionImg = 'excel';
					}else if ($extension === "doc" || $extension === "docx"){
						//Word
						$extensionImg = 'word';
					}else {
						//PDF
						$extensionImg = 'pdf';
					}
					
					//Url icon extension
					$extensionImgUrl = env('APP_URL').
						"/api/imagenes/$extensionImg.png";
					
					$archivesUploaded[$i] = [
						'url' => $uploadedArchiveDir,
						'extension' => $extensionImgUrl
					];
					$i++;
				}else {
					$errorLogs[$e] = $error;
					$e++;
				}
			}
		}
		
		//Cargar imagenes y archivos al servidor
		$new->new_img = $imgsUploaded;
		$new->new_archives = $archivesUploaded;
		$new->save();
		
		//Log
		$Log = new Logs;
		$Log->log_cedula = $cedula;
		$Log->log_action = "Noticia #$new->new_id publicada.";
		$Log->save();
		
		//Verificar Errores
		if ($img && count($errorLogs) === count($img)) {
			return response()->json([
				'code' => 400,
				'msg' => 'new_publicate_without_img',
				'description' => 'No se pudo cargar ninguna imagen',
				'errors' => $errorLogs,
				'count' => count($img)
			], 400);
		}else if (count($errorLogs) > 0) {
			return response()->json([
				'code' => 200,
				'msg' => 'new_publicate_without_img',
				'description' => 'Algunas imagenes fueron cargadas',
				'errors' => $errorLogs
			], 200);
		}
		
		
		return response()->json([
			'code' => 200,
			'msg' => 'new_publicate',
			'description' => 'Noticia publicada'
		], 200);
	}
	
	public function publicarAnuncio()
	{
		//Config datos
		$privilegio = request()->user()->user_privilegio;
		$cedula = request()->user()->user_cedula;
		$img = request()->file('img');
		$title = request()->title;
		$content = request()->content;
		$dir = 'news';
		
		//Verificar privilegio
		if ($privilegio !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'title' => 'required|string|max:50',
				'content' => 'required'
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
		
		//Publicar noticia
		$anuncio = new AnunciosData;
		
		$anuncio->anuncio_title = $title;
		$anuncio->anuncio_content = $content;
		$anuncio->anuncio_owner = $cedula;
		
		$anuncio->save();
		
		//Log
		$Log = new Logs;
		$Log->log_cedula = $cedula;
		$Log->log_action = "Anuncio #$anuncio->anuncio_id publicado.";
		$Log->save();
		
		return response()->json([
			'code' => 200,
			'msg' => 'anuncio_publicate',
			'description' => 'Anuncio publicado'
		], 200);
	}
}
