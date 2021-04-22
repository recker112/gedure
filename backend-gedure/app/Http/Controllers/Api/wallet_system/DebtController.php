<?php

namespace App\Http\Controllers\Api\wallet_system;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\TableRequest;
//Models
use App\Models\User;
use App\Models\Curso;
use App\Models\wallet_system\Debt;
use App\Models\wallet_system\DebtLote;

class DebtController extends Controller
{
	public function index(TableRequest $request, $id) {
		$search = urldecode($request->search);
		
		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$debts = Debt::with(['user:id,privilegio,username,name', 'transaction'])
			->where('debt_lote_id', $id)
			->offset($page)
			->limit($perPage)
			->get()
			->toArray();
		
		$debtsCount = DebtLote::count();
		
		return response()->json([
			'data' => $debts,
			'page' => $request->page * 1, 
			'totalRows' => $debtsCount,
		], 200);
	}
}
