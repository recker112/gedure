<?php

namespace App\Http\Controllers\Api\WalletSystem;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;

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
}
