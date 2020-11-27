<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Mail;
//Mails
use App\Mail\CodeSecurity;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\RecoveryPassword;

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
		$response = $this->postJson('/api/v1/login', [
			'cedula' => '', 
			'password' => ''
		]);

		$response->assertStatus(422)
			->assertJsonValidationErrors(['cedula', 'password']);
	}
	
	public function testLogin()
	{
		//$this->withoutExceptionHandling();
		$response = $this->postJson('/api/v1/login', [
			'cedula' => 'recker', 
			'password' => 'reckersito'
		]);

		$response->assertOk()
			->assertJsonPath('user.cedula', 'recker')
			->assertJsonPath('user.email', 'joseortiz112001@gmail.com')
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
						'users_index'
					]
				]
			]);
	}
	
	public function testLoginFailed()
	{
		//$this->withoutExceptionHandling();
		$response = $this->postJson('/api/v1/login', [
			'cedula' => 'recker', 
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
		for($i=0;$i < 5;$i++) {
			$response = $this->postJson('/api/v1/login', [
				'cedula' => 'recker', 
				'password' => 'MALs'
			]);
		}

		$response->assertStatus(400)
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testLogout()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::factory()->create(),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/logout');

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
		
		$response = $this->postJson('/api/v1/logoutAll');

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
		
		$response = $this->getJson('/api/v1/relogin');

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
						'users_index'
					]
				]
			]);
	}
	
	public function testRecoveryPassword()
	{
		//$this->withoutExceptionHandling();
		
		$response = $this->postJson('/api/v1/recovery-password', [
			'email' => 'joseortiz112001@gmail.com'
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testRecoveryPasswordVerifyCode()
	{
		$this->withoutExceptionHandling();
		$user = User::find(1);
		
		RecoveryPassword::factory()->create([
			'user_id' => $user->id
		]);
		
		$response = $this->postJson('/api/v1/recovery-verify', [
			'email' => 'joseortiz112001@gmail.com',
			'code' => '12345'
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testRecoveryChangePass()
	{
		//$this->withoutExceptionHandling();
		$user = User::find(1);
		
		RecoveryPassword::factory()->create([
			'user_id' => $user->id,
			'confirm' => 1,
		]);
		
		$response = $this->postJson('/api/v1/recovery-chpass', [
			'email' => 'joseortiz112001@gmail.com',
			'password' => 'Vhxdlsfers'
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}
}
