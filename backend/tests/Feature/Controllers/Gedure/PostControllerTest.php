<?php

namespace Tests\Feature\Controllers\Gedure;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Gedure\Post;

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
						'slug',
						'user',
						'fecha_humano',
						'user',
						'url_portada',
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
						'slug',
						'user',
						'fecha_humano',
						'user',
						'url_portada',
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
				'slug',
				'user',
				'fecha_humano',
				'fecha_humano_modify',
				'created_at',
				'updated_at',
				'only_users',
				'user',
				'url_imgs',
				'url_portada',
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
				'slug',
				'user',
				'fecha_humano',
				'fecha_humano_modify',
				'created_at',
				'updated_at',
				'only_users',
				'user',
				'url_imgs',
				'url_portada',
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
		
		$this->assertDatabaseHas('posts', [
        'title' => 'Título de la publicación',
    ]);
	}
	
	public function testCreatePostWithImgs()
	{
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::fake('local');
		
		$portada = UploadedFile::fake()->image('Universidad.png');
		
		$files = [
			UploadedFile::fake()->image('test1.png'),
			UploadedFile::fake()->image('test2.jpeg'),
			UploadedFile::fake()->image('test3.jpg')
		];
		
		$response = $this->postJson('/api/v1/posts', [
			'title' => 'testing TDD',
			'content' => 'Contenido de la publicación',
			'only_users' => 0,
			'galery' => $files,
			'portada' => $portada,
		]);

		$response->assertStatus(201)
			->assertJsonStructure([
				'msg',
			]);
		
		$this->assertDatabaseHas('posts', [
        'title' => 'testing TDD',
    ]);
		
		$postCreated = Post::firstWhere('slug', 'testing-tdd');
		
		Storage::disk('public')->assertExists('posts/'.$postCreated->id.'/'.$files[0]->name);
		Storage::disk('public')->assertExists('posts/'.$postCreated->id.'/portada_'.$portada->name);
	}
	
	public function testEditPost() {
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$post = Post::factory(10)->create();
		
		$response = $this->putJson('/api/v1/posts/'.$post[4]->slug, [
			'title' => 'Título de la publicación',
			'content' => 'Contenido de la publicación',
			'only_users' => 0,
		]);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
		
		$this->assertDatabaseHas('posts', [
        'title' => 'Título de la publicación',
    ]);
	}
	
	public function testEditPostWithFiles() {
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$post = Post::factory()->create([
			'title' => 'testing TDD'
		]);
		
		Storage::fake('local');
		
		$portada = UploadedFile::fake()->image('test4.jpg');
		
		$files = [
			UploadedFile::fake()->image('test1.png'),
			UploadedFile::fake()->image('test2.jpeg'),
			UploadedFile::fake()->image('test3.jpg')
		];
		
		$response = $this->putJson('/api/v1/posts/'.$post->slug, [
			'title' => 'testing TDD',
			'content' => 'Contenido de la publicación',
			'only_users' => 0,
			'portada' => $portada,
			'galery' => $files,
		]);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
		
		$postCreated = Post::firstWhere('slug', 'testing-tdd');
		
		Storage::disk('public')->assertExists('posts/'.$postCreated->id.'/'.$files[0]->name);
		Storage::disk('public')->assertExists('posts/'.$postCreated->id.'/portada_'.$portada->name);
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
		$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Storage::fake('local');
		
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
		
		$this->assertDatabaseHas('posts', [
        'title' => 'test de ayer',
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
		
		$this->assertDatabaseMissing('posts', [
        'title' => 'test de ayer',
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
		
		$response = $this->getJson('/api/v1/table-posts?page=1&per_page=5');
		
		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'title',
						'slug',
						'id',
						'created_at',
						'user' => [
							'username',
							'privilegio',
						]
					]
				],
				'totalRows'
			]);
	}
}
