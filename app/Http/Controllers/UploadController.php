<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\StudiendsImport;
use App\Logs;

class UploadController extends Controller
{
    public function uploadMatricula()
		{
			//Config datos
			$files = request()->file('files');
			$curso = request()->curso;
			$seccion = request()->seccion;
			//Directorio de los archivos cargados
			$dirUP = 'UPmatricula';
			//Directorio de la lista de los estudiantes cargados.
			$dirUsersUpload = 'matricula';
			
			foreach ($files as $archivo) {
				//Datos del archivo.
				$filename = $archivo->getClientOriginalName();
				$fileSize = $archivo->getSize();
        $mimeType = $archivo->getMimeType();
				
				//Obtener estudiantes del archivo
				$Studiends = (new StudiendsImport)->toArray($archivo);
			}
			
			//LOG
			$Log = new Logs;
			$Log->log_cedula = request()->user()->user_cedula;
			$Log->log_action = 'Matricula '.$curso.$seccion.' cargada.';
			$Log->save();
			return $Studiends[0];
		}
}
