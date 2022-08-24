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
	public function index(TableRequest $request) {
		$this->authorize('index', Debt::class);
		// Variables
		$user = $request->user();
		$search = urldecode($request->search);
		$perPage = $request->per_page;
		
		$debts = Debt::with(['debt_lote', 'transaction'])
			->where('user_id', $user->id)
			->paginate($perPage);

		// Ocultar datos
		$data = $debts->getCollection();
		$data->each(function ($item) {
			$item->makeHidden(['created_at']);
			$item->debt_lote->makeHidden(['id', 'created_at', 'exchange_amount', 'exchange_rate_id']);
		});
		$debts->setCollection($data);
		
		return response()->json([
			'data' => $debts->items(),
			'totalRows' => $debts->total(),
		], 200);
	}
}
