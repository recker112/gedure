<?php

namespace App\Http\Controllers\Api\Gedure;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// Models
use App\Models\Gedure\Post;
use App\Models\WalletSystem\ExchangeRate;

class InfoBoxController extends Controller
{
  public function index(Request $request)
	{
		$user = $request->user();
		$data_finish = [];
		
		// NOTA(RECKER): Obtener últimos posts
		$posts = Post::limit(3)->orderBy('id', 'desc')->get();
		$data_finish['posts'] = [];
		$iP=0;
		foreach($posts as $post) {
			$data_finish['posts'][$iP]['textPrimary'] = $post->title;
			$data_finish['posts'][$iP]['textSecondary'] = $post->fecha_humano;
			$data_finish['posts'][$iP]['url'] = $post->slug;
			$iP++;
		}
		
		// NOTA(RECKER): Obtener datos solo para estudiantes
		if ($user->privilegio === 'V-') {
			$data_finish['boletas'] = [];
			$iB=0;

			foreach($user->boletas()->limit(3)->orderBy('id', 'desc')->get() as $boleta) {
				$curso = $boleta->curso->curso;
				$name_curso = strpos($curso, 'G') ? str_split($curso)[0].' grado' : str_split($curso)[0].' año';
				$data_finish['boletas'][$iB]['textPrimary'] = $name_curso.' '.$boleta->curso->seccion.' - '.$boleta->lapso.'° lapso';
				$data_finish['boletas'][$iB]['textSecondary'] = $boleta->fecha_humano;
				$iB++;
			}
		}

		// NOTA(RECKER): Obtener balance
		$data_finish['wallet']['textPrimary'] = $user->wallet->balance;
		$data_finish['wallet']['textSecondary'] = 'Ultima actualización de saldo: '.$user->wallet->updated_at;

		// NOTA(RECKER): Obtener exchange rate
		$exrate = ExchangeRate::where('type', 'USD')->latest()->first();
		$data_finish['exrate']['textPrimary'] = $exrate->amount;
		$data_finish['exrate']['textSecondary'] = 'Ultima actualización del precio: '.$exrate->created_at;
		
		return response()->json($data_finish,200);
	}
}
