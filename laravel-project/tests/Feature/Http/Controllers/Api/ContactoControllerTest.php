<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Models
use App\Models\Contacto;

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
		Contacto::create([
			'nombre' => 'Juan alcachofa',
			'telefono' => '4260394581',
			'email' => 'paco@steam.es',
			'asunto' => 'Solicitudes de cupo',
			'content' => 'Quisiera saber cuando es la apertura de la asignacion de cupos'
		]);
		
		Contacto::create([
			'nombre' => 'Juan alcachofa',
			'telefono' => '4260394581',
			'email' => 'lea@steam.es',
			'asunto' => 'Necesito hablar',
			'content' => 'Quisiera saber cuando es la apertura de la asignacion de cupos'
		]);
		
		Contacto::create([
			'nombre' => 'Juan alcachofa',
			'telefono' => '4260394581',
			'email' => 'pacts@steam.es',
			'asunto' => 'Solicitud de campos',
			'content' => 'Quisiera saber cuando es la apertura de la asignacion de cupos'
		]);
		
		$response = $this->getJson('/api/v1/contacto?page=0&per_page=5&search=Solici');

		$response->assertStatus(200)
			->assertJsonStructure([
				'data',
				'page',
				'totalLogs'
			])
			->assertJsonFragment([
				'id' => 3
			]);
	}
	
	public function testDestroyContacto()
	{
		//$this->withoutExceptionHandling();
		Contacto::create([
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
	}
	
	public function testErrorDestroyContacto()
	{
		//$this->withoutExceptionHandling();
		
		$response = $this->deleteJson('/api/v1/contacto/1');

		$response->assertStatus(404)
			->assertJsonStructure([
				'msg',
			]);
	}
}
