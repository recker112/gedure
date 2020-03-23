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
        $maxNews = request()->max;
        $offset = request()->offset;

        //Verificar empty variables
        if (!$maxNews) {
            $maxNews = 5;
        }

        if (!$offset) {
            $offset = 0;
        }

        //Preparar respuesta
        $dataNews = $news->getNews($maxNews, $offset);

        //Regresar news
        return $dataNews;
    }
}
