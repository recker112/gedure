<?php

namespace Tests\Feature\Controllers\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;

class LoginControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testLoginValidation()
	{
		//$this->withoutExceptionHandling();
		$response = $this->postJson('/api/v1/auth/login', [
			'username' => '', 
			'password' => ''
		]);

		$response->assertStatus(422)
			->assertJsonValidationErrors(['username', 'password']);
	}
	
	public function testLogin()
	{
		//$this->withoutExceptionHandling();
		$admin = User::find(1);
		$response = $this->postJson('/api/v1/auth/login', [
			'username' => $admin->username, 
			'password' => '1234'
		]);

		$response->assertOk()
			->assertJsonPath('user.username', $admin->username)
			->assertJsonPath('user.email', $admin->email)
			->assertJsonStructure([
				'access_key',
				'user' => [
					'id',
					'username',
					'name',
					'privilegio',
					'avatar',
					'email',
					'personal_data',
					'alumno',
				],
				'permissions' => [
					'administrar' => [
						'users_index'
					]
				]
			]);
	}
	
	public function testLoginFailed()
	{
		//$this->withoutExceptionHandling();
		$admin = User::find(1);
		$response = $this->postJson('/api/v1/auth/login', [
			'username' => $admin->username, 
			'password' => 'MALssjdahsd'
		]);

		$response->assertStatus(400)
			->assertJson([
				'msg' => 'Usuario y/o contraseña incorrecta'
			]);
	}
	
	public function testLoginBlockAccount()
	{
		//$this->withoutExceptionHandling();
		$admin = User::find(1);
		for($i=0;$i < 5;$i++) {
			$response = $this->postJson('/api/v1/auth/login', [
				'username' => $admin->username, 
				'password' => 'MALs'
			]);
		}

		$response->assertStatus(400)
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('blocks', [
      'user_id' => $admin->id,
			'attemps' => 5,
    ]);
	}
	
	public function testLogout()
	{
		$this->withoutExceptionHandling();
		Passport::actingAs(
			User::factory()->create(),
			['admin']
		);
		
		$response = $this->getJson('/api/v1/auth/logout');

		$response->assertOk()
			->assertJson([
				'msg' => 'Sesión cerrada'
			]);
	}
	
	public function testLogoutAll()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::factory()->create(),
			['admin']
		);
		
		$response = $this->getJson('/api/v1/auth/logout/all');

		$response->assertOk()
			->assertJson([
				'msg' => 'Sesiones cerradas'
			]);
	}
	
	public function testRelogin()
	{
		//$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->getJson('/api/v1/auth/relogin');

		$response->assertOk()
			->assertJsonFragment([
				'username' => $user->username,
				'email' => $user->email,
			])
			->assertJsonStructure([
				'user' => [
					'id',
					'username',
					'name',
					'privilegio',
					'avatar',
					'email',
					'personal_data',
					'alumno',
				],
				'permissions' => [
					'administrar' => [
						'users_index'
					]
				]
			]);
	}
}
