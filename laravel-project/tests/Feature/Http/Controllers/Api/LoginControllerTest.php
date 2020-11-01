<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\AdminConfig;

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
		$response = $this->postJson('/api/login', [
			'cedula' => '', 
			'password' => ''
		]);

		$response->assertStatus(422)
			->assertJsonValidationErrors(['cedula', 'password']);
	}
	
	public function testLogin()
	{
		//$this->withoutExceptionHandling();
		$response = $this->postJson('/api/login', [
			'cedula' => 'recker', 
			'password' => 'reckersito'
		]);

		$response->assertOk()
			->assertJsonPath('user.cedula', 'recker')
			->assertJsonPath('user.email', 'recker@testing.test')
			->assertJsonStructure([
				'access_key',
				'user' => [
					'id',
					'cedula',
					'nombre',
					'privilegio',
					'avatar',
					'email',
				],
				'permissions' => [
					'administrar' => [
						'user_ver'
					]
				]
			]);
	}
	
	public function testLoginFailed()
	{
		//$this->withoutExceptionHandling();
		$response = $this->postJson('/api/login', [
			'cedula' => 'recker', 
			'password' => 'MALssjdahsd'
		]);

		$response->assertStatus(400)
			->assertJson([
				'msg'=>'credentials_error',
				'description' => 'Usuario y/o contraseña incorrecta'
			]);
	}
	
	public function testLoginBlockAccount()
	{
		//$this->withoutExceptionHandling();
		for($i=0;$i < 5;$i++) {
			$response = $this->postJson('/api/login', [
				'cedula' => 'recker', 
				'password' => 'MALs'
			]);
		}

		$response->assertStatus(400)
			->assertJsonFragment([
				'msg'=>'account_block',
			]);
	}
	
	public function testLogout()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::factory()->create(),
			['admin']
		);
		
		$response = $this->postJson('/api/logout');

		$response->assertOk()
			->assertJson([
				'msg'=>'logout',
				'description' => 'Sesión cerrada'
			]);
	}
	
	public function testLogoutAll()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::factory()->create(),
			['admin']
		);
		
		$response = $this->postJson('/api/logoutAll');

		$response->assertOk()
			->assertJson([
				'msg'=>'logout_all',
				'description' => 'Sesiones cerradas'
			]);
	}
	
	public function testRelogin()
	{
		$this->withoutExceptionHandling();
		$user = Passport::actingAs(
			User::factory()->create(),
			['admin']
		);
		
		AdminConfig::factory()->create([
			'user_id' => $user->id,
		]);
		
		$response = $this->postJson('/api/relogin');

		$response->assertOk()
			->assertJsonFragment([
				'cedula' => $user->cedula,
				'email' => $user->email,
			])
			->assertJsonStructure([
				'user' => [
					'id',
					'cedula',
					'nombre',
					'privilegio',
				],
				'permissions' => [
					'administrar' => [
						'user_ver'
					]
				]
			]);;
	}
}
