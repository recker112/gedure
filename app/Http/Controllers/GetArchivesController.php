<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Storage
use Illuminate\Support\Facades\Storage;

class GetArchivesController extends Controller
{
  public function getImg($dir, $img)
	{
		//Config datos
		$extension = request()->extension;
		$baseDir = 'dataStorage';
		
		//Verificar que existe una extensiรณn
		if (empty($extension)) {
			$extension = "jpg";
		}
		
		$exists = Storage::disk('public')->exists("$dir/$img.$extension");
		if (!$exists) {
			return response()->json([
				'code' => 400,
				'msg' => 'no_exist',
				'description' => 'El archivo solicitado no existe'
			], 400);
		}
		
		return response()->file("$baseDir/$dir/$img.$extension");
	}
	
	public function getMatricula($file)
	{
		//Config datos
		$privilegio = request()->user()->user_privilegio;
		$extension = request()->extension;
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
		$exists = Storage::exists("$dir/$file.$extension");
		if (!$exists) {
			return response()->json([
				'code' => 400,
				'msg' => 'no_exist',
				'description' => 'El archivo solicitado no existe'
			], 400);
		}
		
		return Storage::download("$dir/$file.$extension");
	}
}
