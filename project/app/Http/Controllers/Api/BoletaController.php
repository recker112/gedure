<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\BoletaRequest;

class BoletaController extends Controller
{
  public function upload(BoletaRequest $request)
	{
		$files = $request->file('boletas');
		$lapso = $request->lapso;
		
		foreach($files as $file) {
			dd($file);
		}
	}
}
