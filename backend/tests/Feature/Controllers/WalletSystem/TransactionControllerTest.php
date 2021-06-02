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
}
