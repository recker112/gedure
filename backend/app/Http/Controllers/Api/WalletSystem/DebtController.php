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
	public function index(TableRequest $request, $id) {
		$search = urldecode($request->search);
		
		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$debts = Debt::with(['user:id,privilegio,username,name', 'transaction'])
			->where('debt_lote_id', $id)
			->WhereHas('user', function (Builder $query) use ($search) {
				$query->where('username', 'LIKE', "%$search%");
			})
			->offset($page)
			->limit($perPage)
			->get()
			->toArray();
		
		$debtsCount = Debt::where('debt_lote_id', $id)
			->WhereHas('user', function (Builder $query) use ($search) {
				$query->where('username', 'LIKE', "%$search%");
			})
			->count();
		
		return response()->json([
			'data' => $debts,
			'page' => $request->page * 1, 
			'totalRows' => $debtsCount,
		], 200);
	}
}
