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
		
		// Crear y enviar invitaciรณn
		$user->invitation()->create([
			'invitation_key' => Str::random(40),
		]);
		
		Mail::to($user)->queue((new MailInvitation($user, $user->invitation->invitation_key))->onQueue('emails'));
		
		//Log
		$payload = [
			'privilegio' => $user->privilegio,
			'username' => $user->username,
			'email' => $user->email,
			'name' => $user->name,
		];
		$request->user()->logs()->create([
			'action' => 'Usuario invitado',
			'payload' => json_encode($payload),
			'type' => 'user',
		]);
		
		return response()->json([
			'msg' => 'Invitación enviada'
		],201);
	}
	
	public function show($key)
	{
		// Verificar no existencia
		$key = Invitation::where('invitation_key', $key)->firstOrFail();
		$user = $key->user;
		
		return response()->json($user->only(['name', 'username']),200);
	}
	
	public function resend($id)
	{
		$user = User::findOrFail(intVal($id));
		
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
