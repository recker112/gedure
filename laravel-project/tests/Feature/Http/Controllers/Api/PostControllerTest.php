<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
						'fecha_humano',
						'fecha_humano_modify'
					]
				],
				'finish'
			]);
	}
}
