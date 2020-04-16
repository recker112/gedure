<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
//Modelos
use App\User;

class BoletasController extends Controller
{
  public function getBoleta()
	{
		//Config datos
		$privilegioAuth = request()->user()->user_privilegio;
		$cedulaAuth = request()->user()->user_cedula;
		$dir = 'boletas';
		
		//Verificar que sea estudiante
		if ($privilegioAuth !== 'V-') {
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		//Modelo
		$user = new User;
		
		//Buscar studiend
		$userFound = $user->searchUser($privilegioAuth, $cedulaAuth);
		
		//Datos necesarios
		$cursoUser = $userFound->curso;
		$seccionUser = $userFound->seccion;

		//Directorio del archivo
		$dirBoleta = "$dir/$cursoUser/$seccionUser/$cedulaAuth.pdf";
		
		$exist = Storage::exists($dirBoleta);
		
		if (!$exist) {
			return response()->json([
				'code' => 400,
				'msg' => 'no_exist',
				'description' => 'La boleta aún no ha sido cargada'
			], 400);
		}
		
		return Storage::download("$dirBoleta");
	}
	
	public function deleteBoletasMassive()
	{
		$privilegioAuth = request()->user()->user_privilegio;
		$cedulaAuth = request()->user()->user_cedula;
		$cursoReq = request()->curso;
		$seccionReq = request()->seccion;
		$combiCursoReq = $cursoReq.$seccionReq;
		$dir = 'boletas';
		
		//ValidateData
		try {
			//Verify pass
			$dataValidate = request()->validate([
				'curso' => 'required|string|max:5',
				'seccion' => 'required|string|max:3'
			], [
				/*
				Custom message
				GLOBAL [propiedad] = required
				ESPECIFICO [value].[propiedad] = user.required
				*/
				'required' => 'Campo obigatorio',
				'required' => 'No válido',
				'min' => 'No válido',
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
		
		if ($privilegioAuth !== 'A-'){
			return response()->json([
				'code' => 403,
				'msg' => 'no_access',
				'description' => 'No estás autorizado'
			], 403);
		}
		
		if ($seccionReq === 'all'){
			$files = Storage::allFiles("$dir/$cursoReq");
			
			$delete=0;
			foreach($files as $file){
				if (Storage::delete($file)){
					$delete++;
				}
			}
		}else {
			$files = Storage::files("$dir/$cursoReq/$seccionReq");
			
			$delete=0;
			foreach($files as $file){
				if (Storage::delete($file)){
					$delete++;
				}
			}
		}
		
		if (!count($files)){
			return response()->json([
				'code' => 400,
				'msg' => 'not_deleted_boletas',
				'description' => "No existen boletas en la seccion $combiCursoReq"
			], 400);
		}
		
		if ($delete > 1) {
			$deletedBoletas = "Se borraron $delete boletas";
		}else if ($delete === 1) {
			$deletedBoletas = "Se borró $delete boleta";
		}else {
			return response()->json([
				'code' => 400,
				'msg' => 'not_deleted_boletas',
				'description' => "No se pudo borrar ninguna boleta"
			], 400);
		}
		
		return response()->json([
			'code' => 200,
			'msg' => 'delete_boletas',
			'description' => "Se borraron $deletedBoletas"
		], 200);
	}
}
