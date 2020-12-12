<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Requests\RegisterInvitationRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

// Mails
use App\Mail\Invitation as MailInvitation;

// Models
use App\Models\User;
use App\Models\Invitation;
use App\Models\Curso;

class InvitationController extends Controller
{
  public function invite(UserRequest $request) 
	{
		// Verificar no existencia
		$userCedulaExist = User::withTrashed()
			->firstWhere('username', $request->username);
		
		if ($userCedulaExist) {
			return response()->json([
				'msg' => "La cédula o usuario $request->username ya existe"
			],400);
		}
		
		// Verificar existencia del curso
		if ($request->privilegio === 'V-') {
			$code = $request->curso.'-'.$request->seccion;
			$curso = Curso::firstWhere('code', $code);
			
			if (!$curso) {
				return response()->json([
					'msg' => 'El curso '.$code.' no existe',
				],404);
			}
		}
		
		$dataUser = $request->only(['username', 'name', 'privilegio', 'email']);
		$user = User::create($dataUser);
		
		$user->personalData(false)->create();
		
		if ($user->privilegio === 'V-') {
			$user->alumno()->create([
				'curso_id' => $curso->id,
				'user_id' => $user->id,
				'n_lista' => 99,
			]);
			
			CursoController::orderAlumnos($curso->id);
		}
		
		// Permissions
		if ($request->super_admin && $user->privilegio === 'A-') {
			$user->assignRole('super-admin');
		}else {
			foreach($request->permissions as $clave => $value) {
				if ($value) {
					$user->givePermissionTo($clave);
				}
			}
		}
		
		// Crear y enviar invitación
		$user->invitation()->create([
			'invitation_key' => Str::random(40),
		]);
		
		Mail::to($user)->queue(new MailInvitation($user, $user->invitation->invitation_key));
		
		return response()->json([
			'msg' => 'Invitación enviada'
		],201);
	}
	
	public function register(RegisterInvitationRequest $request) 
	{
		// Verificar no existencia
		$key = Invitation::where('invitation_key', $request->key)->firstOrFail();
		$user = $key->user;
		
		$user->password = bcrypt($request->password);
		$user->registred_at = now();
		$user->save();
		
		$user->personalData(false)->update($request->personalData);
		
		$key->delete();
		
		return response()->json([
			'msg' => 'Datos guardados correctamente'
		],200);
	}
}
