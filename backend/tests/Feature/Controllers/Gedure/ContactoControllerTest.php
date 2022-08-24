<?php

namespace Tests\Feature\Controllers\Gedure;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Gedure\Contacto;

class ContactoControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testCreateMessaje()
	{
		//$this->withoutExceptionHandling();
		
		$response = $this->postJson('/api/v1/contacto', [
			'nombre' => 'Juan alcachofa',
			'email' => 'contacto@team.es',
			'telefono' => '4260394581',
			'asunto' => 'Solicitudes de cupo',
			'content' => 'Quisiera saber cuando es la apertura de la asignacion de cupos'
		]);

		$response->assertCreated()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('contactos', [
        'email' => 'contacto@team.es',
    ]);
	}
	
	public function testErrorCreateMessaje()
	{
		//$this->withoutExceptionHandling();
		
		$response = $this->postJson('/api/v1/contacto', [
			'nombre' => 'Juan alcachofa',
			'telefono' => '4260394581',
			'asunto' => 'Solicitudes de cupo',
			'content' => 'Quisiera saber cuando es la apertura de la asignacion de cupos'
		]);

		$response->assertStatus(422)
			->assertJsonValidationErrors(['email']);
	}
	
	public function testGetContactos()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$contactos = Contacto::factory(10)->create();
		
		$response = $this->getJson('/api/v1/contacto?page=0&per_page=5');

		$response->assertStatus(200)
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'nombre',
						'email',
						'telefono',
						'asunto',
						'content',
						'created_at',
					]
				],
				'totalRows'
			])
			->assertJsonFragment([
				'id' => $contactos[count($contactos) - 1]->id,
			]);
	}
	
	public function testDestroyContacto()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$message = Contacto::create([
			'nombre' => 'Juan alcachofa',
			'telefono' => '4260394581',
			'email' => 'paco@steam.es',
			'asunto' => 'Solicitudes de cupo',
			'content' => 'Quisiera saber cuando es la apertura de la asignacion de cupos'
		]);
		
		$response = $this->deleteJson('/api/v1/contacto/1');

		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
		
		$this->assertModelMissing($message);
	}
	
	public function testErrorDestroyContacto()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->deleteJson('/api/v1/contacto/1');

		$response->assertStatus(404);
	}
}
