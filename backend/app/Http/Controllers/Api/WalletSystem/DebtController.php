<?php

namespace App\Http\Controllers\Api\WalletSystem;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\TableRequest;

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
			->where('user_id', $user->id)
			->whereHas('debt_lote', function (Builder $query) use ($search) {
				$query->where('reason', 'like', "%$search%");
			})
			->latest()
			->paginate($perPage);

		// Ocultar datos
		$data = $debts->getCollection();
		$data->each(function ($item) {
			$item->makeHidden(['created_at']);
			$item->makeVisible(['id']);
			$item->debt_lote->makeHidden(['id', 'created_at', 'exchange_amount', 'exchange_rate_id']);
			$item->transaction?->makeHidden(['amount','created_at','exonerado','payload','payment_method','previous_balance','type']);
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

		// Verificar saldo
		if ($reqAmount > $user->wallet->balance) {
			return response()->json([
				'msg' => 'Saldo insuficiente',
			], 400);
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

		// Cambiar estado de deuda
		$debt->status = 'pagada';
		$debt->save();
		
		return response()->json([
			'msg' => 'Pago procesado correctamente',
			'balance' => $user->wallet->balance,
		], 200);
	}
}
