<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InfoBoxController extends Controller
{
    public function getAnnounceBox()
		{
			//Data
			$privilegio = request()->user()->user_privilegio;
			
			//Verificar usuario access
			if ($privilegio === "V-"){
				return 'no_access';
			}
			
			return 'ok';
		}
}
