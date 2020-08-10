<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

class TestApi extends Controller
{
  public function index()
	{
		return response()->json(request()->user(), 200);
	}
}
