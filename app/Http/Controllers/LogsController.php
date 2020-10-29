<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Log;
use Illuminate\Database\Eloquent\Builder;

class LogsController extends Controller
{
	public function get() {
		$user = request()->user();

		if ($user->privilegio !== 'A-' || !$user->permissionsAdmin->registros_ver) {
			$jsonMessage = [
					'code' => 403,
					'msg'=>'not_permissions',
					'description' => 'No tienes permisos'
			];

			return response()->json($jsonMessage, 403);
		}

		$search = json_decode(request()->search);
		$type = request()->type;

		$perPage = request()->per_page;
		$page = request()->page * $perPage;
		
		if ($type !== 'all') {
			$logs = Log::orderBy('created_at', 'desc')
				->offset($page)
				->limit($perPage)
				->whereHas('user', function (Builder $query) {
					$search = request()->search;
					$query->where('cedula', 'LIKE', "%$search%");
				})
				->orWhere('created_at', 'LIKE', "%$search%")
				->orWhere('action', 'LIKE', "%$search%")
				->get();
		}else {
			$logs = Log::orderBy('created_at', 'desc')
				->offset($page)
				->limit($perPage)
				->whereHas('user', function (Builder $query) {
					$search = request()->search;
					$query->where('cedula', 'LIKE', "%$search%");
				})
				->orWhere('created_at', 'LIKE', "%$search%")
				->orWhere('action', 'LIKE', "%$search%")
				->get();
		}

		$arrayLogs = array();
		foreach ($logs as $log) {
			array_push($arrayLogs, [
				'cedula' => $log->user->privilegio . $log->user->cedula,
				'name' => $log->user->nombre,
				'action' => $log->action,
				'fecha' => $log->created_at->format('Y-m-d H:i:s')
			]);
		}
		
		//Total de logs
		$logsCount = Log::orderBy('created_at', 'desc')
			->whereHas('user', function (Builder $query) {
				$search = request()->search;
				$query->where('cedula', 'LIKE', "%$search%");
			})
			->orWhere('created_at', 'LIKE', "%$search%")
			->orWhere('action', 'LIKE', "%$search%")
			->count();

		$jsonMessage = [
			'data' => $arrayLogs,
			'page' => request()->page * 1, 
			'totalLogs' => $logsCount
		];

		return response()->json($jsonMessage, 200);
	}
}
