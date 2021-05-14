<?php

namespace App\Http\Controllers\Api\Gedure;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// Models
use App\Models\Gedure\Post;

class InfoBoxController extends Controller
{
  public function index(Request $request)
	{
		$user = $request->user();
		$data_finish = [];
		
		// RECKER(NOTA): Obtener últimos posts
		$posts = Post::limit(3)->orderBy('id', 'desc')->get();
		$data_finish['posts'] = [];
		$iP=0;
		foreach($posts as $post) {
			$data_finish['posts'][$iP]['textPrimary'] = $post->title;
			$data_finish['posts'][$iP]['textSecondary'] = $post->fecha_humano;
			$iP++;
		}
		
		// RECKER(NOTA): Obtener datos solo para estudiantes
		if ($user->privilegio === 'V-') {
			$data_finish['boletas'] = [];
			$iB=0;
			foreach($user->boletas as $boleta) {
				$data_finish['boletas'][$iB]['curso'] = $boleta->curso->curso;
				$data_finish['boletas'][$iB]['seccion'] = $boleta->curso->seccion;
				$data_finish['boletas'][$iB]['lapso'] = $boleta->lapso;
				$data_finish['boletas'][$iB]['textSecondary'] = $boleta->fecha_humano;
				$iB++;
			}
		}
		
		return response()->json($data_finish,200);
	}
}
