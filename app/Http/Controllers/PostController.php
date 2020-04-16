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
	
	public function getNewsForSearch()
	{
		//Preparar datos
		$privilegio = request()->user()->user_privilegio;
		$owner = request()->user()->user_cedula;
		
		if ($privilegio !== 'A-' && $privilegio !== 'CR-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		$newsFound = [];
		$news = new NewsData;
		if ($privilegio === 'A-') {
			$newsFound = $news->select('new_id as id')
				->orderBy('id', 'DESC')
				->get();
		}else {
			$newsFound = $news->select('new_id as id')
				->where('new_owner', $owner)
				->orderBy('id', 'DESC')
				->get();
		}

		//Regresar news
		return response()->json($newsFound);
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
	
	public function getAnunciosForSearch()
	{
		//Preparar datos
		$privilegio = request()->user()->user_privilegio;
		$owner = request()->user()->user_cedula;
		
		if ($privilegio !== 'A-' && $privilegio !== 'CR-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		$anunciosFound = [];
		$anuncios = new AnunciosData;
		if ($privilegio === 'A-') {
			$anunciosFound = $anuncios->select('anuncio_id as id')
				->orderBy('id', 'DESC')
				->get();
		}else {
			$anunciosFound = $anuncios->select('anuncio_id as id')
				->where('anuncio_owner', $owner)
				->orderBy('id', 'DESC')
				->get();
		}

		//Regresar news
		return response()->json($anunciosFound);
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
		if ($privilegio !== 'A-' && $privilegio !== 'CR-') {
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
					Storage::disk('public')->putFileAs(
						"$dir/$new->new_id", $file, $filenameOriginal
					);
					
					//URL
					$url = Storage::disk('public')
						->url("$dir/$new->new_id/$filenameOriginal");
					
					$imgsUploaded[$i] = $url;
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
					Storage::disk('public')->putFileAs(
						"$dir/$new->new_id", $file, $filenameOriginal
					);
					
					$url = Storage::disk('public')
						->url("$dir/$new->new_id/$filenameOriginal");
					
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
					$urlExtension = Storage::disk('public')
						->url("imagenes/$extensionImg.png");
					
					$archivesUploaded[$i] = [
						'url' => $url,
						'extension' => $urlExtension
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
		if ($privilegio !== 'A-' && $privilegio !== 'CR-') {
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
	
	public function delNews($id)
	{
		//Datos
		$cedula = request()->user()->user_cedula;
		$privilegio = request()->user()->user_privilegio;
		$id = json_decode($id);
		$jsonSend = request()->jsonSend;
		
		if ($privilegio !== 'A-' && $privilegio !== 'CR-'){
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		$news = new NewsData;
		
		$errorLogs = [];
		$e = 0;
		$deleted = 0;
		if ($jsonSend) {
			foreach ($id as $post){
				$error = [];
				$newFound = $news->find($post->id);
				
				if (!$newFound) {
					$error = [
						'id' => $post->id,
						'msg' => 'post_not_found',
						'description' => 'La noticia que quiere eliminar no existe'
					];
				}
				
				if (!$error && $privilegio === 'A-') {
					$newFound->delete();
					$deleted++;
				}else {
					if (!$error && $newFound->new_owner === $cedula) {
						$newFound->delete();
						$deleted++;
					}else {
						//Verificar que no exista un error anterior
						if (!$error) {
							$error = [
								'id' => $post->id,
								'msg' => 'not_your_post',
								'description' => 'La noticia que quiere eliminar no es tuya'
							];
						}
					}
				}
				
				if ($error) {
					$errorLogs[$e] = $error;
					$e++;
				}
			}
		}else {
			$newFound = $news->find($id);
		
			if (!$newFound) {
				return response()->json([
					'code' => 400,
					'msg' => 'post_not_owner',
					'description' => 'La noticia que quiere eliminar no existe'
				], 400);
			}

			if ($privilegio === 'A-'){
				$newFound->delete();
			}else {
				if ($newFound->new_owner === $cedula) {
					$newFound->delete();
				}else {
					return response()->json([
						'code' => 400,
						'msg' => 'not_your_post',
						'description' => 'La noticia que quiere eliminar no es tuya'
					], 400);
				}
			}
		}
		
		//Message
		$text = '';
		if ($jsonSend && count($errorLogs) === 0){
			//Si se eliminaron todas las noticias
			$text = 'Todas las noticias selecionadas fueron eliminadas';
		}else if ($jsonSend && count($id) === count($errorLogs)){
			//Si no se eliminó ninguna noticias
			return response()->json([
				'code' => 400,
				'msg' => 'not_deleted',
				'description' => 'No se pudo eliminar ninguna noticia',
				'errors' => $errorLogs
			], 400);
		}else if ($jsonSend && count($id) > count($errorLogs)){
			//Si se eliminó alguna noticia
			return response()->json([
				'code' => 400,
				'msg' => 'not_all_deleted',
				'description' => 'No se pudieron eliminar todas las noticias',
				'errors' => $errorLogs
			], 400);
		}else if (!$jsonSend) {
			$text = 'Noticia eliminada';
		}
		
		return response()->json([
			'code' => 200,
			'msg' => 'delete_post',
			'description' => $text,
			'errors' => $errorLogs
		], 200);
	}
	
	public function delAnuncios($id)
	{
		//Datos
		$cedula = request()->user()->user_cedula;
		$privilegio = request()->user()->user_privilegio;
		$id = json_decode($id);
		$jsonSend = request()->jsonSend;
		
		if ($privilegio !== 'A-' && $privilegio !== 'CR-'){
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		$anuncio = new AnunciosData;
		
		$errorLogs = [];
		$e = 0;
		$deleted = 0;
		
		if ($jsonSend) {
			
			foreach ($id as $post){
				$error = [];
				$anunciosFound = $anuncio->find($post->id);
				
				if (!$anunciosFound) {
					$error = [
						'id' => $post->id,
						'msg' => 'post_not_found',
						'description' => 'El anuncio que quiere eliminar no existe'
					];
				}
				
				if (!$error && $privilegio === 'A-') {
					$anunciosFound->delete();
					$deleted++;
				}else {
					if (!$error && $anunciosFound->anuncio_owner === $cedula) {
						$anunciosFound->delete();
						$deleted++;
					}else {
						//Verificar que no exista un error anterior
						if (!$error) {
							$error = [
								'id' => $post->id,
								'msg' => 'not_your_post',
								'description' => 'El anuncio que quiere eliminar no es tuyo'
							];
						}
					}
				}
				
				if ($error) {
					$errorLogs[$e] = $error;
					$e++;
				}
			}
		}else {
			$anunciosFound = $anuncio->find($id);
		
			if (!$anunciosFound) {
				return response()->json([
					'code' => 400,
					'msg' => 'post_not_owner',
					'description' => 'El anuncio que quiere eliminar no existe'
				], 400);
			}

			if ($privilegio === 'A-'){
				$anunciosFound->delete();
			}else {
				if ($anunciosFound->new_owner === $cedula) {
					$anunciosFound->delete();
				}else {
					return response()->json([
						'code' => 400,
						'msg' => 'not_your_post',
						'description' => 'El anuncio que quiere eliminar no es tuyo'
					], 400);
				}
			}
		}
		
		//Message
		$text = '';
		if ($jsonSend && count($errorLogs) === 0){
			//Si se eliminaron todas las noticias
			$text = 'Todos los anuncios selecionadas fueron eliminados';
		}else if ($jsonSend && count($id) === count($errorLogs)){
			//Si no se eliminó ninguna noticias
			return response()->json([
				'code' => 400,
				'msg' => 'not_deleted',
				'description' => 'No se pudo eliminar ningún anuncio',
				'errors' => $errorLogs
			], 400);
		}else if ($jsonSend && count($id) > count($errorLogs)){
			//Si se eliminó alguna noticia
			return response()->json([
				'code' => 400,
				'msg' => 'not_all_deleted',
				'description' => 'No se pudieron eliminar todos los anuncios',
				'errors' => $errorLogs
			], 400);
		}else if (!$jsonSend) {
			$text = 'Anuncio eliminado';
		}
		
		return response()->json([
			'code' => 200,
			'msg' => 'delete_post',
			'description' => $text,
			'errors' => $errorLogs
		], 200);
	}
}
