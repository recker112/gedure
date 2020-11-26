<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Http\Controllers\Controller;
// Models
use App\Models\User;

class UserController extends Controller
{
  public function index(TableRequest $request)
	{
		$user = $request->user();

		if (!$user->config()->user_modify) {
			return response()->json( [
				'msg'=>'not_permissions',
				'description' => 'No tienes permisos'
			], 403);
		}

		$search = urldecode($request->search);
		$type = $request->type;

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$users = User::where('cedula', 'like', '%'.$search.'%')
			->orWhere('nombre', 'like', '%'.$search.'%')
			->orWhere('email', 'like', '%'.$search.'%')
			->orderBy('id', 'desc')
			->offset($page)
			->limit($perPage)
			->get()
			->makeHidden(['personal_data', 'estudiante_data'])
			->toArray();
		
		$usersCount = User::where('cedula', 'like', '%'.$search.'%')
			->orWhere('nombre', 'like', '%'.$search.'%')
			->orWhere('email', 'like', '%'.$search.'%')
			->count();
		
		return response()->json([
			'data' => $users,
			'page' => $request->page * 1, 
			'totalUsers' => $usersCount,
		], 200);
	}
}
