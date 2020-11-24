<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ContactoRequest;
// Models
use App\Models\Contacto;

class ContactoController extends Controller
{
	public function index(Request $request) {
		$search = urldecode($request->search);

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$lista = Contacto::where('nombre', 'like', '%'.$search.'%')
			->orWhere('asunto', 'like', '%'.$search.'%')
			->orWhere('created_at', 'like', '%'.$search.'%')
			->offset($page)
			->limit($perPage)
			->orderBy('created_at', 'Desc')
			->get()
			->toArray();
		
		$contactoCount = Contacto::count();
		
		return response()->json([
			'data' => $lista,
			'page' => $request->page * 1, 
			'totalLogs' => $contactoCount
		], 200);
	}
	
  public function create(ContactoRequest $request) {
		Contacto::create($request->toArray());
		
		return response()->json([
			'msg' => 'Mensaje enviado'
		], 201);
	}
	
	public function destroy($id) {
		$contacto = Contacto::findOrFail($id);
		
		$contacto->delete();
		
		return response()->json([
			'msg' => 'Solicitud eliminada'
		], 200);
	}
}
