<?php

namespace App\Http\Controllers\Api\WalletSystem;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\wallet_system\WalletEditRequest;

// Models
use App\Models\User;
use App\Models\WalletSystem\Wallet;
use App\Models\WalletSystem\Transaction;

class WalletController extends Controller
{
  public function index(TableRequest $request)
	{
		$search = urldecode($request->search);

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$users = User::with('wallet')
			->has('wallet')
			->where('username', 'like', '%'.$search.'%')
			->offset($page)
			->limit($perPage)
			->orderBy('id', 'desc')
			->get()
			->makeHidden(['name', 'email', 'actived_at', 'id', 'avatar']);
		
		$users_count = User::with('wallet')
			->has('wallet')
			->where('username', 'like', '%'.$search.'%')
			->count();
		
		return response()->json([
			'data' => $users,
			'page' => request()->page * 1, 
			'totalRows' => $users_count
		], 200);
	}
	
	public function edit(Wallet $wallet, WalletEditRequest $request)
	{
		$total_amount = 0.00;
		$user = $wallet->user;
		
		foreach($request->data as $action) {
			$total_amount += $action['amount'];
		}
		
		$payload = [
			'actions' => $request->data,
		];
		
		// Verificar balance negativo
		if ($wallet->balance + $total_amount < 0) {
			return response()->json([
				'msg' => 'La cuenta no puede quedar con balance negativo'
			], 400);
		}
		
		$previous_balance = $user->wallet->balance;
		$transaction = $user->transactions()->create([
			'type' => 'manual',
			'payload' => json_encode($payload),
			'amount' => $total_amount,
			'previous_balance' => $previous_balance,
			'payment_method' => 'otros',
		]);
		
		// NOTA(RECKER): Agregar saldo
		$user->wallet->balance += $total_amount;
		$user->wallet->save();
		
		// NOTA(RECKER): Logs
		$payload = [
			'actions' => $request->data,
			'username' => $user->username,
			'privilegio' => $user->privilegio,
			'amount' => $total_amount,
			'previous_balance' => $previous_balance,
		];

		$request->user()->logs()->create([
			'action' => 'Actualización de monedero manual',
			'payload' => json_encode($payload),
			'type' => 'transaction',
		]);
		
		return response()->json([
			'msg' => 'Transacción realizada'
		], 200);
	}
}
