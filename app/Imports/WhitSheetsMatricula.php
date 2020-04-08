<?php

namespace App\Imports;

//Excel
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\WithConditionalSheets;
use Maatwebsite\Excel\Concerns\Importable;
use App\Notifications\ImportHasFailedNotification;
//Necesarios
use App\Imports\StudiendsImport;

class WhitSheetsMatricula implements WithMultipleSheets, SkipsUnknownSheets
{
	use WithConditionalSheets;
	use Importable;
	/**
	* @param Collection $collection
	*/
	public function conditionalSheets(): array
	{
		//Config secciones
		$cursos = ['1','2','3','4','5','6','1G','2G','3G','4G','5G','6G'];
		$secciones = ['A','B','C','U'];
		
		//bucle
		for($i=0; $i < count($cursos); $i++){
			for($o=0; $o < count($secciones); $o++){
				$dataCursos[$cursos[$i].$secciones[$o]] = new StudiendsImport();
			}
		}
		
		//Regresar
		return $dataCursos;
	}
	
	public function onUnknownSheet($sheetName)
	{
		// E.g. you can log that a sheet was not found.
		info("La hoja {$sheetName} no fue encontrada");
	}
}
