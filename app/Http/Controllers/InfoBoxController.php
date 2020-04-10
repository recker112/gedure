<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Ban;
use App\NewsData;
use App\AnunciosData;
//Validación en try
use Illuminate\Validation\ValidationException;

class InfoBoxController extends Controller
{
    public function getAnnounceBox()
		{
			//Data
			$cedula = request()->user()->user_cedula;
			$privilegio = request()->user()->user_privilegio;
			$show = request()->show;
			
			//ValidateData
			try {
				//Verify pass
				$dataValidate = request()->validate([
					'show' => 'required'
				], [
					/*
					Custom message
					GLOBAL [propiedad] = required
					ESPECIFICO [value].[propiedad] = user.required
					*/
					'required' => 'Campo obigatorio',

				]);
			} catch (ValidationException $exception) {
				return response()->json([
					'code' => 422,
					'msg'    => 'validation_error',
					'errors' => $exception->errors(),
					'description' => 'El servidor rechazó su solicitud'
				], 422);
			}
			
			//Verificar usuario access
			if ($privilegio === "V-"){
				return response()->json([
					'code' => 403,
					'msg' => 'no_access',
					'description' => 'No estรก autorizado'
				], 403);
			}
			
			/* QUERY's */
			//Total Studients
			if ($show === 'StudientsTotal') {
				$query = User::where('user_privilegio', 'V-')->count();
			}
			
			//Total Studients Block
			if ($show === 'StudientsBlock') {
				$query = Ban::where('ban_locks', '<', 5)
					->where('user_privilegio', 'V-')
					->join('users', 'bans_data.ban_cedula', '=', 'users.user_cedula')
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
					$StudientsBlock = Ban::where('ban_locks', '<', 5)
					->where('user_privilegio', 'V-')
					->join('users', 'bans_data.ban_cedula', '=', 'users.user_cedula')
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
				return response()->json([
					'code' => 400,
					'msg' => 'option_not_valid',
					'description' => 'Opciรณn infobox no vรกlida'
				], 400);
			}
			
			//All OK
			return response()->json($query,200);
		}
}
