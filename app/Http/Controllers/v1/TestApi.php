<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

class TestApi extends Controller
{
  public function index()
	{
		return response()->json([
			'code' => 403,
			'msg' => 'no_access',
			'description' => 'No estรกs autorizado'
		], 403);
	}
}
