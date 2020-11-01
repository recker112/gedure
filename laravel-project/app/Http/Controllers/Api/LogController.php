<?php

namespace App\Http\Controllers\Api;

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

		$search = json_decode($request->search);
		$type = $request->type;

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		if ($type !== 'all') {
			$logs = Log::orderBy('created_at', 'desc')
				->offset($page)
				->limit($perPage)
				->get();
		}else {
			$logs = Log::orderBy('created_at', 'desc')
				->offset($page)
				->limit($perPage)
				->where('type', $type)
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
			->count();

		return response()->json([
			'data' => $arrayLogs,
			'page' => $request->page * 1, 
			'totalLogs' => $logsCount
		], 200);
	}
}
