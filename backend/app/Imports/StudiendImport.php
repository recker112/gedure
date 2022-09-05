<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Validators\Failure;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Events\AfterImport;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

// Mails
use App\Mail\Invitation as MailInvitation;

// Models
use App\Models\User;
use App\Models\Gedure\Curso;
use App\Models\Gedure\PersonalDataUser;

// Controllers
use App\Http\Controllers\Api\Gedure\CursoController;

// Notifications
use App\Notifications\Gedure\StudiendsUploadCompletedNotification;

class StudiendImport implements ToCollection, WithHeadingRow, WithEvents, SkipsEmptyRows, WithValidation, SkipsOnFailure
{
	use Importable;

	// NOTA(RECKER): Configuraciones del queue
	public $tries = 2;
	public $backoff = 0;
	
	// NOTA(RECKER): Vars
	protected $sheetName = '';
	protected User $importBy;
	protected int $inserts = 0;
	protected int $updateds = 0;
	protected array $errors = [];
	
	public function __construct(User $importBy) {
		$this->importBy = $importBy;
	}
	
	public function collection(Collection $rows)
	{
		$curso = Curso::firstWhere('code',$this->sheetName);
		
		// NOTA(RECKER): Limpiar curso
		if ($curso) {
			foreach($curso->alumnos as $alumno) {
				$alumno->delete();
			}
		}

		foreach ($rows as $row) 
		{
			// NOTA(RECKER): Parse texto
			$nombre = str_replace(',', '', trim($row['nomalum'])). ' ' .str_replace(',', '', trim($row['apelalum']));
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

					// NOTA(RECKER): Enviar correo para usuarios sin email registrado con anterioridad
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
					$this->updateds++;
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

					$this->inserts++;
				}
			}
		}

		// NOTA(RECKER): Ordenar seccion
		if ($curso) {
			CursoController::orderAlumnos($curso->id);
		}
	}

	public function rules(): array
	{
		return [
			'nced' => [
				'required',
				'integer',
			],
			'nomalum' => [
				'required',
				'string',
			],
			'apelalum' => [
				'required',
				'string',
			],
		];
	}

	/**
	 * @param Failure[] $failures
	 */
	public function onFailure(Failure ...$failures)
	{
		foreach($failures as $failure) {
			$errors[] = [
				'fila' => $failure->row(),
				'errors' => $failure->errors(),
			];
		}
		$this->errors = $errors;
	}
	
	/**
	* @return array
	*/
	public function registerEvents(): array
	{
		return [
			BeforeSheet::class => function(BeforeSheet $event) {
				$this->sheetName = $event->getSheet()->getTitle();
			},
			AfterImport::class => function(AfterImport $event) {
				$this->importBy->notify(new StudiendsUploadCompletedNotification(
					$this->inserts,
					$this->updateds,
					$this->errors,
				));
			}
		];
	}
}
