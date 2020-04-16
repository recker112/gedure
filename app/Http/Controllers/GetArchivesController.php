<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Storage
use Illuminate\Support\Facades\Storage;

class GetArchivesController extends Controller
{
  public function getAvatar($img)
	{
		//Config datos
		$baseDir = 'dataStorage';
		$dir = 'avatars';
		
		//Verificar existencia de archivo
		$exists = Storage::disk('public')->exists("$dir/$img");
		if (!$exists) {
			return response()->json([
				'code' => 400,
				'msg' => 'not_exist',
				'description' => 'El archivo solicitado no existe'
			], 400);
		}
		
		return response()->file("$baseDir/$dir/$img");
	}
	
	public function getResourceNews($noticia, $file)
	{
		//Config datos
		$extension = request()->extension;
		$baseDir = 'dataStorage';
		$dir = 'news';
		
		//Verificar existencia de archivos
		$exists = Storage::disk('public')->exists("$dir/$noticia/$file");
		if (!$exists) {
			return response()->json([
				'code' => 400,
				'msg' => 'no_exist',
				'description' => 'El archivo solicitado no existe'
			], 400);
		}
		
		return response()->file("$baseDir/$dir/$noticia/$file");
	}
	
	public function getImg($file)
	{
		//Config datos
		$baseDir = 'dataStorage';
		$dir = 'imagenes';
		
		//Verificar que existe una extension
		if (empty($extension)) {
			$extension = "jpg";
		}
		
		$exists = Storage::disk('public')->exists("$dir/$file");
		if (!$exists) {
			return response()->json([
				'code' => 400,
				'msg' => 'no_exist',
				'description' => 'El archivo solicitado no existe'
			], 400);
		}
		
		return response()->file("$baseDir/$dir/$file");
	}
	
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
