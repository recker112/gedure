<?php

namespace Tests\Feature\Controllers\WalletSystem;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

// Passport
use Laravel\Passport\Passport;

// Models
use App\Models\User;

class WalletControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testIndex()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$user = User::factory()->create([
			'privilegio' => 'V-'
		]);
		$user->wallet()->create();
		
		
		//$this->withoutExceptionHandling();
		$response = $this->getJson('/api/v1/wallet?page=0&per_page=5');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'username',
						'privilegio',
						'wallet' => [
							'id',
							'balance',
							'created_at',
							'updated_at',
						]
					]
				],
				'page',
				'totalRows'
			])
			->assertJsonFragment([
				'totalRows' => 1
			]);
	}
	
	public function testAdmin()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$user = User::factory()->create([
			'privilegio' => 'V-'
		]);
		$user->wallet()->create();
		
		$response = $this->putJson('/api/v1/wallet/'.$user->wallet->id, [
			'data' => [
				[
					'reason' => 'Pago en efectivo',
					'amount' => 4000000.00,
				],
				[
					'reason' => 'Intereses por la movida de dinero',
					'amount' => -2000000.00,
				]
			]
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
		
		// Error balance negativo
		$user->wallet->balance = 0.00;
		$user->wallet->save();
		$response = $this->putJson('/api/v1/wallet/'.$user->wallet->id, [
			'data' => [
				[
					'reason' => 'Intereses por la movida de dinero',
					'amount' => -9000000.00,
				]
			],
		]);
		
		$response->assertStatus(400)
			->assertJsonStructure([
				'msg'
			]);
	}
}
