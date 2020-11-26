<?php

namespace Tests\Feature\Http\Controller\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;

class UserControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testGetTableUsers()
	{
		$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->getJson('/api/v1/table-users?per_page=5&page=0');
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'data' => [
					'*' => [
						'cedula',
						'nombre',
						'privilegio',
						'email',
						'avatar',
					]
				],
				'page',
				'totalUsers'
			]);
	}
}
