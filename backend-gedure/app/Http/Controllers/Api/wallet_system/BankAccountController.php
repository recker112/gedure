<?php

namespace App\Http\Controllers\Api\wallet_system;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\FindLikeRequest;
use App\Http\Requests\wallet_system\BankAccountRequest;
use App\Http\Requests\wallet_system\BankAccountRequestEdit;
use App\Http\Requests\MassiveUsersRequest;

// Models
use App\Models\wallet_system\BankAccount;

class BankAccountController extends Controller
{
	public function index(TableRequest $request) 
	{
		$search = urldecode($request->search);

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$bankAccounts = BankAccount::where('n_account', 'like', '%'.$search.'%')
			->orWhere('name', 'like', '%'.$search.'%')
			->offset($page)
			->limit($perPage)
			->get();
		
		$bankAccounts_count = BankAccount::where('n_account', 'like', '%'.$search.'%')
			->orWhere('name', 'like', '%'.$search.'%')
			->orWhere('email', 'like', '%'.$search.'%')
			->count();
		
		return response()->json([
			'data' => $bankAccounts,
			'page' => request()->page * 1, 
			'totalRows' => $bankAccounts_count
		], 200);
	}
	
	public function findLike(FindLikeRequest $request) 
	{
		$search = urldecode($request->search);
		
		$bankAccounts = BankAccount::where('name', 'like', "%$search%")
			->limit(15)
			->get();
		
		return response()->json($bankAccounts, 200);
	}
	
  public function create(BankAccountRequest $request) 
	{
		$bankAccount = BankAccount::create($request->toArray());
		
		if ($bankAccount) {
			$payload = [
				'n_account' => $request->n_account,
				'name' => $request->name,
			];
			
			$request->user()->logs()->create([
				'action' => "Cuenta bancaria creada",
				'payload' => json_encode($payload),
				'type' => 'gedure'
			]);
			
			return response()->json([
				'msg' => "Cuenta bancaria agregada",
			], 200);
		}else {
			return response()->json([
				'msg' => "No se pudo agregar la cuenta bancaria",
			], 400);
		}
	}
	
	public function edit(BankAccountRequestEdit $request, $id)
	{
		$bankAccount = BankAccount::findOrFail(intVal($id));
		
		$bankAccount->update($request->toArray());
		
		$payload = [
			'n_account' => $request->n_account,
			'name' => $request->name,
		];

		$request->user()->logs()->create([
			'action' => "Cuenta bancaria actualizada",
			'payload' => json_encode($payload),
			'type' => 'gedure'
		]);
		
		return response()->json([
			'msg' => "Cuenta bancaria actualizada",
		], 200);
	}
	
	public function destroy($id, $massive = false)
	{
		$bank_account = BankAccount::findOrFail(intVal($id));
		
		$bank_account->delete();
		
		if (!$massive) {
			$payload = [
				'n_account' => $bank_account->n_account,
				'name' => $bank_account->name,
			];

			request()->user()->logs()->create([
				'action' => "Cuenta bancaria eliminada",
				'payload' => json_encode($payload),
				'type' => 'gedure'
			]);
		}
		
		return response()->json([
			'msg' => "Cuenta bancaria eliminada",
		], 200);
	}
	
	public function destroyMassive(MassiveUsersRequest $request) {
		$ids = json_decode(urldecode($request->ids));
		$bank_accounts = BankAccount::whereIn('id', $ids)->get();
		
		$i=0;
		$accounts=[];
		foreach($bank_accounts as $bank_account) {
			$accounts[$i]= [
				'name' => $bank_account->name,
				'account' => $bank_account->n_account,
			];
			$this->destroy($bank_account->id, true);
			$i++;
		}
		
		if (!$i) {
			return response()->json([
				'msg' => "No se ha eliminado ninguna cuenta bancaria",
			], 400);
		}
		
		$payload = [
			'accounts' => $accounts,
		];

		$request->user()->logs()->create([
			'action' => "Cuentas bancarias eliminadas massivamente",
			'payload' => json_encode($payload),
			'type' => 'gedure'
		]);
		
		return response()->json([
			'msg' => "$i cuentas bancarias eliminadas",
		], 200);
	}
}
