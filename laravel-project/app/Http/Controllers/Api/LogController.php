<?php

namespace App\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Log;

class LogController extends Controller
{
	public function index(Request $request) {
		$user = request()->user();

		if (!$user->permissionsAdmin->registros_ver) {
			return response()->json( [
				'msg'=>'not_permissions',
				'description' => 'No tienes permisos'
			], 200);
		}

		$search = $request->search;
		$type = $request->type;

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		if (empty($type)) {
			$logs = Log::where('type', $type)
				->orderBy('created_at', 'desc')
				->offset($page)
				->limit($perPage)
				->get();
			
			//Total de logs
			$logsCount = Log::count();
		}else {
			$logs = Log::where('type', $type)
				->where(function ($query) {
					$search = request()->search;
					$query->where('action', 'like', "%".$search."%")
						->orWhere('created_at', 'like', "%".$search."%")
						->orWhereHas('user', function (Builder $query) {
							$search = request()->search;
							$query->where('cedula', 'LIKE', "%$search%");
						});
					})
				->orderBy('created_at', 'desc')
				->offset($page)
				->limit($perPage)
				->get();
			
			//Total de logs
			$logsCount = Log::where('type', $type)
				->where(function ($query) {
					$search = request()->search;
					$query->where('action', 'like', "%".$search."%")
						->orWhere('created_at', 'like', "%".$search."%")
						->orWhereHas('user', function (Builder $query) {
							$search = request()->search;
							$query->where('cedula', 'LIKE', "%$search%");
						});
					})
				->count();
		}

		$arrayLogs = array();
		foreach ($logs as $log) {
			array_push($arrayLogs, [
				'cedula' => $log->user->privilegio . $log->user->cedula,
				'name' => $log->user->nombre,
				'action' => $log->action,
				'fecha' => $log->created_at
			]);
		}

		return response()->json([
			'data' => $arrayLogs,
			'page' => $request->page * 1, 
			'totalLogs' => $logsCount
		], 200);
	}
}
