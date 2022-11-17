<?php

namespace App\Http\Controllers\Api\Gedure;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Gedure\Config\SetConfigRequest;

// Models
use App\Models\User;
use App\Models\GedureConfig;

class GedureConfigController extends Controller
{
    public function index()
    {
        $data = GedureConfig::get();

        return response()->json($data, 200);
    }

    public function edit(SetConfigRequest $request)
    {
        $i = 0;
        foreach ($request->only(['gc_mensualidad', 'gc_inscripción']) as $key => $value) {
            $find = GedureConfig::firstWhere('name', $key);

            $find->value = $value;
            $find->save();
            
            $i++;
        }
        
        return response()->json([
            'msg' => $i > 0 ? 'Configuración actualizada' : 'Sin cambios'
        ], 200);
    }
}
