<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Log;

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
						'cedula',
						'name',
						'action',
						'fecha'
					]
				],
				'page',
				'totalLogs'
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
				'data',
				'page',
				'totalLogs'
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
				'cedula' => $user->privilegio . $user->cedula
			])
			->assertJsonStructure([
				'data' => [
					'*' => [
						'cedula',
						'name',
						'action',
						'fecha'
					]
				],
				'page',
				'totalLogs'
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
				'cedula' => $user->privilegio . $user->cedula
			])
			->assertJsonStructure([
				'data',
				'page',
				'totalLogs'
			]);
	}
}
