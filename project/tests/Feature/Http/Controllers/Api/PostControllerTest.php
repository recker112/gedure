<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Post;

class PostControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testGetPosts()
	{
		//$this->withoutExceptionHandling();
		Post::factory(10)->create();
		
		$response = $this->getJson('/api/v1/posts?offset=0&limit=5');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'title',
						'content',
						'slug',
						'extracto',
						'user',
						'fecha_humano',
						'fecha_humano_modify'
					]
				],
				'finish'
			]);
	}
	
	public function testGetPostsAuth()
	{
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Post::factory(10)->create([
			'only_users' => 1
		]);
		
		$response = $this->getJson('/api/v1/posts/auth?offset=0&limit=5');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'title',
						'user',
						'slug',
						'extracto',
						'fecha_humano',
						'fecha_humano_modify'
					]
				],
				'finish'
			]);
	}
	
	public function testGetPostsBySlug()
	{
		//$this->withoutExceptionHandling();
		
		$post = Post::factory()->create([
			'title' => 'Testing de pruebas con acéntós'
		]);
		
		$response = $this->getJson('/api/v1/posts/'.$post->slug);

		$response->assertOk()
			->assertJsonStructure([
				'title',
				'content',
				'extracto',
				'slug',
				'user',
				'fecha_humano',
				'fecha_humano_modify'
			]);
	}
	
	public function testGetPostsBySlugAuth()
	{
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$post = Post::factory()->create([
			'title' => 'Testing de pruebas con acéntós',
			'only_users' => 1
		]);
		
		$response = $this->getJson('/api/v1/posts/auth/'.$post->slug);

		$response->assertOk()
			->assertJsonStructure([
				'title',
				'content',
				'slug',
				'extracto',
				'user',
				'fecha_humano',
				'fecha_humano_modify'
			]);
	}
	
	public function testErrorToGetPostsBySlugAuth()
	{
		//$this->withoutExceptionHandling();
		
		$post = Post::factory()->create([
			'title' => 'Testing de pruebas con acéntós',
			'only_users' => 1
		]);
		
		$response = $this->getJson('/api/v1/posts/auth/'.$post->slug);

		$response->assertStatus(401);
	}
	
	public function testErrorToNotFoundPost()
	{
		//$this->withoutExceptionHandling();
		
		$post = Post::factory()->create([
			'title' => 'Testing de pruebas con acéntós',
			'only_users' => 0
		]);
		
		$response = $this->getJson('/api/v1/posts/testing-allow');

		$response->assertStatus(404);
	}
	
	public function testCreatePost()
	{
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/posts', [
			'title' => 'Título de la publicación',
			'content' => 'Contenido de la publicación',
			'only_users' => 0
		]);

		$response->assertStatus(201)
			->assertJsonStructure([
				'msg',
			]);
		
		$postCreated = Post::find(1);
		
		$response = $this->getJson('/api/v1/posts/'.$postCreated->slug);
		
		$response->assertOk()
			->assertJsonStructure([
				'title',
				'content',
				'slug',
				'extracto',
				'user',
				'fecha_humano',
				'fecha_humano_modify'
			]);
	}
	
	public function testCreatePostWithImg()
	{
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::fake('post');
		
		$files = [
			UploadedFile::fake()->image('test1.png'),
			UploadedFile::fake()->image('test2.jpeg'),
			UploadedFile::fake()->image('test3.jpg')
		];
		
		$response = $this->postJson('/api/v1/posts', [
			'title' => 'testing TDD',
			'content' => 'Contenido de la publicación',
			'only_users' => 0,
			'imgs' => $files,
		]);

		$response->assertStatus(201)
			->assertJsonStructure([
				'msg',
			]);
		
		$postCreated = Post::firstWhere('slug', 'testing-tdd');
		
		Storage::disk('public')->assertExists('posts/'.$postCreated->id.'/'.$files[0]->name);
		
		//Clear files
		$filesDelete = Storage::disk('public')->allFiles('posts/'.$postCreated->id);
		Storage::disk('public')->delete($filesDelete);
		
		Storage::disk('public')->assertMissing('posts/'.$postCreated->id.'/'.$files[0]->name);
	}
	
	public function testEditPost() {
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$post = Post::factory(10)->create();
		
		// Modificar el post número 5
		$response = $this->putJson('/api/v1/posts/'.$post[4]->slug, [
			'title' => 'Título de la publicación',
			'content' => 'Contenido de la publicación',
			'only_users' => 0,
		]);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
	}
	
	public function testEditPostWithFiles() {
		$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$post = Post::factory()->create([
			'title' => 'testing TDD'
		]);
		
		Storage::fake('post');
		
		$files = [
			UploadedFile::fake()->image('test1.png'),
			UploadedFile::fake()->image('test2.jpeg'),
			UploadedFile::fake()->image('test3.jpg')
		];
		
		// Modificar el post número 5
		$response = $this->putJson('/api/v1/posts/'.$post->slug, [
			'title' => 'testing TDD',
			'content' => 'Contenido de la publicación',
			'only_users' => 0,
			'imgs' => $files,
			'imgsUpdate' => true
		]);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
		
		$postCreated = Post::firstWhere('slug', 'testing-tdd');
		
		Storage::disk('public')->assertExists('posts/'.$postCreated->id.'/'.$files[0]->name);
		
		//Clear files
		$filesDelete = Storage::disk('public')->allFiles('posts/'.$postCreated->id);
		Storage::disk('public')->delete($filesDelete);
		
		Storage::disk('public')->assertMissing('posts/'.$postCreated->id.'/'.$files[0]->name);
	}
	
	public function testErrorEditPost() {
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$post = Post::factory()->create();
		
		// Modificar el post número 5
		$response = $this->putJson('/api/v1/posts/'.$post->slug, [
			'only_users' => 0,
		]);
		
		$response->assertStatus(422)
			->assertJsonValidationErrors(['title', 'content']);
	}
	
	public function testErrorEditPostNotFound() {
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		// Modificar el post número 5
		$response = $this->putJson('/api/v1/posts/testing', [
			'title' => 'Título de la publicación',
			'content' => 'Contenido de la publicación',
			'only_users' => 0,
		]);
		
		$response->assertStatus(404);
	}
	
	public function testDeletePost() {
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::fake('post');
		
		$files = [
			UploadedFile::fake()->image('test1.png'),
			UploadedFile::fake()->image('test2.jpeg'),
			UploadedFile::fake()->image('test3.jpg')
		];
		
		$response = $this->postJson('/api/v1/posts', [
			'title' => 'test de ayer',
			'content' => 'Contenido de la publicación',
			'only_users' => 0,
			'imgs' => $files
		]);

		$response->assertStatus(201)
			->assertJsonStructure([
				'msg',
			]);
		
		$response = $this->deleteJson('/api/v1/posts/test-de-ayer');
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
	}
	
	public function testErrorDeletePostNotFount() {
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->deleteJson('/api/v1/posts/test-de-ayer');
		
		$response->assertStatus(404);
	}
	
	public function testTableAdminPost() {
		$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$post = Post::factory(5)->create([
			'user_id' => $user->id
		]);
		
		$response = $this->getJson('/api/v1/table-posts?page=0&per_page=5');
		
		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'title',
						'user',
						'slug',
						'extracto',
						'fecha_humano',
						'fecha_humano_modify',
						'url_imgs'
					]
				],
				'page',
				'totalPosts'
			]);
	}
}
