<?php

namespace App\Http\Controllers\Api\WalletSystem;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\wallet_system\BankTransactionRequest;

// Excel
use App\Imports\BankTransactionImport;

// Models
use App\Models\WalletSystem\BankAccount;

class BankTransactionController extends Controller
{
	public function upload(BankAccount $bank_account, BankTransactionRequest $request) {
		$file = $request->file('transactions');
		
		
		$result = (new BankTransactionImport($bank_account->id))->queue($file)->allOnQueue('high');
		
		$request->user()->logs()->create([
			'action' => 'Carga de matricula',
			'type' => 'gedure',
		]);
		
		return response()->json([
			'msg' => 'Transacciones en progreso',
		],200);
	}
}
