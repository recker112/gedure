<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Storage
use Illuminate\Support\Facades\Storage;

class GetArchivesController extends Controller
{	
	// //BOCETO PARA PRIVATISAR ARCHIVOS E IMAGENES
	// public function getAvatar($img)
	// {
	// 	//Configuración de datos
	// 	$dir = 'avatars';
		
	// 	//Verificar existencia de archivo
	// 	$missing = Storage::disk('public')->missing("$dir/$img");
	// 	if ($missing) {
	// 		return response()->json([
	// 			'code' => 400,
	// 			'msg' => 'not_exist',
	// 			'description' => 'El archivo solicitado no existe'
	// 		], 400);
	// 	}
		
	// 	//Comprovaciones varías
	// 	if ($privilegio !== 'ADMIN ROTO') {
	// 		return 'NO PUEDES VER lA imAGEN'
	// 	}
	// 	/*
	// 	¿Cómo funcionaría?
	// 	"Storage::response" es un facades el cual nos permite responder a una url con
	// 	un archivo X, bien sea una imagen o un pdf.
		
	// 	Esto puede servir para privatisar archivos, ya que al renderizar CUALQUIER
	// 	tipo de archivo, permite dejar de usar el disk public y poder usar disk
	// 	privados, siendo el controlador el que decide si mostrar la imagen o no.
		
	// 	Esto pierde la gracia al usar el disk publico, ya que cualquiera que sepa
	// 	cuál es la verdadera ruta puede ver el archivo, pero con los disk local no se
	// 	puede hacer ese truco, ya que los archivos se mantienen en el directorio
	// 	storage.
	// 	*/
	// 	//Construir archivo del disk local
	// 	$response = Storage::response("matricula/1B.xlsx");
		
	// 	//Construir imagen del disk publico
	// 	$response = Storage::disk('public')->response("avatars/test.jpeg");
	// 	return $response;
	// }
	
	public function getMatricula($file)
	{
		//Config datos
		$privilegio = request()->user()->user_privilegio;
		$dir = 'matricula';
		
		if ($privilegio !== 'A-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//Verificar que existe una extensiรณn
		if (empty($extension)) {
			$extension = "xlsx";
		}
		
		//Verificar exitencia de archivo
		$exists = Storage::exists("$dir/$file");
		if (!$exists) {
			return response()->json([
				'code' => 400,
				'msg' => 'no_exist',
				'description' => 'El archivo solicitado no existe'
			], 400);
		}
		
		return Storage::download("$dir/$file");
	}
}
