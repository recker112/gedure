<?php

namespace App\Http\Controllers\Api\WalletSystem;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;

// PDF
use PDF;

// Models
use App\Models\User;
use App\Models\WalletSystem\Transaction;

class TransactionController extends Controller
{
	public function index(TableRequest $request)
	{
		$search = urldecode($request->search);

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$transaction = Transaction::with('user:id,username,privilegio')
			->where('created_at', 'like', '%'.$search.'%')
			->orWhere('id', 'like', '%'.$search.'%')
			->orWhereHas('user', function (Builder $query) {
					$search = request()->search;
					$query->where('username', 'LIKE', "%$search%");
				})
			->offset($page)
			->limit($perPage)
			->orderBy('id', 'desc')
			->get()
			->makeHidden(['payload','previous_balance', 'payment_method', 'exonerado']);
		
		$transaction_count = Transaction::where('created_at', 'like', '%'.$search.'%')
			->orWhere('id', 'like', '%'.$search.'%')
			->orWhereHas('user', function (Builder $query) {
					$search = request()->search;
					$query->where('username', 'LIKE', "%$search%");
				})
			->count();
		
		return response()->json([
			'data' => $transaction,
			'page' => request()->page * 1, 
			'totalRows' => $transaction_count
		], 200);
	}
	
	public function indexUser(TableRequest $request)
	{
		$user = $request->user();
			
		$search = urldecode($request->search);

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$transaction = Transaction::where('user_id', $user->id)
			->where(function ($query){
				$search = urldecode(request()->search);
				$query->where('created_at', 'like', '%'.$search.'%')
				->orWhere('id', 'like', '%'.$search.'%')
				->orWhereHas('user', function (Builder $query) {
						$search = request()->search;
						$query->where('username', 'LIKE', "%$search%");
					});
			})
			->offset($page)
			->limit($perPage)
			->orderBy('id', 'desc')
			->get()
			->makeHidden(['payload','previous_balance', 'payment_method', 'exonerado']);
		
		$transaction_count = Transaction::where('user_id', $user->id)
			->where(function ($query){
				$search = urldecode(request()->search);
				$query->where('created_at', 'like', '%'.$search.'%')
				->orWhere('id', 'like', '%'.$search.'%')
				->orWhereHas('user', function (Builder $query) {
						$search = request()->search;
						$query->where('username', 'LIKE', "%$search%");
					});
			})
			->count();
		
		return response()->json([
			'data' => $transaction,
			'page' => request()->page * 1, 
			'totalRows' => $transaction_count,
			'balance' => $user->wallet->balance,
		], 200);
	}
	
	public function show($id)
	{
		$transaction = Transaction::with(['user:id,username,privilegio,name', 'exonerante:id,username,privilegio,name'])
			->findOrFail(intVal($id));
		
		return response()->json($transaction, 200);
	}
	
	public function showUser($id)
	{
		$transaction = Transaction::with(['user:id,username,privilegio,name', 'exonerante:id,username,privilegio,name'])
			->where('user_id', request()->user()->id)
			->where('id', $id)
			->firstOrFail();
		
		return response()->json($transaction, 200);
	}
	
	public function download($id)
	{
		$transaction = Transaction::with(['user:id,username,privilegio,name', 'exonerante:id,username,privilegio,name'])
			->findOrFail(intVal($id));
		
		$pdf = PDF::loadView('pdf.transactionPDF', [
				'transaction' => $transaction
			]);
		
		return $pdf->download("transaccion_$transaction->id.pdf");
	}
	
	public function downloadUser($id)
	{
		$transaction = Transaction::with(['user:id,username,privilegio,name', 'exonerante:id,username,privilegio,name'])
			->where('user_id', request()->user()->id)
			->where('id', $id)
			->firstOrFail();
		
		$pdf = PDF::loadView('pdf.transactionPDF', [
				'transaction' => $transaction
			]);
		
		return $pdf->download("transaccion_$transaction->id.pdf");
	}
}
