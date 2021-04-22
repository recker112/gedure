<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

// Mails
use App\Mail\Invitation as MailInvitation;

// Passport
use Laravel\Passport\Passport;

// Models
use App\Models\User;
use App\Models\Curso;

class InvitationControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testInviteUser()
	{
		$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Mail::fake();
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
		]);
		
		$response = $this->postJson('/api/v1/invitation/users', [
			'username' => 'luis',
			'name' => 'Luis Enrrique',
			'email' => 'test@test.test',
			'privilegio' => 'V-',
			'curso_id' => $curso->id,
			'permissions' => [
				'boleta_download' => true,
				'change_avatar' => true,
			]
		]);
		
		$response->assertCreated()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('users', [
        'email' => 'test@test.test',
    ]);
		
		Mail::assertQueued(MailInvitation::class);
	}
	
	public function testGetUserInvitation()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$user = User::factory()->create([
			'privilegio' => 'V-',
			'password' => null,
			'actived_at' => null,
		]);
		
		$key = Str::random(40);
		$user->invitation()->create([
			'invitation_key' => $key
		]);
		
		$response = $this->getJson('/api/v1/invitation/user/'.$key);
		
		$response->assertOk()
			->assertJsonStructure([
				'name',
				'username',
			]);
	}
	
	public function testResendInvitation()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		Mail::fake();
		
		$user = User::factory()->create([
			'privilegio' => 'V-',
			'password' => null,
			'actived_at' => null,
		]);
		
		$key = Str::random(40);
		$user->invitation()->create([
			'invitation_key' => $key
		]);
		
		$response = $this->getJson('/api/v1/invitation/resend-email/'.$user->id);
		
		$response->assertOk()
			->assertJsonStructure([
				'msg',
			]);
		
		Mail::assertQueued(MailInvitation::class);
	}
	
	public function testRegisterInvitation()
	{
		//$this->withoutExceptionHandling();
		$user = User::factory()->create([
			'privilegio' => 'V-',
			'password' => null,
			'actived_at' => null,
		]);
		
		$key = Str::random(40);
		$user->invitation()->create([
			'invitation_key' => $key
		]);
		
		$response = $this->postJson('/api/v1/invitation/register', [
			'key' => $key,
			'password' => 'FG$4T',
		]);
		
		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseMissing('invitations', [
			'invitation_key' => $key,
    ]);
	}
}
