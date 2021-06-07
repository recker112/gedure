<?php

namespace Tests\Feature\Controllers\WalletSystem;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

// Passport
use Laravel\Passport\Passport;

// Models
use App\Models\User;
use App\Models\WalletSystem\BankAccount;
use App\Models\WalletSystem\BankTransaction;

class PendingPaymentControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testVerify()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		$bank_account = BankAccount::factory()->create();
		$bank_transaction = BankTransaction::factory()->create([
			'bank_account_id' => $bank_account,
		]);
		
		$response = $this->postJson("/api/v1/bank-account/$bank_account->id/payment", [
			'reference' => $bank_transaction->reference,
			'amount' => $bank_transaction->amount,
			'code' => $bank_transaction->code,
			'date' => $bank_transaction->date,
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg',
				'balance',
			])
			->assertJsonFragment([
				'msg' => 'Pago verificado',
				'balance' => $bank_transaction->amount
			]);
		
		// NOTA(RECKER): Pago no existente aun
		$response = $this->postJson("/api/v1/bank-account/$bank_account->id/payment", [
			'reference' => 999999,
			'amount' => $bank_transaction->amount,
			'code' => $bank_transaction->code,
			'date' => $bank_transaction->date,
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg',
			])
			->assertJsonFragment([
				'msg' => 'Pago a verificar',
			])
			->assertJsonMissing([
				'balance'
			]);
	}
}
