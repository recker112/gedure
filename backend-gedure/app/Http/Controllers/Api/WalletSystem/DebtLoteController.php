<?php

namespace App\Http\Controllers\Api\WalletSystem;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\wallet_system\DebtRequest;
use App\Http\Requests\wallet_system\DebtLoteEditRequest;
use App\Http\Requests\FindLikeRequest;
use App\Http\Requests\TableRequest;
//Models
use App\Models\User;
use App\Models\Gedure\Curso;
use App\Models\WalletSystem\Debt;
use App\Models\WalletSystem\DebtLote;

class DebtLoteController extends Controller
{
	public function index(TableRequest $request) {
		$search = urldecode($request->search);
		
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
	
	public function findUsersLike(FindLikeRequest $request) {
		$search = urldecode(request()->search);
		
		$users = User::select('id','username','name','privilegio')
			->where('privilegio', 'V-')
			->where('username', 'like', "%$search%")
			->when(boolVal($request->not_registred), function ($query) {
				$query->whereDoesntHave('debts', function (Builder $query) {
					$query->where('debt_lote_id', request()->id_lote_deuda);
				});
			})
			->when(!boolVal($request->not_registred), function ($query) {
				$query->whereHas('debts', function (Builder $query) {
					$query->where('debt_lote_id', request()->id_lote_deuda);
				});
			})
			->limit(15)
			->get()
			->makeHidden(['personal_data', 'estudiante_data']);
		
		return response()->json($users, 200);
	}
	
	public function show($id) {
		$debt = DebtLote::withCount([
			'debts',
			'debts as debts_pagas_count' => function (Builder $query) {
				$query->where('status', 'pagada');
			},
			'debts as debts_no_pagadas_count' => function (Builder $query) {
				$query->where('status', 'no pagada');
			},
			'debts as debts_reembolsados_count' => function (Builder $query) {
				$query->where('status', 'reembolsado');
			},
		])->findOrFail(intVal($id))
			->makeVisible(['updated_at'])
			->toArray();
		
		return response()->json($debt, 200);
	}
	
  public function create(DebtRequest $request) {
		$users = [];
		if ($request->type === 'cursos') {
			// NOTA(RECKER): Obtener estudiantes por curso seleccionado
			$users = User::where('privilegio', 'V-')
				->whereHas('alumno', function (Builder $query) {
					$query->whereHas('curso', function (Builder $query) {
						$query->whereIn('id', request()->cursos);
					});
				})
				->get();
		}else if ($request->type === 'selected' && $request->selected_users && count($request->selected_users) > 0) {
			// NOTA(RECKER): Obtener estudiantes seleccionados
			$users = User::where('privilegio', 'V-')
				->whereIn('id', $request->selected_users)
				->get();
		}
		
		if (count($users) === 0) {
			return response()->json([
				'msg' => 'No hay usuarios seleccionados',
			], 400);
		}
		
		// NOTA(RECKER): Creaciรณn del lote de deudas
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
			'msg' => 'Lote de deudas creada',
		], 200);
	}
	
	public function edit(DebtLoteEditRequest $request, DebtLote $debt_lote) {
		$user = $request->user();
		
		$debt_lote->reason = $request->reason;
		$debt_lote->amount_to_pay = $request->new_price;
		$debt_lote->save();
		
		$debts_created=0;
		if ($user->can('debt_create') && $request->selected_users) {
			// NOTA(RECKER): Asignar deudas a cada usuario seleccionado
			foreach($request->selected_users as $userId) {
				$find_debt = Debt::where('user_id', $userId)
					->where('debt_lote_id', $debt_lote->id)
					->first();
				$userExist = User::find(intVal($userId));
				
				if (!$find_debt && $userExist) {
					Debt::create([
						'user_id' => $userExist->id,
						'debt_lote_id' => $debt_lote->id,
					]);
					$debts_created++;
				}
			}
		}
		
		if ($debts_created) {
			return response()->json([
				'msg' => 'Deudas actualizada y asignaciones completadas',
			], 200);
		}
		
		return response()->json([
			'msg' => 'Deudas actualizada',
		], 200);
	}
	
	public function delete(DebtLote $debt_lote) 
	{
		// NOTA(RECKER): Eliminar si no hay debts en el lote
		if (!count($debt_lote->debts)) {
			$debt_lote->delete();
		}
		
		$debts = Debt::where('debt_lote_id', $debt_lote->id)
			->where('status', '!=', 'no pagada')
			->count();
		
		// NOTA(RECKER): Eliminar no hay debts pagadas o rembolsadas
		if ($debts) {
			return response()->json([
				'msg' => 'No puede eliminar este lote',
			], 400);
		}
		
		$debt_lote->delete();
		
		return response()->json([
			'msg' => 'Lote de deuda eliminada',
		], 200);
	}
}
