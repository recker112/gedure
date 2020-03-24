<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\NewsData;

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
				}
			
				//Preparar respuesta
				$jsonMessage = [
					'finish' => $finish,
					'data' => $dataNews
				];

        //Regresar news
        return response()->json($jsonMessage);
    }
}
