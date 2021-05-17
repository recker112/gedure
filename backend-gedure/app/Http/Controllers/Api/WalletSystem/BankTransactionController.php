<?php

namespace App\Http\Controllers\Api\WalletSystem;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\wallet_system\BankTransactionRequest;

// Excel
use App\Imports\BankTransactionImport;

// Models
use App\Models\WalletSystem\BankTransaction;
use App\Models\WalletSystem\BankAccount;

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
}
