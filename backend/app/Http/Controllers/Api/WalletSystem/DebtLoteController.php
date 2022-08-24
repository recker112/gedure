<?php

namespace App\Http\Controllers\Api\WalletSystem;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\wallet_system\DebtRequest;
use App\Http\Requests\wallet_system\DebtLoteEditRequest;
use App\Http\Requests\FindLikeRequest;
use App\Http\Requests\TableRequest;

//Models
use App\Models\User;
use App\Models\Gedure\Curso;
use App\Models\WalletSystem\Debt;
use App\Models\WalletSystem\DebtLote;
use App\Models\WalletSystem\ExchangeRate;

// Notifications
use App\Notifications\WalletSystem\DebtCreatedNotification;

class DebtLoteController extends Controller
{
	public function index(TableRequest $request) {
		$search = urldecode($request->search);
		$perPage = $request->per_page;
		
		$debts = DebtLote::with('exchange_rate:id,type')
			->where('reason', 'like', "%$search%")
			->orWhere('id', 'like', "%$search%")
			->latest()
			->paginate($perPage);
		
		return response()->json([
			'data' => $debts->items(),
			'totalRows' => $debts->total(),
		], 200);
	}
	
	public function findUsersLike(FindLikeRequest $request) {
		$search = urldecode(request()->search);
		
		$users = User::select('id','username','name','privilegio')
			->where('privilegio', 'V-')
			->where('username', 'like', "%$search%")
			->when(boolVal($request->not_registred), function ($query) {
				$query->whereDoesntHave('debts', function (Builder $query) {
					$query->where('debt_lote_id', request()->id_lote_deuda);
				});
			})
			->when(!boolVal($request->not_registred), function ($query) {
				$query->whereHas('debts', function (Builder $query) {
					$query->where('debt_lote_id', request()->id_lote_deuda);
				});
			})
			->limit(15)
			->get()
			->makeHidden(['personal_data', 'estudiante_data']);
		
		return response()->json($users, 200);
	}
	
	public function show($id) {
		$debt = DebtLote::with('exchange_rate:id,type')
			->withCount([
				'debts',
				'debts as debts_pagas_count' => function (Builder $query) {
					$query->where('status', 'pagada');
				},
				'debts as debts_no_pagadas_count' => function (Builder $query) {
					$query->where('status', 'no pagada');
				},
				'debts as debts_reembolsados_count' => function (Builder $query) {
					$query->where('status', 'reembolsado');
				},
			])->findOrFail(intVal($id))
			->makeVisible(['updated_at'])
			->toArray();
		
		return response()->json($debt, 200);
	}
	
  public function create(DebtRequest $request) {
		$users = [];
		if ($request->type === 'cursos') {
			// NOTA(RECKER): Obtener estudiantes por curso seleccionado
			$users = User::where('privilegio', 'V-')
				->whereHas('alumno', function (Builder $query) {
					$query->whereHas('curso', function (Builder $query) {
						$query->whereIn('id', request()->cursos);
					});
				})
				->get();
		}else if ($request->type === 'selected' && $request->selected_users && count($request->selected_users) > 0) {
			// NOTA(RECKER): Obtener estudiantes seleccionados
			$users = User::where('privilegio', 'V-')
				->whereIn('id', $request->selected_users)
				->get();
		}else if ($request->type === 'all_studiends') {
			// NOTA(RECKER): Obtener todos los estudiantes
			$users = User::where('privilegio', 'V-')
				->get();
		}
		
		// NOTA(RECKER): Verificar usuarios seleccionados
		if (count($users) === 0) {
			return response()->json([
				'msg' => 'No hay usuarios seleccionados',
			], 400);
		}

		// NOTA(RECKER): Creacion del lote de deudas
		$debt_lote = new DebtLote;
		$debt_lote->reason = $request->reason;

		// NOTA(RECKER): ExchangeRate
		$amount = $request->amount_to_pay;
		if ($request->exchange_rate_type === '$') {
			$debt_lote->exchange_amount = $amount;
			
			$exrate = ExchangeRate::where('type', 'USD')->latest()->first();
			$amount = $amount * $exrate->amount;

			$debt_lote->exchange_rate_id = $exrate->id;
		}
		$debt_lote->amount_to_pay = $amount;

		$debt_lote->save();
		
		foreach($users as $user) {
			$user->debts()->create([
				'debt_lote_id' => $debt_lote->id
			]);
			$user->notify(new DebtCreatedNotification($amount));
		}
		
		// NOTA(RECKER): Log
		$payload = [
			'id' => $debt_lote->id,
			'reason' => $request->reason,
			'amount' => $amount,
		];
		$request->user()->logs()->create([
			'action' => 'Lote de deudas creado',
			'payload' => $payload,
			'type' => 'gedure'
		]);
		
		return response()->json([
			'msg' => 'Lote de deudas creada',
		], 200);
	}
	
	public function edit(DebtLoteEditRequest $request, DebtLote $debt_lote) {
		$user = $request->user();

		// NOTA(RECKER): ExchangeRate
		$amount = $request->amount_to_pay;
		if ($request->exchange_rate_type === '$' && $amount !== $debt_lote->exchange_amount) {
			$debt_lote->exchange_amount = $amount;
			
			$exrate = ExchangeRate::where('type', 'USD')->latest()->first();
			$amount = $amount * $exrate->amount;

			$debt_lote->exchange_rate_id = $exrate->id;

			$debt_lote->amount_to_pay = $amount;
		}else if ($request->exchange_rate_type === 'Bs.') {
			$debt_lote->exchange_rate_id = null;
			$debt_lote->exchange_amount = 0;

			$debt_lote->amount_to_pay = $amount;
		}
		
		$debt_lote->reason = $request->reason;
		$debt_lote->save();
		
		$debts_created=0;
		if ($user->can('debt_create') && $request->selected_users) {
			// NOTA(RECKER): Asignar deudas a cada usuario seleccionado
			$users = User::where('privilegio', 'V-')
				->whereDoesntHave('debts', function (Builder $query) use ($debt_lote) {
					$query->where('debt_lote_id', '==', $debt_lote->id);
				})
				->whereIn('id', $request->selected_users)
				->get();

			if (count($users) === 0) {
				return response()->json([
					'msg' => 'No hay usuarios seleccionados',
				], 400);
			}
				
			foreach($users as $user) {
				$user->debts()->create([
					'debt_lote_id' => $debt_lote->id,
				]);

				$user->notify(new DebtCreatedNotification($amount));
				$debts_created++;
			}
		}
		
		// NOTA(RECKER): Log
		$payload = [
			'id' => $debt_lote->id,
		];
		$request->user()->logs()->create([
			'action' => 'Lote de deudas editado',
			'payload' => $payload,
			'type' => 'gedure'
		]);
		
		if ($debts_created) {
			return response()->json([
				'msg' => 'Deudas actualizada y asignaciones completadas',
			], 200);
		}
		
		return response()->json([
			'msg' => 'Deudas actualizada',
		], 200);
	}
	
	public function delete(DebtLote $debt_lote) 
	{
		// NOTA(RECKER): Eliminar si no hay debts en el lote
		if (!count($debt_lote->debts)) {
			$debt_lote->delete();
		}
		
		$debts = Debt::where('debt_lote_id', $debt_lote->id)
			->where('status', '!=', 'no pagada')
			->count();
		
		// NOTA(RECKER): No elimiar lotes con debts pagadas o rembolsadas
		if ($debts) {
			return response()->json([
				'msg' => 'No puede eliminar este lote',
			], 400);
		}
		
		$debt_lote->delete();
		
		// NOTA(RECKER): Log
		$payload = [
			'id' => $debt_lote->id,
		];
		request()->user()->logs()->create([
			'action' => 'Lote de deudas eliminado',
			'payload' => $payload,
			'type' => 'gedure'
		]);
		
		return response()->json([
			'msg' => 'Lote de deuda eliminada',
		], 200);
	}
}
