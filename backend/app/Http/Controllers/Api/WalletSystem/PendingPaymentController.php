<?php

namespace App\Http\Controllers\Api\WalletSystem;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\wallet_system\PendingPaymentVerifyRequest;

// Models
use App\Models\WalletSystem\BankAccount;
use App\Models\WalletSystem\BankTransaction;
use App\Models\WalletSystem\PendingPayment;

class PendingPaymentController extends Controller
{
	public function index(TableRequest $request)
	{
		$search = urldecode($request->search);

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$pending_payment = PendingPayment::where('user_id', $request->user()->id)
			->where(function ($query) {
					$search = urldecode(request()->search);
					$query->where('reference', 'like', '%'.$search.'%')
						->orWhere('date', 'like', '%'.$search.'%');
				})
			->offset($page)
			->limit($perPage)
			->orderBy('id', 'desc')
			->get();
		
		$pending_payment_count = PendingPayment::where('reference', 'like', '%'.$search.'%')
			->orWhere('date', 'like', '%'.$search.'%')
			->count();
		
		return response()->json([
			'data' => $pending_payment,
			'page' => request()->page * 1, 
			'totalRows' => $pending_payment_count
		], 200);
	}
	
  public function verify(BankAccount $bank_account, PendingPaymentVerifyRequest $request)
	{
		$user = $request->user();
		
		$bank_transaction = BankTransaction::doesntHave('user')
			->where(function ($query) use ($request) {
				$query->where('concepto', 'like', "%$request->reference")
					->orWhere('reference', 'like', "%$request->reference");
			})
			->where('amount', $request->amount)
			->where('code', $request->code)
			->where('date', $request->date)
			->first();
		
		if (!$bank_transaction) {
			PendingPayment::create([
				'bank_account_id' => $bank_account->id,
				'user_id' => $user->id,
				'reference' => $request->reference,
				'amount' => $request->amount,
				'code' => $request->code,
				'date' => $request->date,
			]);
			
			return response()->json([
				'msg' => 'Pago a verificar'
			], 200);
		}
		
		// NOTA(RECKER): Asignar transaccion bancaria
		$bank_transaction->user_id = $user->id;
		$bank_transaction->save();
		
		// NOTA(RECKER): Armar payload
		$payload = [
			'actions' => [
				[
					'reason' => "Transferencia bancaria #$bank_transaction->id verificada",
					'amount' => $bank_transaction->amount,
				]
			],
			'extra_data' => [
				'name' => $bank_account->name,
				'rif' => $bank_account->rif,
				'n_account' => $bank_account->n_account,
				'code' => $bank_account->code,
				'type' => $bank_account->type
			]
		];

		// NOTA(RECKER): Crear transaccion
		$transaction = $user->transactions()->create([
			'type' => 'pago verificado',
			'payload' => $payload,
			'amount' => $bank_transaction->amount,
			'previous_balance' => $user->wallet->balance,
			'payment_method' => 'transferencia o depósito bancario',
		]);
		
		// NOTA(RECKER): Guardar relacion polimorfica
		$bank_transaction->transaction()->save($transaction);
		
		// NOTA(RECKER): Agregar saldo
		$user->wallet->balance += $bank_transaction->amount;
		$user->wallet->save();
		
		// NOTA(RECKER): Log
		$payload = [
			'id' => $bank_transaction->id,
			'concepto' => $bank_transaction->concepto,
			'reference' => $bank_transaction->reference,
			'amount' => $bank_transaction->amount,
			'code' => $bank_transaction->code,
			'date' => $bank_transaction->date,
		];

		$request->user()->logs()->create([
			'action' => 'Transacción bancaria reclamada',
			'payload' => $payload,
			'type' => 'transaction',
		]);
		
		return response()->json([
			'msg' => 'Pago verificado',
			'balance' => $user->wallet->balance,
		], 200);
	}
	
	public function delete($id, Request $request)
	{
		$pending_payment = PendingPayment::where('user_id', $request->user()->id)
			->where('id', $id)
			->firstOrFail();
		
		$pending_payment->delete();
		
		return response()->json([
			'msg' => 'Pago pendiente eliminado',
		], 200);
	}
}