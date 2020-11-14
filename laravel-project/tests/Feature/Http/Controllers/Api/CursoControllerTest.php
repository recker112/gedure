<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\Curso;
use App\Models\User;

class CursoControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testGetCursos() {
		$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Curso::create([
			'code' => '1-A',
			'name' => '1',
			'seccion' => 'A'
		]);
		
		$response = $this->getJson('/api/v1/curso?page=0&per_page=5');
		
		$response->assertOk()
			->assertJsonFragment([
				'name' => '1'
			]);
	}
	
	public function testCreateCurso() {
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/curso', [
			'name' => '1G',
			'seccion' => 'B',
		]);
		
		$response->assertCreated()
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testDestroyCurso() {
		$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->deleteJson('/api/v1/curso/1');
		
		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}
}
