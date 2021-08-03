<?php

namespace Tests\Feature\Controllers\WalletSystem;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\WalletSystem\Transaction;

class TransactionControllerTest extends TestCase
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
		
		$user = User::factory()->create();
		$transactions = Transaction::factory(5)->create([
			'user_id' => $user->id,
		]);
		
		$response = $this->getJson('/api/v1/transaction?per_page=5&page=0');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'type',
						'amount',
						'created_at',
						'user' => [
							'username',
							'privilegio'
						]
					]
				],
				'page',
				'totalRows'
			])
			->assertJsonFragment([
				'totalRows' => 5
			]);
	}
	
	public function testIndexUser()
	{
		//$this->withoutExceptionHandling();
		$user = User::factory()->create();
		$user->wallet()->create();
		$transactions = Transaction::factory(5)->create([
			'user_id' => $user->id,
		]);
		
		Passport::actingAs(
			$user,
			['user']
		);
		
		$response = $this->getJson('/api/v1/transaction-user?per_page=5&page=0');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'type',
						'amount',
						'created_at',
					]
				],
				'page',
				'totalRows',
				'balance'
			])
			->assertJsonFragment([
				'totalRows' => 5
			]);
		
		// NOTA(RECKER): Error transacciones no tuyas
		$user = User::factory()->create();
		$user->wallet()->create();
		$transactions = Transaction::factory(5)->create([
			'user_id' => 900,
		]);
		
		Passport::actingAs(
			$user,
			['user']
		);
		
		$response = $this->getJson('/api/v1/transaction-user?per_page=5&page=0');

		$response->assertOk()
			->assertJsonFragment([
				'totalRows' => 0
			]);
	}
	
	public function testShow()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$user = User::factory()->create();
		$transactions = Transaction::factory(5)->create([
			'user_id' => $user->id,
		]);
		
		$response = $this->getJson('/api/v1/transaction/1');

		$response->assertOk()
			->assertJsonStructure([
				'id',
				'user',
				'exonerante',
				'type',
				'payload',
				'amount',
				'previous_balance',
				'payment_method',
				'exonerado',
				'created_at',
			]);
	}
	
	public function testShowUser()
	{
		//$this->withoutExceptionHandling();
		$user = User::factory()->create();
		$transactions = Transaction::factory(5)->create([
			'user_id' => $user->id,
		]);
		
		Passport::actingAs(
			$user,
			['user']
		);
		
		$response = $this->getJson('/api/v1/transaction-user/1');

		$response->assertOk()
			->assertJsonStructure([
				'id',
				'user',
				'exonerante',
				'type',
				'payload',
				'amount',
				'previous_balance',
				'payment_method',
				'exonerado',
				'created_at',
			]);
		
		// NOTA(RECKER): Error transacciones no tuyas
		$user = User::factory()->create();
		$transactions = Transaction::factory(5)->create([
			'user_id' => 900,
		]);
		
		Passport::actingAs(
			$user,
			['user']
		);
		
		$response = $this->getJson('/api/v1/transaction-user/'.$transactions[0]->id);

		$response->assertStatus(404);
	}
}
