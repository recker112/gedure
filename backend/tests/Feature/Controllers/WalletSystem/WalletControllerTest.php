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

		$this->assertDatabaseHas('wallets', [
			'balance' => 99 - 12.43,
    ]);

		$this->assertDatabaseHas('transactions', [
			'amount' => 12.43,
    ]);
	}
}
