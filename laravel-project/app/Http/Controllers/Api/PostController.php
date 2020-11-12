<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
	public function index(Request $request) {
		$offset = $request->offset;
		$limit = $request->limit;
		
		$allPosts = Post::with('user')
			->orderBy('id', 'Desc')
			->offset($offset)
			->limit($limit)
			->where('only_users', 0)
			->get();
		
		//Primer registro
		$firstPost = Post::where('only_users', 0)->first();
		
		//Verificar existencia de noticias
		$finish = false;
		foreach($allPosts as $post) {
			if ($post->id === $firstPost->id) {
				$finish = true;
			}
		}
		
		return response()->json([
			'data' => $allPosts,
			'finish' => $finish,
		], 200);
	}
	
	public function indexAuth(Request $request) {
		$offset = $request->offset;
		$limit = $request->limit;
		
		$allPosts = Post::with('user')
			->orderBy('id', 'Desc')
			->offset($offset)
			->limit($limit)
			->get();
		
		//Primer registro
		$firstPost = Post::first();
		
		//Verificar existencia de noticias
		$finish = false;
		foreach($allPosts as $post) {
			if ($post->id === $firstPost->id) {
				$finish = true;
			}
		}
		
		return response()->json([
			'data' => $allPosts,
			'finish' => $finish,
		], 200);
	}
}
