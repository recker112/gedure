<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Ban;
use App\NewsData;
use App\AnunciosData;

class InfoBoxController extends Controller
{
    public function getAnnounceBox()
		{
			//Data
			$cedula = request()->user()->user_cedula;
			$privilegio = request()->user()->user_privilegio;
			$show = request()->show;
			
			//Verificar usuario access
			if ($privilegio === "V-"){
				$jsonMessage = response('no_access', 401);
			}
			
			/* QUERY's */
			//Total Studients
			if ($show === 'StudientsTotal') {
				$query = User::where('user_privilegio', 'V-')->count();
			}
			
			//Total Studients Block
			if ($show === 'StudientsBlock') {
				$query = Ban::join('users', 'bans_data.ban_cedula', '=', 'users.user_cedula')
					->count();
			}
			
			//Total Studients Perma Block
			if ($show === 'StudientsPermaBlock') {
				$query = Ban::where('ban_locks', '>=', 5)->count();
			}
			
			if ($show === 'PublicNotice') {
				$query = NewsData::where('new_owner', $cedula)->count();
			}
			
			if ($show === 'PublicAnnounce') {
				$query = AnunciosData::where('anuncio_owner', $cedula)->count();
			}
			
			//Obtener todo.
			if ($show === 'all') {
				//Verificar privilegio
				if ($privilegio === 'A-') {
					//querys
					$StudientsTotal = User::where('user_privilegio', 'V-')->count();
					$StudientsBlock = Ban::join('users', 'bans_data.ban_cedula', '=', 'users.user_cedula')
					->count();
					$StudientsPermaBlock = Ban::where('ban_locks', '>=', 5)->count();
					$PublicNotice = NewsData::where('new_owner', $cedula)->count();
					$PublicAnnounce = AnunciosData::where('anuncio_owner', $cedula)->count();
					
					$query = [
						'StudientsTotal' => $StudientsTotal,
						'StudientsBlock' => $StudientsBlock,
						'StudientsPermaBlock' => $StudientsPermaBlock,
						'PublicNotice' => $PublicNotice,
						'PublicAnnounce' => $PublicAnnounce,
					];
				}
			}
			
			//$show no valid
			if (!isset($query)) {
				$jsonMessage = [
					'status' => 'error',
					'msg' => 'option_not_valid'
				];
				return response()->json($jsonMessage);
			}
			
			//All OK
			$jsonMessage = [
				'status' => 'ok',
				'query' => $query
			];
			
			return $jsonMessage;
		}
}
