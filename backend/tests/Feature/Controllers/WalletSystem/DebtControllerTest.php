<?php

namespace Tests\Feature\Controllers\WalletSystem;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// Passport
use Laravel\Passport\Passport;
// Models
use App\Models\User;
use App\Models\Gedure\Curso;
use App\Models\WalletSystem\DebtLote;
use App\Models\WalletSystem\Debt;

class DebtControllerTest extends TestCase
{
	use RefreshDatabase;
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function createDebts() {
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
		]);
		
		$debt_lote = DebtLote::create([
			'reason' => 'Test',
			'amount_to_pay' => 40000,
			'available_on' => now(),
		]);
		
		// Users creator
		$users = User::factory(10)->create([
			'privilegio' => 'V-',
		]);
		foreach($users as $user) {
			$user->alumno()->create([
				'n_lista' => 99,
				'curso_id' => $curso->id,
			]);

			$user->wallet()->create([
				'balance' => 99999999
			]);

			$user->debts()->create([
				'debt_lote_id' => $debt_lote->id,
			]);
		}
	}
	
	public function testIndexLote()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$this->createDebts();
		
		$response = $this->getJson('/api/v1/deuda/lote/1/users?per_page=5&page=1');
		
		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'status',
						'created_at',
						'updated_at',
						'user' => [
							'privilegio',
							'username',
							'name'
						],
						'transaction',
					]
				],
				'totalRows'
			]);
	}

	public function testIndex()
	{
		//$this->withoutExceptionHandling();
		$this->createDebts();
		Passport::actingAs(
			User::find(2),
			['user']
		);
		
		$response = $this->getJson('/api/v1/deuda?per_page=5&page=1');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'status',
						'debt_lote' => [
							'reason',
							'amount_to_pay',
							'important'
						],
						'transaction',
					]
				],
				'totalRows'
			]);
	}

	public function testPay()
	{
		//$this->withoutExceptionHandling();
		$this->createDebts();
		Passport::actingAs(
			User::find(2),
			['user']
		);
		
		$response = $this->postJson('/api/v1/deuda/pay/1');

		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}

	public function testVerifySolvencia()
	{
		$this->withoutExceptionHandling();
		$this->createDebts();
		Passport::actingAs(
			User::find(1),
			['admin']
		);

		$studiend = User::find(2);
		
		$response = $this->getJson('/api/v1/deuda/solvencia?search='.urlencode($studiend->username));

		$response->assertOk()
			->assertJsonStructure([
				'0' => [
					'id',
					'username',
					'debts',
					'privilegio',
					'debts_count',
				]
			])
			->assertJsonFragment([
				'debts_no_pagadas_count' => "1",
				'debts_count' => "1",
				'is_solvente' => false,
				'reason' => 'Test',
			]);;
	}
}
