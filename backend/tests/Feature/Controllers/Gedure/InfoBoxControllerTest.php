<?php

namespace Tests\Feature\Controllers\Gedure;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Gedure\Post;
use App\Models\Gedure\Curso;

class InfoBoxControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testGetInfoStudiend()
	{
		//$this->withoutExceptionHandling();
		$user = User::factory()->create([
			'privilegio' => 'V-'
		]);
		
		Passport::actingAs(
			$user,
			['user']
		);
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
		]);
		Post::factory(10)->create();
		$user->boletas()->create([
			'curso_id' => $curso->id,
			'boleta' => 'test',
			'lapso' => '1'
		]);
		
		$response = $this->getJson('/api/v1/info-box');

		$response->assertStatus(200)
			->assertJsonStructure([
				'posts' => [
					'*' => [
						'textPrimary',
						'textSecondary',
					]
				],
				'boletas' => [
					'*' => [
						'curso',
						'seccion',
						'lapso',
						'textSecondary',
					]
				],
			]);
	}
	
	public function testGetInfoAdmin()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->getJson('/api/v1/info-box');

		$response->assertStatus(200)
			->assertJsonStructure([
				'posts' => [
					'*' => [
						'textPrimary',
						'textSecondary',
					]
				],
			]);
	}
}
