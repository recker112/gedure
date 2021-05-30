<?php

namespace App\Http\Controllers\Api\WalletSystem;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\wallet_system\BankTransactionRequest;
use App\Http\Requests\wallet_system\BankTransactionAssignRequest;
use App\Http\Requests\MassiveUsersRequest;

// Excel
use App\Imports\BankTransactionImport;

// Models
use App\Models\User;
use App\Models\WalletSystem\BankTransaction;
use App\Models\WalletSystem\BankAccount;
use App\Models\WalletSystem\Transaction;

class BankTransactionController extends Controller
{
	public function index(TableRequest $request)
	{
		$search = urldecode($request->search);

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$bank_transaction = BankTransaction::with('user')
			->where('concepto', 'like', '%'.$search.'%')
			->orWhere('reference', 'like', '%'.$search.'%')
			->orWhere('date', 'like', '%'.$search.'%')
			->offset($page)
			->limit($perPage)
			->orderBy('id', 'desc')
			->get();
		
		$bank_transaction_count = BankTransaction::where('concepto', 'like', '%'.$search.'%')
			->orWhere('reference', 'like', '%'.$search.'%')
			->count();
		
		return response()->json([
			'data' => $bank_transaction,
			'page' => request()->page * 1, 
			'totalRows' => $bank_transaction_count
		], 200);
	}
	
	public function assign(BankTransaction $bank_transaction, BankTransactionAssignRequest $request)
	{
		if ($bank_transaction->user) {
			return response()->json([
				'msg' => 'Esta transferencia ya fue reclamada',
			],400);
		}
		
		$user = User::with('wallet')
			->find(intVal($request->user_selected));
		
		if (!$user) {
			response()->json([
				'msg' => 'El usuario que seleccionó no existe'
			], 400);
		}
		
		// NOTA(RECKER): Asignar transferencia bancaria
		$bank_transaction->user_id = $user->id;
		$bank_transaction->save();
		
		// NOTA(RECKER): Crear transaccion
		$bank_account = $bank_transaction->bank_account;
		$payload = [
			'data' => [
				[
					'reason' => 'Verificación de transferencia bancaria',
					'amount' => $bank_transaction->amount,
				]
			],
			'extra_data' => [
				'name' => $bank_account->name,
				'code' => $bank_account->code,
				'type' => $bank_account->type
			]
		];
		$transaction = $user->transactions()->create([
			'type' => 'pago verficado',
			'payload' => json_encode($payload),
			'amount' => $bank_transaction->amount,
			'previous_balance' => $user->wallet->balance,
			'payment_method' => 'transferencia o depósito bancario',
		]);
		
		// NOTA(RECKER): Guardar relación polimorfica
		$bank_transaction->transaction()->save($transaction);
		
		// NOTA(RECKER): Agregar saldo
		$user->wallet->balance += $bank_transaction->amount;
		$user->wallet->save();
		$payload = [
			'id' => $bank_transaction->id,
			'concepto' => $bank_transaction->concepto,
			'reference' => $bank_transaction->reference,
			'amount' => $bank_transaction->amount,
			'code' => $bank_transaction->code,
			'date' => $bank_transaction->date,
			'username' => $user->username,
			'privilegio' => $user->privilegio,
		];

		$request->user()->logs()->create([
			'action' => 'Transacción bancaria asignada manualmente',
			'payload' => json_encode($payload),
			'type' => 'gedure',
		]);
		
		return response()->json([
			'msg' => 'Transacción asignada',
		],200);
	}
	
	public function upload(BankAccount $bank_account, BankTransactionRequest $request) {
		$file = $request->file('transactions');
		
		$result = (new BankTransactionImport($bank_account->id))->queue($file)->allOnQueue('high');
		
		$request->user()->logs()->create([
			'action' => 'Carga de transacciones bancarias',
			'type' => 'gedure',
		]);
		
		return response()->json([
			'msg' => 'Transacciones en progreso',
		],200);
	}
	
	public function destroy(BankTransaction $bank_transaction, $massive = false)
	{
		if ($bank_transaction->user) {
			return response()->json([
				'msg' => 'No puede eliminar una transacción reclamada',
			], 400);
		}
		
		if (!$massive) {
			$payload = [
				'id' => $bank_transaction->id,
				'concepto' => $bank_transaction->concepto,
				'reference' => $bank_transaction->reference,
				'amount' => $bank_transaction->amount,
				'code' => $bank_transaction->code,
				'date' => $bank_transaction->date,
			];

			request()->user()->logs()->create([
				'action' => 'Transacción bancaria eliminada',
				'payload' => json_encode($payload),
				'type' => 'gedure',
			]);
		}
		
		$bank_transaction->delete();
		
		return response()->json([
				'msg' => 'Transacción borrada',
			], 200);
	}
	
	public function destroyMassive(MassiveUsersRequest $request)
	{
		$ids = json_decode(urldecode($request->ids));
		$bank_transactions = BankTransaction::whereIn('id', $ids)->get();
		
		
		$i=0;
		$transactions=[];
		foreach($bank_transactions as $bank_transaction) {
			$this->destroy($bank_transaction, true);
			
			if (!$bank_transaction->exists) {
				$transactions[$i] = [
					'id' => $bank_transaction->id,
					'concepto' => $bank_transaction->concepto,
					'reference' => $bank_transaction->reference,
					'amount' => $bank_transaction->amount,
					'code' => $bank_transaction->code,
					'date' => $bank_transaction->date,
				];
				$i++;
			}
		}
		
		if (!$i) {
			return response()->json([
				'msg' => "No se ha eliminado ninguna transacción bancaria",
			], 400);
		}
		
		$payload = [
			'count' => $i,
			'transactions' => $transactions,
		];
		
		$request->user()->logs()->create([
				'action' => 'Transacciones bancarias eliminadas masivamente',
				'payload' => json_encode($payload),
				'type' => 'gedure',
			]);
		
		return response()->json([
			'msg' => "$i transacciones bancarias eliminadas",
		], 200);
	}
}