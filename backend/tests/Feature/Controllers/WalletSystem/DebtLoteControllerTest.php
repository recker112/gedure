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

class DebtLoteControllerTest extends TestCase
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
		
		$deuda_lote = DebtLote::create([
			'reason' => 'Test1',
			'amount_to_pay' => 5,
			'exchange_rate_type' => 'USD',
		]);
		
		$deuda_lote2 = DebtLote::create([
			'reason' => 'Test2',
			'amount_to_pay' => 400000,
			'exchange_rate_type' => 'Bs.S',
		]);
		
		$response = $this->getJson('/api/v1/deuda/lote?per_page=5&page=0');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'reason',
						'amount_to_pay',
						'exchange_rate_type',
						'amount_to_pay_exchange',
						'created_at'
					]
				],
				'page',
				'totalRows'
			]);
	}
	
	public function testFindLikeUser() {
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
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
		}
		
		$deuda_lote = DebtLote::create([
			'reason' => 'Test',
			'amount_to_pay' => 400,
			'exchange_rate_type' => 'Bs.S',
		]);
		$id = $deuda_lote->id;
		
		Debt::create([
			'user_id' => $users[9]->id,
			'debt_lote_id' => $id,
		]);
		
		$response = $this->getJson("/api/v1/find/deudas-users?id_lote_deuda=$id&not_registred=1");
		
		$response->assertOk()
			->assertJsonStructure([
				'*' => [
					'id',
					'username',
					'name',
					'privilegio',
				]
			]);
	}
	
	public function testCreateDebt()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
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
		}
		
		$response = $this->postJson('/api/v1/deuda/lote', [
			'reason' => 'Mensualidad Abril 2021',
			'amount_to_pay' => 600000.93,
			'exchange_rate_type' => 'Bs.S',
			'type' => 'cursos',
			'cursos' => [1],
		]);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
		
		$response = $this->postJson('/api/v1/deuda/lote', [
			'reason' => 'Mensualidad Abril 2022',
			'amount_to_pay' => 1.9,
			'exchange_rate_type' => 'USD',
			'type' => 'cursos',
			'cursos' => [1],
		]);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
	}
	
	public function testCreateDebtWithUsersSelected()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
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
		}
		
		$response = $this->postJson('/api/v1/deuda/lote', [
			'reason' => 'Mensualidad Abril 2021',
			'amount_to_pay' => 600000.93,
			'type' => 'selected',
			'exchange_rate_type' => 'Bs.S',
			'selected_users' => [$users[0]->id, $users[1]->id, $users[2]->id]
		]);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
	}
	
	public function testShow()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$this->testCreateDebt();
		
		$response = $this->getJson('/api/v1/deuda/lote/1');

		$response->assertOk()
			->assertJsonStructure([
				'id',
				'reason',
				'amount_to_pay',
				'amount_to_pay_exchange',
				'exchange_rate_type',
				'created_at',
				'updated_at',
				'debts_count',
				'debts_pagas_count',
				'debts_no_pagadas_count',
				'debts_reembolsados_count'
			]);
	}
	
	public function testEdit()
	{
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
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
		}
		
		$debt_lote = DebtLote::create([
			'reason' => 'Test',
			'amount_to_pay' => 40000,
			'exchange_rate_type' => 'Bs.S'
		]);
		
		$response = $this->putJson('/api/v1/deuda/lote/'.$debt_lote->id, [
			'reason' => 'Nuevo motivo',
			'new_price' => 700.30,
			'selected_users' => [$users[0]->id,$users[1]->id,$users[2]->id]
		]);
		
		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testDelete(){
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
		]);
		
		$debt_lote = DebtLote::create([
			'reason' => 'Test',
			'amount_to_pay' => 40000,
			'exchange_rate_type' => 'Bs.S'
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

			$user->debts()->create([
				'debt_lote_id' => $debt_lote->id,
			]);
		}
		
		$response = $this->deleteJson('/api/v1/deuda/lote/'.$debt_lote->id);
		
		$response->assertOk()
			->assertJsonStructure([
				'msg'
			]);
	}
	
	public function testErrorDelete(){
		//$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
		]);
		
		$debt_lote = DebtLote::create([
			'reason' => 'Test',
			'amount_to_pay' => 40000,
			'exchange_rate_type' => 'Bs.S'
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

			$user->debts()->create([
				'debt_lote_id' => $debt_lote->id,
				'status' => 'pagada',
			]);
		}
		
		$response = $this->deleteJson('/api/v1/deuda/lote/'.$debt_lote->id);
		
		$response->assertStatus(400)
			->assertJsonStructure([
				'msg'
			]);
	}
}
