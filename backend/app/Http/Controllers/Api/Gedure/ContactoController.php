<?php

namespace App\Http\Controllers\Api\Gedure;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ContactoRequest;
// Models
use App\Models\Gedure\Contacto;

class ContactoController extends Controller
{
	public function index(Request $request) {
		$search = urldecode($request->search);

		$perPage = $request->per_page;
		$page = $request->page * $perPage;
		
		$lista = Contacto::where('nombre', 'like', '%'.$search.'%')
			->orWhere('asunto', 'like', '%'.$search.'%')
			->orWhere('email', 'like', '%'.$search.'%')
			->orderBy('id', 'Desc')
			->paginate($perPage);
		
		return response()->json([
			'data' => $lista->items(),
			'totalRows' => $lista->total(),
		], 200);
	}
	
  public function create(ContactoRequest $request) {
		Contacto::create($request->toArray());
		
		return response()->json([
			'msg' => 'Mensaje enviado'
		], 201);
	}
	
	public function destroy(Request $request, Contacto $contacto) {
		$payload = [
			'asunto' => $contacto->asunto,
			'nombre' => $contacto->nombre,
			'email' => $contacto->email,
		];

		$request->user()->logs()->create([
			'action' => "Solicitud de contácto eliminada",
			'payload' => $payload,
			'type' => 'gedure'
		]);
		
		$contacto->delete();
		
		return response()->json([
			'msg' => 'Solicitud eliminada'
		], 200);
	}
}
