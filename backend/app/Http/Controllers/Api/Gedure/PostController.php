<?php

namespace App\Http\Controllers\Api\Gedure;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Http\Requests\TableRequest;
use App\Http\Requests\Gedure\Post\GetPostRequest;
use Illuminate\Support\Facades\Storage;

// Intervention
use Intervention\Image\Facades\Image;

// Models
use App\Models\Gedure\Post;

class PostController extends Controller
{	
	public function index(GetPostRequest $request) {
		$offset = $request->offset;
		$limit = $request->limit;
		$search = urldecode($request->search);
		
		$posts = Post::with('user:id,privilegio,username,name')
			->orderBy('id', 'Desc')
			->offset($offset)
			->limit($limit)
			->where('only_users', 0)
			->where('title', 'like', '%'.$search.'%')
			->get()
			->makeHidden([
				'portada', 
				'galery', 
				'content',
				'fecha_humano_modify', 
				'only_users',
				'updated_at',
				'url_imgs',
			]);
		
		// NOTA(RECKER): Obtener primer registro
		$firstPost = Post::where('only_users', 0)
			->where('title', 'like', '%'.$search.'%')
			->first();
		
		// NOTA(RECKER): Verificar si existe el primer registro en la query
		$finish = false;
		foreach($posts as $post) {
			if ($post->id === $firstPost->id) {
				$finish = true;
			}
		}

		// NOTA(RECKER): Verificar si hay post que mostrar.
		if (count($posts->toArray()) === 0) {
			$finish = true;
		}
		
		return response()->json([
			'data' => $posts->toArray(),
			'finish' => $finish,
		], 200);
	}
	
	public function indexAuth(GetPostRequest $request) {
		$offset = $request->offset;
		$limit = $request->limit;
		$search = urldecode($request->search);
		
		$posts = Post::with('user:id,username,name,privilegio')
			->where('title', 'like', '%'.$search.'%')
			->orderBy('id', 'Desc')
			->offset($offset)
			->limit($limit)
			->get()
			->makeHidden([
				'portada', 
				'galery', 
				'content',
				'fecha_humano_modify', 
				'only_users',
				'updated_at',
				'url_imgs',
			]);
		
		// NOTA(RECKER): Obtener primer registro
		$firstPost = Post::where('title', 'like', '%'.$search.'%')
			->first();
		
		// NOTA(RECKER): Verificar si existe el primer registro en la query
		$finish = false;
		foreach($posts as $post) {
			if ($post->id === $firstPost->id) {
				$finish = true;
			}
		}

		// NOTA(RECKER): Verificar si hay post que mostrar.
		if (count($posts->toArray()) === 0) {
			$finish = true;
		}
		
		return response()->json([
			'data' => $posts,
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
		
		// NOTA(RECKER): Cargar Portada
		if (!empty($portada)) {
			$path = $portada->storeAs(
				"posts/$post->id", 'portada_'.$portada->getClientOriginalName(), 'public'
			);
			
			// NOTA(RECKER): Optimization img
			$pathToResize = Storage::disk('public')->path($path);
			$img = Image::make($pathToResize);
			$img->save($pathToResize);
			
			$post->portada = json_encode($path);
		}
		
		// NOTA(RECKER): Cargar galeria
		$imgsUploaded = null;
		$i=0;
		if (!empty($galery)) {
			foreach($galery as $file) {
				// NOTA(RECKER): Mover archivo
				$path = $file->storeAs(
					"posts/$post->id", $file->getClientOriginalName(), 'public'
				);
				
				// NOTA(RECKER): Optimization
				$pathToResize = Storage::disk('public')->path($path);
				$img = Image::make($pathToResize);
				$img->save($pathToResize);

				$imgsUploaded[$i] = $path;
				$i++;
			}
		}
		
		$post->galery = $imgsUploaded === null ? $imgsUploaded : json_encode($imgsUploaded);
		$post->save();
		
		// NOTA(RECKER): Log
		$payload = [
			'title' => $post->title,
			'url' => '/noticias/'.$post->slug,
		];
		$user->logs()->create([
			'action' => 'Publicación creada',
			'payload' => $payload,
			'type' => 'post',
		]);
		
		return response()->json([
			'msg' => 'Publicación creada',
		], 201);
	}
	
	public function edit(PostRequest $request, Post $post)
	{
		$user = $request->user();
		$portada = $request->file('portada');
		$galery = $request->file('galery');
		$delete_galery = json_decode($request->delete_galery);
		$delete_portada = json_decode($request->delete_portada);
		
		// NOTA(RECKER): Verificar si puede modificar todas las publicaciones
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
		
		// NOTA(RECKER): Eliminar portada
		if ($delete_portada) {
			Storage::disk('public')->delete($post->portada);
			$post->portada = null;
		}
		
		// NOTA(RECKER): Eliminar galeria
		if ($delete_galery) {
			// NOTA(RECKER): Clear old files
			$filesDelete = Storage::disk('public')->files($post->id);
			$filesDelete = array_diff($filesDelete, [json_decode($post->portada)]);
			Storage::disk('public')->delete($filesDelete);
			$post->galery = null;
		}
		
		// NOTA(RECKER): Actualizar portada
		if (!empty($portada) && !$delete_portada) {
			// NOTA(RECKER): Clear files
			$portaDelete = json_decode($post->portada) ? json_decode($post->portada) : [];
			Storage::disk('public')->delete($portaDelete);
			$path = $portada->storeAs(
				"posts/$post->id", 'portada_'.$portada->getClientOriginalName(), 'public'
			);
			
			// NOTA(RECKER): Optimization
			$pathToResize = Storage::disk('public')->path($path);
			$img = Image::make($pathToResize);
			$img->save($pathToResize);
			
			$post->portada = json_encode($path);
		}
		
		// NOTA(RECKER): Actualizar galeria
		if (!empty($galery) && !$delete_galery) {
			$imgsUploaded = null;
			$i=0;
			
			// NOTA(RECKER): Clear old files excluding portada
			$filesDelete = Storage::disk('public')->files($post->id);
			$filesDelete = array_diff($filesDelete, [json_decode($post->portada)]);
			Storage::disk('public')->delete($filesDelete);
			foreach($galery as $file) {
				// NOTA(RECKER): Mover archivo
				$path = $file->storeAs(
						"posts/$post->id", $file->getClientOriginalName(), 'public'
					);
				
				// NOTA(RECKER): Optimization
				$pathToResize = Storage::disk('public')->path($path);
				$img = Image::make($pathToResize);
				$img->save($pathToResize);

				$imgsUploaded[$i] = $path;
				$i++;
			}
			
			$post->galery = $imgsUploaded === null ? $imgsUploaded : json_encode($imgsUploaded);
		}
		$post->save();
		
		// NOTA(RECKER): Log
		$payload = [
			'title' => $post->title,
			'url' => '/noticias/'.$post->slug,
		];
		$user->logs()->create([
			'action' => 'Publicación editada',
			'payload' => $payload,
			'type' => 'post',
		]);
		
		return response()->json([
			'msg' => 'Publicación modificada',
			'data' => $post,
		], 200);
	}
	
	public function destroy(Request $resquest, Post $post)
	{
		$user = $resquest->user();
		
		// NOTA(RECKER): Verificar si puede modificar todas las publicaciones
		$verify = $user->can('posts_others') ? false
			: $post->user_id !== $user->id;
		
		if ($verify) {
			return response()->json([
				'msg' => 'No tienes permisos'
			], 403);
		}
		
		Storage::disk('public')->deleteDirectory("posts/$post->id");
		
		// NOTA(RECKER): Log
		$payload = [
			'title' => $post->title,
		];
		$user->logs()->create([
			'action' => 'Publicación eliminada',
			'payload' => $payload,
			'type' => 'post',
		]);
		
		$post->delete();
		
		return response()->json([
			'msg' => 'Publicación borrada'
		], 200);
	}
	
	public function tableAdmin(TableRequest $request)
	{
		// Variables
		$user = $request->user();
		$search = urldecode($request->search);
		$perPage = $request->per_page;
		$page = $request->page * $perPage;

		// Request
		$posts = Post::with('user:id,username,privilegio')
			// Verificar si puede obtener post de otros usuarios
			->when(!$user->can('posts_others'), function ($query) use ($user) {
				$query->where('user_id', $user->id);
			})
			// Filtrador
			->where(function ($query) use ($search, $user) {
				$query->where('title', 'LIKE', "%$search%")
					->when($user->can('posts_others'), function ($query) use ($search) {
						$query->orWhereHas('user', function ($query) use ($search) {
							$query->where('username', 'LIKE', "%$search%");
						});
					});
			})
			->orderBy('id', 'Desc')
			->paginate($perPage);
		
		return response()->json([
			'data' => $posts->items(),
			'totalRows' => $posts->total(),
		], 200);
	}
}
