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
use App\Models\Gedure\Boleta;
use App\Models\Gedure\Curso;

class GedureConfigControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testGetConfigs()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->getJson('/api/v1/gc');

		$response->assertStatus(200)
			->assertJsonFragment([
				'name' => 'gc_mensualidad',
			]);
	}

	public function testSetConfigs()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/gc', [
			'gc_mensualidad' => 10,
			'gc_inscripción' => 5,
		]);

		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			])
			->assertJsonFragment([
				'msg' => 'Configuración actualizada'
			]);

		$this->assertDatabaseHas('gedure_configs', [
        'value' => 10,
    ]);
	}
}
