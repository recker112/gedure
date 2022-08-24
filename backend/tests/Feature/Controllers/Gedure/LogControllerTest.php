<?php

namespace Tests\Feature\Controllers\Gedure;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Gedure\Log;

class LogControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testGetAllLogs()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$logs = Log::factory(10)->create([
			'user_id' => 1
		]);
		
		$response = $this->getJson('/api/v1/logs?per_page=5&page=1');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'action',
						'payload',
						'type',
						'created_at',
						'date_format',
						'user' => [
							'id',
							'username',
							'privilegio',
							'name'
						],
					]
				],
				'totalRows'
			]);
	}
	
	public function testGetLogsVoid()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$logs = Log::factory(10)->create([
			'user_id' => 1
		]);
		
		$response = $this->getJson('/api/v1/logs?per_page=5&page=5');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [],
				'totalRows'
			]);
	}
	
	public function testGetLogsByType()
	{
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$logs = Log::factory(10)->create([
			'user_id' => 1,
			'type' => 'gedure'
		]);
		
		$response = $this->getJson('/api/v1/logs?per_page=5&page=1&type=gedure');

		$response->assertOk()
			->assertJsonFragment([
				'type' => 'gedure',
			])
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'action',
						'payload',
						'type',
						'created_at',
						'date_format',
						'user' => [
							'id',
							'username',
							'privilegio',
							'name'
						],
					]
				],
				'totalRows'
			]);
	}
	
	public function testGetLogsByTypeAndSearch()
	{
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$logs = Log::factory(10)->create([
			'user_id' => 1,
			'type' => 'gedure'
		]);
		
		$logs = Log::factory()->create([
			'user_id' => 1,
			'type' => 'gedure',
			'action' => 'Test'
		]);
		
		$response = $this->getJson('/api/v1/logs?per_page=10&page=0&type=gedure&search=test');
		
		$response->assertOk()
			->assertJsonFragment([
				'type' => 'gedure',
				'action' => 'Test',
			])
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'action',
						'payload',
						'type',
						'created_at',
						'date_format',
						'user' => [
							'id',
							'username',
							'privilegio',
							'name'
						],
					]
				],
				'totalRows'
			]);
	}
}
