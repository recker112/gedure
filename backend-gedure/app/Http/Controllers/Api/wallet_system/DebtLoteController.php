<?php

namespace App\Http\Controllers\Api\wallet_system;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\wallet_system\DebtRequest;
use App\Http\Requests\wallet_system\DebtLoteEditRequest;
use App\Http\Requests\TableRequest;
//Models
use App\Models\User;
use App\Models\Curso;
use App\Models\wallet_system\Debt;
use App\Models\wallet_system\DebtLote;

class DebtLoteController extends Controller
{
	public function index(TableRequest $request) {
		$search = urldecode($request->search);
		$curso = $request->curso;
		$seccion = $request->seccion;
		$type = $request->type;
		
		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$debts = DebtLote::where('reason', 'like', "%$search%")
			->orWhere('id', 'like', "%$search%")
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
	
  public function create(DebtRequest $request) {
		$users = [];
		if ($request->type === 'cursos') {
			// Obtener estudiantes por curso seleccionado
			$users = User::where('privilegio', 'V-')
				->whereHas('alumno', function (Builder $query) {
					$query->whereHas('curso', function (Builder $query) {
						$query->whereIn('id', request()->cursos);
					});
				})
				->get();
		}else if ($request->type === 'selected' && $request->selected_users && count($request->selected_users) > 0) {
			// Obtener estudiantes seleccionados
			$users = User::where('privilegio', 'V-')
				->whereIn('id', $request->selected_users)
				->get();
		}
		
		if (count($users) === 0) {
			return response()->json([
				'msg' => 'No hay usuarios seleccionados',
			], 400);
		}
		
		// Creaciรณn del lote de deudas
		$debt_lote = DebtLote::create([
			'reason' => $request->motivo,
			'amount_to_pay' => $request->cantidad_pagar
		]);
		
		foreach($users as $user) {
			$user->debts()->create([
				'debt_lote_id' => $debt_lote->id
			]);
		}
		
		return response()->json([
			'msg' => 'Deuda creada',
		], 200);
	}
	
	public function edit(DebtLoteEditRequest $request, $id) {
		
	}
}
