<?php

namespace Tests\Feature\Http\Controllers\Api\wallet_system;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Curso;
use App\Models\wallet_system\BankAccount;

class BankAccountControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testIndex() {
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$bank_accounts = BankAccount::factory(4)->create();
		
		$response = $this->getJson('/api/v1/bank-account?page=0&per_page=5');
		
		$response->assertOk()
			->assertJsonFragment([
				'n_account' => $bank_accounts[0]->n_account,
			])
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'n_account',
						'rif',
						'name',
						'type',
					]
				],
				'page',
				'totalRows'
			]);
	}
	
	public function testFindLike() {
		$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$bank_accounts = BankAccount::factory(10)->create();
		
		$response = $this->getJson('/api/v1/find/bank-account');
		
		$response->assertOk()
			->assertJsonStructure([
				'*' => [
					'id',
					'n_account',
					'rif',
					'name',
					'email',
					'type',
					'code',
				]
			])
			->assertJsonFragment([
				'n_account' => $bank_accounts[0]->n_account,
			]);
	}
	
	public function testCreate()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$response = $this->postJson('/api/v1/bank-account', [
			'n_account' => '03456789023475232023',
			'rif' => '40346567-1',
			'name' => 'Fundacion nuestra Sra de Candelaria',
			'email' => 'correo@web.com.ve',
			'type' => 'corriente',
			'code' => '0175',
		]);

		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
		
		$this->assertDatabaseHas('bank_accounts', [
    	'email' => 'correo@web.com.ve',
    ]);
	}
	
	public function testEdit()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);

		$bank_account = BankAccount::factory()->create();

		$response = $this->putJson('/api/v1/bank-account/'.$bank_account->id, [
			'n_account' => '03456789023475232023',
			'rif' => '40346567-1',
			'name' => 'Fundacion nuestra Sra de Candelaria',
			'email' => 'correo@web.com.ve',
			'type' => 'corriente',
			'code' => '0175',
		]);

		$response->assertOk()
		->assertJsonStructure([
			'msg'
		]);

		$this->assertDatabaseHas('bank_accounts', [
			'email' => 'correo@web.com.ve',
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

		$response = $this->deleteJson('/api/v1/bank-account/'.$bank_account->id);

		$response->assertOk()
		->assertJsonStructure([
			'msg'
		]);

		$this->assertDatabaseMissing('bank_accounts', [
			'email' => $bank_account->email,
		]);
	}
}
