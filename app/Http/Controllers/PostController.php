<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\NewsData;
use App\AnunciosData;
use Carbon\Carbon;

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
}
