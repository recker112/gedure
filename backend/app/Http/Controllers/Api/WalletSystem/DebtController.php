<?php

namespace App\Http\Controllers\Api\WalletSystem;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\TableRequest;
use App\Http\Requests\FindLikeRequest;

//Models
use App\Models\User;
use App\Models\Gedure\Curso;
use App\Models\WalletSystem\Debt;
use App\Models\WalletSystem\DebtLote;

class DebtController extends Controller
{
	public function index(TableRequest $request) {
		$this->authorize('index', Debt::class);
		// Variables
		$user = $request->user();
		$search = urldecode($request->search);
		$perPage = $request->per_page;
		
		$debts = Debt::with(['debt_lote', 'transaction'])
			->select('debts.*','debt_lotes.available_on')
			->where('user_id', $user->id)
			->whereHas('debt_lote', function (Builder $query) use ($search) {
				$query->where('reason', 'like', "%$search%");
			})
			// Filtrador
			->when($request->future !== 'si', function ($query) {
				$query->whereHas('debt_lote',function ($query) {
					$query->where('available_on', '<=', now());
				});
			})
			->join('debt_lotes', 'debts.debt_lote_id', '=', 'debt_lotes.id')
			->orderBy('available_on', 'desc')
			->orderBy('id', 'desc')
			->paginate($perPage);

		// Ocultar datos
		$data = $debts->getCollection();
		$data->each(function ($item) {
			$item->makeHidden(['created_at', 'updated_at', 'available_on']);
			$item->makeVisible(['id']);
			$item->debt_lote->makeHidden(['id', 'created_at', 'exchange_amount', 'exchange_rate_id', 'available_on', 'fecha_creado']);
			$item->transaction?->makeHidden(['created_at','exonerado','payload','payment_method','previous_balance','type']);
		});
		$debts->setCollection($data);
		
		return response()->json([
			'data' => $debts->items(),
			'totalRows' => $debts->total(),
		], 200);
	}

	public function indexLote(TableRequest $request, $id) {
		$search = urldecode($request->search);
		$perPage = $request->per_page;
		
		$debts = Debt::with(['user:id,privilegio,username,name', 'transaction'])
			->where('debt_lote_id', $id)
			->WhereHas('user', function (Builder $query) use ($search) {
				$query->where('username', 'LIKE', "%$search%");
			})
			->paginate($perPage);

		// Ocultar datos innecesarios
		$data = $debts->getCollection();
		$data->each(function ($item) {
			$item->makeVisible(['id']);
			$item->transaction?->makeHidden(['amount', 'created_at', 'exonerado', 'payload', 'payment_method', 'previous_balance', 'type']);
			$item->user?->makeHidden(['id']);
		});
		$debts->setCollection($data);
		
		return response()->json([
			'data' => $debts->items(),
			'totalRows' => $debts->total(),
		], 200);
	}

	public function pay(Request $request, Debt $debt) {
		$this->authorize('pay', $debt);
		// Variables
		$user = $request->user();
		$reqReason = $debt->debt_lote->reason;
		$reqAmount = $debt->debt_lote->amount_to_pay;

		// Verificar estado
		if ($debt->status === 'pagada' || $debt->status !== 'no pagada') {
			return response()->json([
				'msg' => 'Deuda ya pagada',
			], 400);
		}

		// Verificar saldo
		if ($reqAmount > $user->wallet->balance) {
			return response()->json([
				'msg' => 'Saldo insuficiente',
			], 400);
		}

		// Verificar importancia
		if ($debt->debt_lote->important) {
			// Obtener todas las deudas pendientes
			$debtsPending = $user->debts()
				->with('debt_lote')
				->where('status', 'no pagada')
				->where('id', '!=', $debt->id)
				->whereHas('debt_lote', function ($query) use ($debt) {
					$query->where('available_on', '<=', $debt->debt_lote->available_on);
				})
				->count();
			
			if ($debtsPending) {
				return response()->json([
					'msg' => 'Debe estar solvente para pagar esta deuda',
				], 400);
			}
		}

		// Generar transacciones
		$id = $debt->debt_lote->id;
    $payload = [
			'actions' => [
				[
					'reason' => $reqReason." (#$id)",
					'amount' => $reqAmount,
				]
      ],
		];

		$transaction = $user->transactions()->create([
      'type' => 'deuda pagada',
			'payload' => $payload,
			'amount' => $reqAmount,
			'previous_balance' => $user->wallet->balance,
			'payment_method' => 'saldo disponible',
		]);

		// Relación polimórfica
		$debt->transaction()->save($transaction);

		// Descontar saldo
    $user->wallet->balance -= $reqAmount;
    $user->wallet->save();

		// Cambiar estado de deuda y colocar monto pagado
		$debt->status = 'pagada';
		$debt->save();

		// NOTA(RECKER): Log
		$payload = [
			'lote_reason' => $debt->debt_lote->reason,
			'lote_amount' => $debt->debt_lote->amount_to_pay,
		];
		$request->user()->logs()->create([
			'action' => "Deuda pagada",
			'payload' => $payload,
			'type' => 'debt-lote'
		]);
		
		return response()->json([
			'msg' => 'Pago procesado correctamente',
			'balance' => $user->wallet->balance,
		], 200);
	}

	public function destroy(Request $request, Debt $debt) {
		// Verificar estado
		if ($debt->status !== 'no pagada' && $debt->status !== 'futura') {
			return response()->json([
				'msg' => 'No puede borrar deudas ya pagadas',
			], 400);
		}

		// Destruir deuda
		if (!$debt->forceDelete()) {
			return response()->json([
				'msg' => 'No se pudo borrar la deuda',
			], 400);
		}

		// NOTA(RECKER): Log
		$payload = [
			'username' => $debt->user->privilegio.$debt->user->username,
			'name' => $debt->user->name,
			'lote_reason' => $debt->debt_lote->reason,
			'lote_amount' => $debt->debt_lote->amount_to_pay,
		];
		$request->user()->logs()->create([
			'action' => "Deuda eliminada",
			'payload' => $payload,
			'type' => 'debt-lote'
		]);
		
		return response()->json([
			'msg' => 'Deuda eliminada',
		], 200);
	}

	public function solvencia(FindLikeRequest $request) {
		$search = urldecode(request()->search);
		
		$users = User::select('id','username','name','privilegio')
			->withCount([
				'debts',
				'debts as debts_pagas_count' => function (Builder $query) {
					$query->where('status', 'pagada');
				},
				'debts as debts_no_pagadas_count' => function (Builder $query) {
					$query->where('status', 'no pagada');
				},
				'debts as debts_exoneradas_count' => function (Builder $query) {
					$query->where('status', 'exonerada');
				},
			])
			->with([
				'debts' => function ($query) {
					$query->select('debts.id','debts.user_id','debts.status', 'debts.debt_lote_id')
						->where('status', '=', 'no pagada')
						->join('debt_lotes', 'debts.debt_lote_id', '=', 'debt_lotes.id')
						->orderBy('debt_lotes.id', 'desc');
				},
				'debts.debt_lote' => function ($query) {
					$query->select('id','reason','amount_to_pay');
				},
			])
			->where('privilegio', 'V-')
			->where('username', 'like', "%$search%")
			->limit(15)
			->get()
			->makeVisible(['is_solvente'])
			->makeHidden(['personal_data', 'estudiante_data']);
		
		return response()->json($users, 200);
	}
}
