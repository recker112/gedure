<?php

namespace App\Http\Controllers\Api\wallet_system;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Requests\FindLikeRequest;
use App\Http\Requests\wallet_system\BankAccountRequest;

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
			->orWhere('email', 'like', '%'.$search.'%')
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
			return response()->json([
				'msg' => "Cuenta bancaria agregada",
			], 200);
		}else {
			return response()->json([
				'msg' => "No se pudo agregar la cuenta bancaria",
			], 400);
		}
	}
	
	public function edit(BankAccountRequest $request, $id)
	{
		$bankAccount = BankAccount::findOrFail(intVal($id));
		
		$bankAccount->update($request->toArray());
		
		return response()->json([
			'msg' => "Cuenta bancaria actualizada",
		], 200);
	}
	
	public function delete($id)
	{
		$bankAccount = BankAccount::findOrFail(intVal($id));
		
		$bankAccount->delete();
		
		return response()->json([
			'msg' => "Cuenta bancaria eliminada",
		], 200);
	}
}
