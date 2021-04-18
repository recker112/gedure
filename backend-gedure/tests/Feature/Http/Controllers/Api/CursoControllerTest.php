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
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A'
		]);
		
		$response = $this->getJson('/api/v1/curso?page=0&per_page=5');
		
		$response->assertOk()
			->assertJsonFragment([
				'curso' => '1'
			]);
	}
	
	public function testFindLikeCurso() {
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A'
		]);
		
		$response = $this->getJson('/api/v1/find/curso');
		
		$response->assertOk()
			->assertJsonStructure([
				'*' => [
					'id',
					'code',
				]
			]);
	}
	
	public function testCreateCurso() {
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/curso', [
			'curso' => '1G',
			'seccion' => 'B',
		]);
		
		$response->assertCreated()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('cursos', [
        'curso' => '1G',
    ]);
	}
	
	public function testDestroyCurso() {
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$curso = Curso::create([
			'code' => '6-A',
			'curso' => '6',
			'seccion' => 'A'
		]);
		
		$response = $this->deleteJson('/api/v1/curso/1');
		
		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testDestroyMassiveCurso() {
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Curso::create([
			'code' => '6-A',
			'curso' => '6',
			'seccion' => 'A'
		]);
		Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A'
		]);
		
		$ids = json_encode([1,2]);
		
		$response = $this->deleteJson('/api/v1/massive/curso?ids='.urlencode($ids));
		
		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}
}
