<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Events\BeforeSheet;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

// Mails
use App\Mail\Invitation as MailInvitation;

// Models
use App\Models\User;
use App\Models\Gedure\Curso;
use App\Models\Gedure\PersonalDataUser;

// Controllers
use App\Http\Controllers\Api\Gedure\CursoController;

class StudiendImport implements ToCollection, WithHeadingRow, WithEvents, WithChunkReading, ShouldQueue
{
	use Importable;
	
	public $sheetName;
	
	public function __construct() {
		$this->sheetName = '';
	}
	
	public function collection(Collection $rows)
	{
		$curso = Curso::firstWhere('code',$this->sheetName);
		
		// Clear curso
		if ($curso) {
			foreach($curso->alumnos as $alumno) {
				$alumno->delete();
			}
		}
		
		foreach ($rows as $row) 
		{
			// Celdas
			$nombre = trim($row['nomalum']). ' ' . trim($row['apelalum']);
			$nombre = ucwords(strtolower($nombre));
			$cedula = trim($row['nced']);
			$email = filter_var($row['email'], FILTER_VALIDATE_EMAIL) ? trim($row['email']) : null;
			
			// NOTA(RECKER): Verificar que el correo no exista
			$emailFound = User::withTrashed()->firstWhere('email', $email);
			if ($emailFound && $emailFound->username !== $cedula) {
				$email = null;
			}
			
			if ($user = User::withTrashed()->firstWhere('username',$cedula)) {
				// NOTA(RECKER): Actualizar estudiante
				if (!$user->trashed()) {
					$oldEmail = $user->email;

					$user->name = $nombre;
					
					if (!empty($email)) {
						$user->email = $email;
					}

					$user->save();

					// NOTA(RECKER): Enviar correo para usuarios sin email
					if ($oldEmail === null && $email !== null) {
						$user->invitation()->create([
							'invitation_key' => Str::random(40),
						]);

						$message = (new MailInvitation($user, $user->invitation->invitation_key))->onQueue('emails');
						Mail::to($user)->queue($message);
					}

					// NOTA(RECKER): Mover estudiante de curso
					if ($curso) {
						$curso_old = $user->alumno;

						$user->alumno()->updateOrCreate(['user_id' => $user->id],[
							'curso_id' => $curso->id,
							'n_lista' => 99,
						]);

						if ($curso_old && $curso_old->curso_id !== $curso->id) {
							CursoController::orderAlumnos($curso_old);
						}
					}	
				}
			}else {
				// NOTA(RECKER): Crear estudiante si existe el curso seleccionado
				if ($curso) {
					$user = User::create([
						'username' => $cedula,
						'name' => $nombre,
						'email' => $email,
						'privilegio' => 'V-',
					]);

					$personal_data = PersonalDataUser::create();
					$personal_data->user()->save($user);

					$user->alumno()->create([
						'curso_id' => $curso->id,
						'n_lista' => 99,
					]);
					
					$user->wallet()->create();
					
					$user->givePermissionTo(['boleta_download', 'change_avatar']);
					
					// NOTA(RECKER): Enviar invitación
					if ($user->email) {
						$user->invitation()->create([
							'invitation_key' => Str::random(40),
						]);

						$message = (new MailInvitation($user, $user->invitation->invitation_key))->onQueue('emails');
						Mail::to($user)->queue($message);
					}
				}
			}
		}

		// NOTA(RECKER): Ordenar seccion
		if ($curso) {
			CursoController::orderAlumnos($curso->id);
		}
	}
	
	public function chunkSize(): int
	{
		return 1000;
	}
	
	/**
	* @return array
	*/
	public function registerEvents(): array
	{
		return [
			BeforeSheet::class => function(BeforeSheet $event) {
				$this->sheetName = $event->getSheet()->getTitle();
			}
		];
	}
}
