<?php

namespace App\Http\Controllers\Api\Gedure;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\TableRequest;
use App\Models\Gedure\Log;
use Carbon\Carbon; 

class LogController extends Controller
{
	public function index(TableRequest $request) {
		$user = $request->user();
		$search = urldecode($request->search);
		$type = $request->type;
		$perPage = $request->per_page;

		// Request
		$logs = Log::with(['user:id,privilegio,username,name'])
			->when(!empty($type) && $type !== 'all', function (Builder $query) use ($type) {
				$query->where('type', $type);
			})
			->where(function (Builder $query) use ($search) {
				$query->where('action', 'like', "%".$search."%")
					->orWhereHas('user', function (Builder $query) use ($search) {
						$query->where('username', 'LIKE', "%$search%");
					});
				})
			->orderBy('id', 'desc')
			->paginate($perPage);

		// Mostrar datos
		$data = $logs->getCollection();
		$data->each(function ($item) {
			$item->makeVisible(['id']);
		});
		$logs->setCollection($data);

		return response()->json([
			'data' => $logs->items(),
			'totalRows' => $logs->total(),
		], 200);
	}
}
