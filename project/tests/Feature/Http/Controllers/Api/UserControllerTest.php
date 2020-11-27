<?php

namespace Tests\Feature\Http\Controller\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Alumno;

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
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->getJson('/api/v1/users?per_page=5&page=0');
		
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
	
	public function testCreateStudiant()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/users', [
			'cedula' => 'luis',
			'nombre' => 'Luis Enrrique',
			'email' => 'test@test.test',
			'privilegio' => 'V-',
			'password' => '1234',
			'curso' => '5',
			'seccion' => 'A',
			'permissions' => [
				'boletas' => true,
				'horarios' => true,
				'soporte' => true,
				'account_exonerada' => false,
			]
		]);
		
		$response->assertCreated()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('users', [
        'email' => 'test@test.test',
    ]);
	}
	
	public function testCreateAdmin()
	{
		$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/users', [
			'cedula' => 'luis',
			'nombre' => 'Luis Enrrique',
			'email' => 'test@test.test',
			'privilegio' => 'A-',
			'password' => '1234',
			'permissions' => [
				'registros_index' => true,
				'users_index' => true,
				'users_create' => true,
				'users_edit' => true,
			]
		]);
		
		$response->assertCreated()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('users', [
        'email' => 'test@test.test',
    ]);
	}
	
	public function testCreateSuperAdmin()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/users', [
			'cedula' => 'luis',
			'nombre' => 'Luis Enrrique',
			'email' => 'test@test.test',
			'privilegio' => 'A-',
			'password' => '1234',
			'super_admin' => true,
		]);
		
		$response->assertCreated()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('users', [
        'email' => 'test@test.test',
    ]);
	}
	
	public function testErrorCedulaCreateStudiant()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/users', [
			'cedula' => 'recker',
			'nombre' => 'Luis Enrrique',
			'email' => 'test@test.test',
			'privilegio' => 'V-',
			'password' => '1234',
			'permissions' => [
				'boletas' => true,
				'horarios' => true,
				'soporte' => true,
				'account_exonerada' => false,
			]
		]);
		
		$response->assertStatus(400)
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testErrorEmailUniqueCreateStudiant()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/users', [
			'cedula' => 'luis',
			'nombre' => 'Luis Enrrique',
			'email' => 'joseortiz112001@gmail.com',
			'privilegio' => 'V-',
			'password' => '1234',
			'permissions' => [
				'boletas' => true,
				'horarios' => true,
				'soporte' => true,
				'account_exonerada' => false,
			]
		]);
		
		$response->assertStatus(422)
			->assertJsonValidationErrors(['email']);
	}
	
	public function testDeleteUser()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$user = User::factory()->create([
			'privilegio' => 'V-'
		]);
		$alumno = Alumno::create([
				'curso_id' => 1,
				'user_id' => $user->id,
				'n_lista' => 99
			]);
		
		$response = $this->deleteJson('/api/v1/users/'.$user->id);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertSoftDeleted($user);	
		$this->assertDeleted($alumno);
	}
}