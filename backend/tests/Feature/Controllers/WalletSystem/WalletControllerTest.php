<?php

namespace Tests\Feature\Controllers\WalletSystem;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\WalletSystem\Transaction;

// Notifications
use App\Notifications\WalletSystem\TransferCompletedNotification;

class WalletControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testVerifyTransfer()
	{
		//$this->withoutExceptionHandling();
		$user = User::find(1);
		Passport::actingAs(
			$user,
			['admin']
		);

		// Agregar saldo
		$user->wallet->balance = 99;
		$user->wallet->save();
		
		$otherUser = User::factory()->create();

		$response = $this->postJson('/api/v1/wallet/transfer/verify', [
			'username' => $otherUser->username,
			'amount_to_transfer' => 12.43,
		]);

		$response->assertOk()
			->assertJsonStructure([
				'name',
				'curso',
			]);
	}

	public function testConfirmTransfer()
	{
		//$this->withoutExceptionHandling();
		$user = User::find(1);
		Passport::actingAs(
			$user,
			['admin']
		);

		Notification::fake();

		// Agregar saldo
		$user->wallet->balance = 99;
		$user->wallet->save();
		
		$otherUser = User::factory()->create();
		$otherUser->wallet()->create();

		$response = $this->postJson('/api/v1/wallet/transfer/confirm', [
			'username' => $otherUser->username,
			'password' => '1234',
			'amount_to_transfer' => 12.43,
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg',
				'balance'
			]);

		Notification::assertSentTo(
			[$otherUser], TransferCompletedNotification::class
		);

		$this->assertDatabaseHas('wallets', [
			'balance' => 99 - 12.43,
    ]);

		$this->assertDatabaseHas('transactions', [
			'amount' => 12.43,
    ]);
	}

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
		
		$response = $this->getJson('/api/v1/wallet?per_page=5&page=1');

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
				'totalRows'
			])
			->assertJsonFragment([
				'totalRows' => 2
			]);
	}

	public function testEdit()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);

		Notification::fake();
		
		$user = User::factory()->create([
			'privilegio' => 'V-'
		]);
		$user->wallet()->create();
		
		$response = $this->postJson('/api/v1/wallet/'.$user->wallet->id, [
			'data' => [
				[
					'reason' => 'Pago en efectivo',
					'amount' => 400.00,
				],
				[
					'reason' => 'Intereses por la movida de dinero',
					'amount' => -200.00,
				]
			]
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);

		Notification::assertSentTo(
			[$user], TransferCompletedNotification::class
		);
		
		// Error balance negativo
		$user->wallet->balance = 0.00;
		$user->wallet->save();
		$response = $this->postJson('/api/v1/wallet/'.$user->wallet->id, [
			'data' => [
				[
					'reason' => 'Intereses por la movida de dinero',
					'amount' => -900.00,
				]
			],
		]);
		
		$response->assertStatus(400)
			->assertJsonStructure([
				'msg'
			]);
	}
}
