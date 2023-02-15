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
		/**
		 * Verificar si el estudiante está en un curso existente.
		 */
		if ($request->privilegio === 'V-') {
			$curso = Curso::find(intVal($request->curso_id));
			
			if (!$curso) {
				return response()->json([
					'msg' => 'El curso '.$curso->code.' no existe',
				],404);
			}
		}
		
		/**
		 * Crear al usuario.
		 */
		$dataUser = $request->only(['username', 'name', 'privilegio', 'email']);
		$user = User::create($dataUser);
		$user->wallet()->create();
		
		/**
		 * Crear datos extras en cada tipo de usuario.
		 */
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
		
		/**
		 * Crear permisos para el usuario
		 */
		if ($request->super_admin && $user->privilegio === 'A-') {
			$user->assignRole('super-admin');
		}else {
			foreach($request->permissions as $clave => $value) {
				if ($value) {
					$user->givePermissionTo($clave);
				}
			}
		}
		
		/**
		 * Crear invitación para el usuario.
		 */
		$user->invitation()->create([
			'invitation_key' => Str::random(40),
		]);
		
		/**
		 * Enviar correo con invitación.
		 */
		Mail::to($user)->queue((new MailInvitation($user, $user->invitation->invitation_key))->onQueue('emails'));
		
		/**
		 * Registrar un log en el sistema.
		 */
		$payload = [
			'privilegio' => $user->privilegio,
			'username' => $user->username,
			'email' => $user->email,
			'name' => $user->name,
		];
		$request->user()->logs()->create([
			'action' => 'Usuario invitado',
			'payload' => $payload,
			'type' => 'user-manager',
		]);
		
		return response()->json([
			'msg' => 'Invitación enviada'
		],201);
	}
	
	public function show(Invitation $invitation)
	{
		/**
		 * Verificar existencia de invitación.
		 */
		if (!$invitation) {
			return response()->json([
				'msg' => 'Invitación expirada/cancelada'
			],400);
		}
		
		$user = $invitation->user;

		/**
		 * Verificar que el usuario no esté desactivado.
		 */
		if (!$user) {
			return response()->json([
				'msg' => 'Usuario desactivado'
			],400);
		}
		
		return response()->json($user->only(['name', 'username']),200);
	}
	
	public function resend(User $user)
	{
		/**
		 * Verificar si el usuario tiene correo
		 */
		if (!$user->email) {
			return response()->json([
				'msg' => 'El usuario no posee ningún correo'
			],400);
		}
		
		/**
		 * Verificar si el usuario fué invitado al sistema, si ese
		 * no es el caso, crear una invitación.
		 */
		if (!$user->invitation) {
			$user->invitation()->create([
				'invitation_key' => Str::random(40),
			]);
		}

		/**
		 * Recargar modelo invitation para poder enviar la key.
		 */
		$user->load('invitation');
		
		/**
		 * Enviar email.
		 */
		Mail::to($user)->queue((new MailInvitation($user, $user->invitation->invitation_key))->onQueue('emails'));
		
		return response()->json([
			'msg' => 'Correo reenviado'
		],200);
	}
	
	public function register(RegisterInvitationRequest $request) 
	{
		/**
		 * Verificar no existencia.
		 */
		$key = Invitation::where('invitation_key', $request->key)->firstOrFail();
		
		/**
		 * Actualizar datos del usuario.
		 */
		$user = $key->user;
		$user->password = $request->password;
		$user->save();
		
		/**
		 * Borrar invitación ya usada.
		 */
		$key->delete();
		
		/**
		 * Registrar log.
		 */
		$user->logs()->create([
			'action' => 'Contraseña creada por invitación',
			'type' => 'user-manager',
		]);
		
		return response()->json([
			'msg' => 'Contraseña creada correctamente'
		],200);
	}
}
