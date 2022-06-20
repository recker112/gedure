<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Requests\RegisterInvitationRequest;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Gedure\CursoController;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

// Mails
use App\Mail\Invitation as MailInvitation;

// Models
use App\Models\User;
use App\Models\Auth\Invitation;
use App\Models\Gedure\Curso;
use App\Models\Gedure\PersonalDataUser;
use App\Models\Gedure\PersonalDataAdmin;

class InvitationController extends Controller
{
  public function invite(UserRequest $request) 
	{
		// RECKER(NOTA): Verificar
		if ($request->privilegio === 'V-') {
			$curso = Curso::find(intVal($request->curso_id));
			
			if (!$curso) {
				return response()->json([
					'msg' => 'El curso '.$curso->code.' no existe',
				],404);
			}
		}
		
		$dataUser = $request->only(['username', 'name', 'privilegio', 'email']);
		$user = User::create($dataUser);
		// NOTA(RECKER): Crear wallet
		$user->wallet()->create();
		
		if ($user->privilegio === 'V-') {
			$personal_data = PersonalDataUser::create();
			$personal_data->user()->save($user);
			
			$user->alumno()->create([
				'curso_id' => $curso->id,
				'user_id' => $user->id,
				'n_lista' => 99,
			]);
			
			CursoController::orderAlumnos($curso->id);
		}else if ($user->privilegio === 'A-') {
			$personal_data = PersonalDataAdmin::create();
			$personal_data->user()->save($user);
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
		
		// RECKER(NOTA): Crear y enviar la invitation
		$user->invitation()->create([
			'invitation_key' => Str::random(40),
		]);
		
		Mail::to($user)->queue((new MailInvitation($user, $user->invitation->invitation_key))->onQueue('emails'));
		
		// RECKER(NOTA): Log
		$payload = [
			'privilegio' => $user->privilegio,
			'username' => $user->username,
			'email' => $user->email,
			'name' => $user->name,
		];
		$request->user()->logs()->create([
			'action' => 'Usuario invitado',
			'payload' => $payload,
			'type' => 'user',
		]);
		
		return response()->json([
			'msg' => 'Invitación enviada'
		],201);
	}
	
	public function show(Invitation $invitation)
	{
		// Verificar no existencia
		if (!$invitation) {
			return response()->json([
				'msg' => 'Invitación expirada/cancelada'
			],400);
		}
		
		$user = $invitation->user;

		// Verificar usuario activo
		if (!$user) {
			return response()->json([
				'msg' => 'Usuario desactivado'
			],400);
		}
		
		return response()->json($user->only(['name', 'username']),200);
	}
	
	public function resend(User $user)
	{
		if (!$user->email) {
			return response()->json([
				'msg' => 'El usuario no posee ningún correo'
			],400);
		}
		
		if (!$user->invitation) {
			return response()->json([
				'msg' => 'El usuario no fue invitado al sistema'
			],400);
		}
		
		Mail::to($user)->queue((new MailInvitation($user, $user->invitation->invitation_key))->onQueue('emails'));
		
		return response()->json([
			'msg' => 'Correo reenviado'
		],200);
	}
	
	public function register(RegisterInvitationRequest $request) 
	{
		// Verificar no existencia
		$key = Invitation::where('invitation_key', $request->key)->firstOrFail();
		$user = $key->user;
		
		$user->password = bcrypt($request->password);
		$user->save();
		
		$key->delete();
		
		$user->logs()->create([
			'action' => 'Contraseña creada por invitación',
			'type' => 'user',
		]);
		
		return response()->json([
			'msg' => 'Contraseña creada correctamente'
		],200);
	}
}
