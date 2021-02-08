<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// Models
use App\Models\Post;

class InfoBoxController extends Controller
{
  public function index(Request $request)
	{
		$user = $request->user();
		
		$post_data = [];
		$posts = Post::limit(3)->orderBy('id', 'desc')->get();
		$iP=0;
		foreach($posts as $post) {
			$post_data[$iP]['textPrimary'] = $post->title;
			$post_data[$iP]['textSecondary'] = $post->fecha_humano;
			$iP++;
		}
		$data_finish['posts'] = $post_data;
		
		if ($user->privilegio === 'V-') {
			$boleta_data = [];
			$iB=0;
			foreach($user->boletas as $boleta) {
				$boleta_data[$iB]['curso'] = $boleta->curso->curso;
				$boleta_data[$iB]['seccion'] = $boleta->curso->seccion;
				$boleta_data[$iB]['lapso'] = $boleta->lapso;
				$boleta_data[$iB]['textSecondary'] = $boleta->fecha_humano;
				$iB++;
			}
			$data_finish['boletas'] = $boleta_data;
		}
		
		return response()->json($data_finish,200);
	}
}
