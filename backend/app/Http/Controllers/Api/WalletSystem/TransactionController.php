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
		// Variables
		$search = urldecode($request->search);
		$user = $request->user();
		$perPage = $request->per_page;
		
		// Request
		$transactions = Transaction::with('user:id,username,privilegio')
			->where('id', 'like', '%'.$search.'%')
			->orWhereHas('user', function (Builder $query) use ($search) {
				$query->where('username', 'LIKE', "%$search%");
			})
			->orderBy('id', 'desc')
			->paginate($perPage);
		
		// Ocultar datos innecesarios
		$data = $transactions->getCollection();
		$data->each(function ($item) {
			$item->makeHidden(['payload','previous_balance', 'payment_method', 'exonerado', 'user.id']);
			$item->user?->makeHidden(['id']);
		});
		$transactions->setCollection($data);
		
		return response()->json([
			'data' => $transactions->items(),
			'totalRows' => $transactions->total(),
		], 200);
	}
	
	public function indexUser(TableRequest $request)
	{
		// Variables
		$user = $request->user();
		$search = urldecode($request->search);
		$perPage = $request->per_page;
		
		// Request
		$transactions = Transaction::where('user_id', $user->id)
			->where('id', 'like', '%'.$search.'%')
			->orderBy('id', 'desc')
			->paginate($perPage);
			
		// Ocultar datos innecesarios
		$data = $transactions->getCollection();
		$data->each(function ($item) {
			$item->makeHidden(['payload','previous_balance', 'payment_method', 'exonerado', 'user.id']);
			$item->user->makeHidden(['id']);
		});
		$transactions->setCollection($data);
		
		return response()->json([
			'data' => $transactions->items(),
			'totalRows' => $transactions->total(),
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
