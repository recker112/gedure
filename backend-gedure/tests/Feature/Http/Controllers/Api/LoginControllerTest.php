<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;
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
		$response = $this->postJson('/api/v1/login', [
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
		$response = $this->postJson('/api/v1/login', [
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
			$response = $this->postJson('/api/v1/login', [
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
				'username' => $user->username,
				'email' => $user->email,
			])
			->assertJsonStructure([
				'user' => [
					'id',
					'username',
					'name',
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
		$admin = User::find(1);
		
		Mail::fake();
		
		$response = $this->postJson('/api/v1/recovery-password', [
			'email' => $admin->email,
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
		
		Mail::assertQueued(CodeSecurity::class);
	}
	
	public function testRecoveryPasswordVerifyCode()
	{
		//$this->withoutExceptionHandling();
		$admin = User::find(1);
		
		RecoveryPassword::factory()->create([
			'user_id' => $admin->id
		]);
		
		$response = $this->postJson('/api/v1/recovery-verify', [
			'email' => $admin->email,
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
		$admin = User::find(1);
		
		RecoveryPassword::factory()->create([
			'user_id' => $admin->id,
			'confirm' => 1,
		]);
		
		$response = $this->postJson('/api/v1/recovery-chpass', [
			'email' => $admin->email,
			'password' => 'CS1.6-VHL-Servers'
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}
}
