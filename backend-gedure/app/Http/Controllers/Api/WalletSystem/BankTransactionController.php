<?php

namespace App\Http\Controllers\Api\WalletSystem;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\wallet_system\BankTransactionRequest;

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
			->orWhere('referencie', 'like', '%'.$search.'%')
			->offset($page)
			->limit($perPage)
			->get();
		
		$bank_transaction_count = BankTransaction::where('concepto', 'like', '%'.$search.'%')
			->orWhere('referencie', 'like', '%'.$search.'%')
			->count();
		
		return response()->json([
			'data' => $bank_transaction,
			'page' => request()->page * 1, 
			'totalRows' => $bank_transaction_count
		], 200);
	}
	
	public function assign(BankTransaction $bank_transaction, Request $request)
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
				'msg' => 'El usuario que seleccionรณ no existe'
			], 400);
		}
		
		// NOTA(RECKER): Asignar transferencia bancaria
		$bank_transaction->user_id = $user->id;
		$bank_transaction->save();
		
		// NOTA(RECKER): Crear transaccion
		$payload = [
			[
				'reason' => 'Verificación de transferencia bancaria',
				'amount' => $bank_transaction->amount,
			]
		];
		$transaction = $user->transactions()->create([
			'type' => 'pago verficado',
			'payload' => json_encode($payload),
			'amount' => $bank_transaction->amount,
			'previous_balance' => $user->wallet->balance,
			'payment_method' => 'transferencia o depósito bancario',
		]);
		$bank_transaction->bank_account->transactions()->save($transaction);
		
		// NOTA(RECKER): Agregar saldo
		$user->wallet->balance += $bank_transaction->amount;
		$user->save();
		
		return response()->json([
			'msg' => 'Transferencia asignada',
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
				'msg' => 'No puede eliminar una transacciรณn tomada',
			], 400);
		}
		
		$bank_transaction->delete();
		
		return response()->json([
				'msg' => 'Transacciรณn borrada',
			], 200);
	}
}