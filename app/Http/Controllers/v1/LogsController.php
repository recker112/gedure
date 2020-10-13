<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use App\Log;

class LogsController extends Controller
{
	public function get() {
		$user = request()->user();

		if ($user->privilegio !== 'A-' || !$user->permissionsAdmin->registros_ver) {
		$jsonMessage = [
				'code' => 403,
				'msg'=>'logout',
				'description' => 'No tienes permisos'
		];

			return response()->json($jsonMessage, 403);
		}

		if (empty(request()->search)) {
			$search = '';
		}else {
			$search = request()->search;
		}

		$perPage = request()->per_page;
		$page = request()->page * $perPage;

		$logs = Log::orderBy('created_at', 'desc')
			->offset($page)
			->limit($perPage)
			->where('log_owner', 'LIKE', "%$search%")
			->orWhere('created_at', 'LIKE', "%$search%")
			->get();

		$logsCount = Log::count();

		$arrayLogs = array();
		foreach ($logs as $log) {
			array_push($arrayLogs, [
				'cedula' => $log->log_owner,
				'name' => $log->relUser->nombre,
				'action' => $log->action,
				'fecha' => $log->created_at->format('Y-m-d H:i:s')
			]);
		}

		$jsonMessage = [
			'data' => $arrayLogs,
			'page' => request()->page * 1, 
			'totalLogs' => $logsCount
		];

		return response()->json($jsonMessage, 200);
	}
}
