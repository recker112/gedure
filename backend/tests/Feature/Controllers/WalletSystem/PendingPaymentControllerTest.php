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
use App\Models\WalletSystem\PendingPayment;

class PendingPaymentControllerTest extends TestCase
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
		$user = User::find(1);
		Passport::actingAs(
			$user,
			['admin']
		);
		
		$bank_account = BankAccount::factory()->create();
		$pending_payment = PendingPayment::factory(5)->create([
			'bank_account_id' => $bank_account->id,
			'user_id' => $user->id,
		]);
		
		$response = $this->getJson("/api/v1/pending-payment?page=1&per_page=5");
		
		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'reference',
						'amount',
						'code',
						'date',
						'status',
					]
				],
				'totalRows'
			])
			->assertJsonFragment([
				'totalRows' => 5,
			]);
	}
	
	public function testVerify()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		$bank_account = BankAccount::factory()->create();
		$bank_transaction = BankTransaction::factory()->create([
			'bank_account_id' => $bank_account->id,
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
			'reference' => 99999999,
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
	
	public function testDelete()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$bank_account = BankAccount::factory()->create();
		$pending_payment = PendingPayment::factory()->create([
			'bank_account_id' => $bank_account->id,
		]);
		
		$response = $this->deleteJson("/api/v1/pending-payment/".$pending_payment->id);

		$response->assertOk()
			->assertJsonStructure([
				'msg',
			]);
		
		// NOTA(RECKER): Pago pendiente no tuyo
		$pending_payment = PendingPayment::factory()->create([
			'bank_account_id' => $bank_account->id,
			'user_id' => 2,
		]);
		$response = $this->deleteJson("/api/v1/pending-payment/".$pending_payment->id);

		$response->assertStatus(404);
	}
}
