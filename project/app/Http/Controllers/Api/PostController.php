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
		$search = urldecode($request->search);
		
		$allPosts = Post::with('user')
			->orderBy('id', 'Desc')
			->offset($offset)
			->limit($limit)
			->where('only_users', 0)
			->where('title', 'like', '%'.$search.'%')
			->get();
		
		//Primer registro
		$firstPost = Post::where('only_users', 0)
			->where('title', 'like', '%'.$search.'%')
			->first();
		
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
		$search = urldecode($request->search);
		
		$allPosts = Post::with('user')
			->where('title', 'like', '%'.$search.'%')
			->orderBy('id', 'Desc')
			->offset($offset)
			->limit($limit)
			->get();
		
		//Primer registro
		$firstPost = Post::where('title', 'like', '%'.$search.'%')
			->first();
		
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
			->firstOrFail();
		
		return response()->json($post, 200);
	}
	
	public function showAuth($slug) {
		$post = Post::with('user')
			->orderBy('id', 'Desc')
			->where('slug', $slug)
			->firstOrFail();
		
		return response()->json($post, 200);
	}
	
	public function create(PostRequest $request)
	{
		$user = $request->user();
		$imgs = $request->file('imgs');
		
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
			'msg' => 'Noticia creada',
		], 201);
	}
	
	public function edit(PostRequest $request, $slug)
	{
		$user = $request->user();
		$imgs = $request->file('imgs');
		$imgsUpdate = json_decode($request->imgs_update);
		
		$post = Post::where('slug', $slug)
			->firstOrFail();
		
		// Verificar si puede modificar todas las publicaciones
		$verify = $user->can('posts_others') ? false
			: $post->user_id !== $user->id;
		
		if ($verify) {
			return response()->json([
				'msg' => 'No tienes permisos'
			], 403);
		}
		
		$post->title = $request->title;
		$post->content = $request->content;
		$post->only_users = json_decode($request->only_users);
		
		//Cargar imรกgenes
		$imgsUploaded = null;
		$i=0;
		if ($imgsUpdate && !empty($imgs)) {
			// Clear old files
			$filesDelete = Storage::disk('public')->allFiles('posts/'.$post->id);
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
			'msg' => 'Noticia modificada',
			'data' => $post,
		], 200);
	}
	
	public function destroy(Request $resquest, $slug)
	{
		$user = $resquest->user();
		
		$post = Post::where('slug', $slug)
			->firstOrFail();
		
		// Verificar si puede modificar todas las publicaciones
		$verify = $user->can('posts_others') ? false
			: $post->user_id !== $user->id;
		
		if ($verify) {
			return response()->json([
				'msg' => 'No tienes permisos'
			], 403);
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
			'msg' => 'Noticia borrada'
		], 200);
	}
	
	public function tableAdmin(TableRequest $request)
	{
		$user = $request->user();
		
		$search = urldecode($request->search);

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		if ($user->can('posts_others')) {
			$allPosts = Post::with('user')
				->whereHas('user', function ($query) {
					$search = request()->search;
					$query->where('username', 'LIKE', "%$search%");
				})
				->orWhere('title', 'LIKE', "%$search%")
				->orWhere('created_at', 'LIKE', "%$search%")
				->orderBy('id', 'Desc')
				->offset($page)
				->limit($perPage)
				->get()
				->toArray();
			
			//Total de logs
			$post_count = Post::with('user')
				->where(function ($query) {
					$search = request()->search;
					$query->where('title', 'LIKE', "%$search%")
						->orWhere('created_at', 'LIKE', "%$search%");
				})
				->count();
		}else {
			$allPosts = Post::with('user')
				->where('user_id', $user->id)
				->where(function ($query) {
					$search = request()->search;
					$query->where('title', 'LIKE', "%$search%")
						->orWhere('created_at', 'LIKE', "%$search%")
						->whereHas('user', function ($query) {
							$search = request()->search;
							$query->where('cedula', 'LIKE', "%$search%");
						});
				})
				->orderBy('id', 'Desc')
				->offset($page)
				->limit($perPage)
				->get()
				->toArray();
			
			//Total de logs
			$post_count = Post::with('user')
				->where('user_id', $user->id)
				->where(function ($query) {
					$search = request()->search;
					$query->where('title', 'LIKE', "%$search%")
						->orWhere('created_at', 'LIKE', "%$search%")
						->whereHas('user', function ($query) {
							$search = request()->search;
							$query->where('username', 'LIKE', "%$search%");
						});
				})
				->count();
		}
		
		return response()->json([
			'data' => $allPosts,
			'page' => request()->page * 1, 
			'totalPosts' => $post_count
		], 200);
	}
}
