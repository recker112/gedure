<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Row;
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
use App\Models\Curso;

// Controllers
use App\Http\Controllers\Api\CursoController;

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
			// Parse name
			$row['apelnom'] = trim(ucwords(strtolower($row['apelnom'])));
			$arrayName = explode(',',$row['apelnom']);
			$arrayName[0] = explode(' ',$arrayName[0]);
			$arrayName[1] = explode(' ',trim($arrayName[1]));
			$row['apelnom'] = $arrayName[1][0].' '.$arrayName[0][0];
			
			// Parse username
			$row['nced'] = trim($row['nced']);
			$row['email'] = trim($row['email']);
			
			// Verificar que el correo no exista
			$emailFound = User::withTrashed()->firstWhere('email', $row['email']);
			if ($row['email'] !== '' && !$emailFound) {
				$email = $row['email'];
			}else {
				$email = null;
			}
			
			if ($user = User::withTrashed()->firstWhere('username',$row['nced'])) {
				if (!$user->trashed()) {
					$user->update([
						'name' => $row['apelnom'],
						'email' => $email,
					]);

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
				if ($curso) {
					$user = User::create([
						'username' => $row['nced'],
						'name' => $row['apelnom'],
						'email' => $email,
						'privilegio' => 'V-',
					]);

					$user->personalData(false)->create();

					$user->alumno()->create([
						'curso_id' => $curso->id,
						'n_lista' => 99,
					]);
					
					$user->givePermissionTo(['boleta_download', 'change_avatar']);
					
					if ($user->email) {
						$user->invitation()->create([
							'invitation_key' => Str::random(40),
						]);

						Mail::to($user)->queue((new MailInvitation($user, $user->invitation->invitation_key))->onQueue('emails'));
					}
				}
			}
		}
		// Ordenar seccion
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
