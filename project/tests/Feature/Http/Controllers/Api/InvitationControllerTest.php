<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

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
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/invitation/users', [
			'username' => 'luis',
			'name' => 'Luis Enrrique',
			'email' => 'test@test.test',
			'privilegio' => 'V-',
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
	
	public function testRegisterInvitation()
	{
		//$this->withoutExceptionHandling();
		$user = User::factory()->create([
			'privilegio' => 'V-',
			'password' => null,
			'actived_at' => null,
		]);
		
		$user->personalData(false)->create();
		
		$key = Str::random(40);
		$user->invitation()->create([
			'invitation_key' => $key
		]);
		
		$response = $this->postJson('/api/v1/invitation/register', [
			'key' => $key,
			'password' => 'FG$4T',
			'personalData' => [
				'madre_nombre' => 'Rhadys'
			]
		]);
		
		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('personal_data_users', [
			'madre_nombre' => 'Rhadys',
    ]);
		
		$this->assertDatabaseMissing('invitations', [
			'invitation_key' => $key,
    ]);
	}
}
