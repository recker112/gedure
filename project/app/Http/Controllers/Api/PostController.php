<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Http\Requests\TableRequest;
use Illuminate\Support\Facades\Storage;

// Models
use App\Models\Post;
use App\Models\Log;

class PostController extends Controller
{
	private $path = "posts";
	
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
	
	public function show($slug) {
		$post = Post::with('user')
			->orderBy('id', 'Desc')
			->where('slug', $slug)
			->where('only_users', 0)
			->first();
		
		if (!$post) {
			return response()->json([
				'msg' => 'Post not found'
			], 404);
		}
		
		return response()->json($post, 200);
	}
	
	public function showAuth($slug) {
		$post = Post::with('user')
			->orderBy('id', 'Desc')
			->firstWhere('slug', $slug);
		
		if (!$post) {
			return response()->json([
				'msg' => 'Post not found'
			], 404);
		}
		
		return response()->json($post, 200);
	}
	
	public function create(PostRequest $request)
	{
		$user = $request->user();
		$imgs = $request->file('imgs');
		
		if (!$user->config()->post_modify) {
			return response([
				'msg'=>'not_permissions',
				'description' => 'No tienes permisos'
			])->json($jsonMessage, 403);
		}
		
		$post = new Post();
		
		$post->title = $request->title;
		$post->content = $request->content;
		$post->user_id = $user->id;
		$post->only_users = json_decode($request->only_users);
		$post->save();
		
		//Cargar imรกgenes
		$imgsUploaded = null;
		$i=0;
		if (!empty($imgs)) {
			foreach($imgs as $file) {
				//Mover archivo
				$path = $file->storeAs(
						"$this->path/$post->id", $file->getClientOriginalName(), 'public'
					);

				$imgsUploaded[$i] = $path;
				$i++;
			}
		}
		
		$post->imgs = $imgsUploaded === null ? $imgsUploaded : json_encode($imgsUploaded);
		$post->save();
		
		//Log
		Log::create([
			'user_id' => $user->id,
			'action' => 'Noticia #'.$post->id.' creada.',
			'type' => 'user'
		]);
		
		return response()->json([
			'msg' => 'Post publicated',
		], 201);
	}
	
	public function edit(PostRequest $request, $slug)
	{
		$user = $request->user();
		$imgs = $request->file('imgs');
		$imgsUpdate = json_decode($request->imgsUpdate);
		
		$post = Post::firstWhere('slug', $slug);
		
		// Verificar si puede modificar todas las publicaciones
		$verify = $user->config()->post_modify_otros ? false
			: $post->user_id !== $user->id;
		
		if ($verify) {
			return response([
				'msg'=>'not_permissions',
				'description' => 'No tienes permisos'
			])->json($jsonMessage, 403);
		}
		
		if (!$post) {
			return response()->json([
				'msg' => 'Post not found'
			], 404);
		}
		
		$post->title = $request->title;
		$post->content = $request->content;
		$post->only_users = json_decode($request->only_users);
		
		//Cargar imรกgenes
		$imgsUploaded = null;
		$i=0;
		if ($imgsUpdate && !empty($imgs)) {
			// Clear old files
			$filesDelete = Storage::disk('public')->allFiles('posts/1');
			Storage::disk('public')->delete($filesDelete);
			foreach($imgs as $file) {
				//Mover archivo
				$path = $file->storeAs(
						"$this->path/$post->id", $file->getClientOriginalName(), 'public'
					);

				$imgsUploaded[$i] = $path;
				$i++;
			}
		}
		if ($imgsUpdate) {
			$post->imgs = $imgsUploaded === null ? $imgsUploaded : json_encode($imgsUploaded);
		}
		$post->save();
		
		//Log
		Log::create([
			'user_id' => $user->id,
			'action' => 'Noticia #'.$post->id.' modificada.',
			'type' => 'user'
		]);
		
		return response()->json([
			'msg' => 'Post modificated',
			'data' => $post,
		], 200);
	}
	
	public function destroy(Request $resquest, $slug)
	{
		$user = $resquest->user();
		
		$post = Post::firstWhere('slug', $slug);
		
		// Verificar si puede modificar todas las publicaciones
		$verify = $user->config()->post_modify_otros ? false
			: $post->user_id !== $user->id;
		
		if ($verify) {
			return response([
				'msg'=>'not_permissions',
				'description' => 'No tienes permisos'
			])->json($jsonMessage, 403);
		}
		
		if (!$post) {
			return response()->json([
				'msg' => 'Post not found'
			], 404);
		}
		
		Storage::disk('public')->deleteDirectory("$this->path/$post->id");
		
		//Log
		Log::create([
			'user_id' => $user->id,
			'action' => 'Noticia #'.$post->id.' borrada.',
			'type' => 'user'
		]);
		
		$post->delete();
		
		return response()->json([
			'msg'=>'notice_deleted',
			'description' => 'Noticia borrada correctamente'
		], 200);
	}
	
	public function tableAdmin(TableRequest $request)
	{
		$user = $request->user();
		
		if (!$user->config()->post_modify) {
			return response([
				'msg'=>'not_permissions',
				'description' => 'No tienes permisos'
			])->json($jsonMessage, 403);
		}
		
		$search = $request->search;

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		if ($user->config()->post_modify_otros) {
			$allPosts = Post::with('user')
				->whereHas('user', function ($query) {
					$search = request()->search;
					$query->where('cedula', 'LIKE', "%$search%");
				})
				->orWhere('created_at', 'LIKE', "%$search%")
				->orderBy('id', 'Desc')
				->offset($page)
				->limit($perPage)
				->get()
				->toArray();
		}else {
			$allPosts = Post::with('user')
				->where('user_id', $user->id)
				->where(function ($query) {
					$search = request()->search;
					$query->where('title', 'LIKE', "%$search%")
						->orWhere('created_at', 'LIKE', "%$search%");
				})
				->orderBy('id', 'Desc')
				->offset($page)
				->limit($perPage)
				->get()
				->toArray();
		}
		
		//Total de logs
		$post_count = Post::count();
		
		return response()->json([
			'data' => $allPosts,
			'page' => request()->page * 1, 
			'totalPosts' => $post_count
		], 200);
	}
}
