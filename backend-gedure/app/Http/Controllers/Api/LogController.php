<?php

namespace App\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Models\Log;
use Carbon\Carbon; 

class LogController extends Controller
{
	public function index(TableRequest $request) {
		$user = $request->user();

		$search = urldecode($request->search);
		$type = $request->type;

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		if (!empty($type) && $type !== 'all') {
			// NOTA(RECKER): Regresar Logs con un type en específico
			$logs = Log::with(['user:id,privilegio,username,name'])
				->where('type', $type)
				->where(function ($query) {
					$search = urldecode(request()->search);
					$query->where('action', 'like', "%".$search."%")
						->orWhere('created_at', 'like', "%".$search."%")
						->orWhereHas('user', function (Builder $query) {
							$search = request()->search;
							$query->where('username', 'LIKE', "%$search%");
						});
					})
				->orderBy('id', 'desc')
				->offset($page)
				->limit($perPage)
				->get()
				->makeVisible('id')
				->toArray();
			
			$logsCount = Log::where('type', $type)
				->where(function ($query) {
					$search = request()->search;
					$query->where('action', 'like', "%".$search."%")
						->orWhere('created_at', 'like', "%".$search."%")
						->orWhereHas('user', function (Builder $query) {
							$search = request()->search;
							$query->where('username', 'LIKE', "%$search%");
						});
					})
				->count();
		}else {
			// NOTA(RECKER): Regresar todos los Logs
			$logs = Log::with(['user:id,privilegio,username,name'])
				->where(function ($query) {
					$search = request()->search;
					$query->where('action', 'like', "%".$search."%")
						->orWhere('created_at', 'like', "%".$search."%")
						->orWhereHas('user', function (Builder $query) {
							$search = request()->search;
							$query->where('username', 'LIKE', "%$search%");
						});
					})
				->orderBy('id', 'desc')
				->offset($page)
				->limit($perPage)
				->get()
				->makeVisible('id')
				->toArray();
			
			$logsCount = Log::where(function ($query) {
					$search = request()->search;
					$query->where('action', 'like', "%".$search."%")
						->orWhere('created_at', 'like', "%".$search."%")
						->orWhereHas('user', function (Builder $query) {
							$search = request()->search;
							$query->where('username', 'LIKE', "%$search%");
						});
					})
				->count();
		}

		return response()->json([
			'data' => $logs,
			'page' => $request->page * 1, 
			'totalRows' => $logsCount,
		], 200);
	}
}
