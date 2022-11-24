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
			'amount_to_pay' => 40,
			'exchange_amount' => 4,
			'exchange_rate_id' => 1,
			'available_on' => now(),
		]);
		
		$deuda_lote2 = DebtLote::create([
			'reason' => 'Test1',
			'amount_to_pay' => 40,
			'exchange_amount' => 4,
			'exchange_rate_id' => 1,
			'available_on' => now(),
		]);
		
		$response = $this->getJson('/api/v1/deuda/lote?per_page=5&page=1');

		$response->assertOk()
			->assertJsonStructure([
				'data' => [
					'*' => [
						'id',
						'reason',
						'amount_to_pay',
						'available_on',
						'exchange_amount',
						'exchange_rate',
						'created_at',
						'important',
						'reason',
					]
				],
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
			'amount_to_pay' => 40,
			'available_on' => now(),
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
		$this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);

		Notification::fake();
		
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
			'exchange_rate_type' => 'Bs.',
			'type' => 'cursos',
			'cursos' => [1],
		]);

		Notification::assertCount(10);
		
		$response->assertStatus(200)
			->assertJsonStructure([
				'msg',
			]);
		
		$response = $this->postJson('/api/v1/deuda/lote', [
			'reason' => 'Mensualidad Abril 2022',
			'amount_to_pay' => 1.9,
			'exchange_rate_type' => '$',
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

		Notification::fake();
		
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
			'exchange_rate_type' => 'Bs.',
			'selected_users' => [$users[0]->id, $users[1]->id, $users[2]->id]
		]);

		Notification::assertCount(3);
		
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
				'created_at',
				'updated_at',
				'debts_count',
				'debts_pagas_count',
				'debts_no_pagadas_count',
			]);
	}
	
	public function testEdit()
	{
		// $this->withoutExceptionHandling();
		Passport::actingAs(
			User::find(1),
			['admin']
		);

		Notification::fake();
		
		$curso = Curso::create([
			'code' => '1-A',
			'curso' => '1',
			'seccion' => 'A',
		]);

		// NOTA(RECKER): Crear debts
		$debt_lote = DebtLote::create([
			'reason' => 'Test',
			'amount_to_pay' => 40,
			'available_on' => now(),
		]);

		$debt_lote2 = DebtLote::create([
			'reason' => 'Test',
			'amount_to_pay' => 40,
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

			$user->debts()->create([
				'debt_lote_id' => $debt_lote2->id,
			]);
		}
		
		$response = $this->putJson('/api/v1/deuda/lote/'.$debt_lote->id, [
			'reason' => 'Nuevo motivo',
			'amount_to_pay' => 700.30,
			'exchange_rate_type' => 'Bs.',
			'type' => 'selected',
			'selected_users' => [$users[0]->id,$users[1]->id,$users[2]->id]
		]);

		Notification::assertCount(3);
		
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
			'amount_to_pay' => 40,
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
			'amount_to_pay' => 40,
			'exchange_amount' => 4,
			'exchange_rate_id' => 1,
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
