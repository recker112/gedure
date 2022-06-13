<?php

namespace Tests\Feature\Controllers\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Mail;
//Mails
use App\Mail\CodeSecurity;
// Models
use App\Models\User;
use App\Models\Auth\RecoveryPassword;

class RecoveryPasswordControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testRecoveryPassword()
	{
		//$this->withoutExceptionHandling();
		$admin = User::find(1);
		
		Mail::fake();
		
		$response = $this->postJson('/api/v1/auth-recovery/password', [
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
		
		$response = $this->postJson('/api/v1/auth-recovery/verify', [
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
		
		$response = $this->postJson('/api/v1/auth-recovery/chpass', [
			'email' => $admin->email,
			'password' => 'CS1.6-VHL-Servers'
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}
}
