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
			->get()
			->makeHidden(['portada', 'galery']);
		
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
			->get()
			->makeHidden(['portada', 'galery']);
		
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
			->firstOrFail()
			->makeHidden(['portada', 'galery']);
		
		return response()->json($post, 200);
	}
	
	public function showAuth($slug) {
		$post = Post::with('user')
			->orderBy('id', 'Desc')
			->where('slug', $slug)
			->firstOrFail()
			->makeHidden(['portada', 'galery']);
		
		return response()->json($post, 200);
	}
	
	public function create(PostRequest $request)
	{
		$user = $request->user();
		$galery = $request->file('galery');
		$portada = $request->file('portada');
		
		$post = new Post();
		
		$post->title = $request->title;
		$post->content = $request->content;
		$post->user_id = $user->id;
		$post->only_users = json_decode($request->only_users);
		$post->save();
		
		// Cargar portada
		if (!empty($portada)) {
			$path = $portada->storeAs(
				"$this->path/$post->id", 'portada_'.$portada->getClientOriginalName(), 'public'
			);
			
			$post->portada = json_encode($path);
		}
		
		//Cargar galeria
		$imgsUploaded = null;
		$i=0;
		if (!empty($galery)) {
			foreach($galery as $file) {
				//Mover archivo
				$path = $file->storeAs(
					"$this->path/$post->id", $file->getClientOriginalName(), 'public'
				);

				$imgsUploaded[$i] = $path;
				$i++;
			}
		}
		
		$post->galery = $imgsUploaded === null ? $imgsUploaded : json_encode($imgsUploaded);
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
		$portada = $request->file('portada');
		$galery = $request->file('galery');
		$delete_galery = json_decode($request->delete_galery);
		$delete_portada = json_decode($request->delete_portada);
		
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
		
		// Eliminar portada
		if ($delete_portada) {
			Storage::disk('public')->delete($post->portada);
			$post->portada = null;
		}
		
		// Eliminar galeria
		if ($delete_galery) {
			// Clear old files
			$filesDelete = Storage::disk('public')->files('posts/'.$post->id);
			Storage::disk('public')->delete($filesDelete);
			$post->galery = null;
		}
		
		// Actualizar portada
		if (!empty($portada) && !$delete_portada) {
			// Clear files
			Storage::disk('public')->delete($post->portada);
			$path = $portada->storeAs(
				"$this->path/$post->id", 'portada_'.$portada->getClientOriginalName(), 'public'
			);
			
			$post->portada = json_encode($path);
		}
		
		// Actualizar galeria
		if (!empty($galery) && !$delete_galery) {
			$imgsUploaded = null;
			$i=0;
			
			// Clear old files excluding portada
			$filesDelete = Storage::disk('public')->files('posts/'.$post->id);
			$filesDelete = array_diff($filesDelete, [$post->portada]);
			Storage::disk('public')->delete($filesDelete);
			foreach($galery as $file) {
				// Mover archivo
				$path = $file->storeAs(
						"$this->path/$post->id", $file->getClientOriginalName(), 'public'
					);

				$imgsUploaded[$i] = $path;
				$i++;
			}
			
			$post->galery = $imgsUploaded === null ? $imgsUploaded : json_encode($imgsUploaded);
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
				->makeHidden(['portada', 'galery'])
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
				->makeHidden(['portada', 'galery'])
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
