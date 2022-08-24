<?php

namespace App\Jobs\Gedure;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Smalot\PdfParser\Parser;
use VIPSoft\Unzip\Unzip;
use Throwable;

// Models
use App\Models\User;
use App\Models\Gedure\Boleta;

// Notification
use App\Notifications\SocketsNotification;
use App\Notifications\Gedure\ProcessBoletasCompletedNotification;

class BoletasProcess implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    // NOTA(RECKER): Configuraciones del queue
	public $backoff = 0;
	
	// NOTA(RECKER): Vars
    protected User $uploadBy;
    protected string $zipPath;
    protected int $lapso;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $uploadBy, string $zipPath, int $lapso)
    {
        $this->uploadBy = $uploadBy;
        $this->zipPath = $zipPath;
        $this->lapso = $lapso;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {	
        // NOTA(RECKER): Limpiar archivos
		Storage::delete(Storage::files('unzipped/pdf'));

		$unzipper = new Unzip();
		$unzipper->extract(Storage::path($this->zipPath), Storage::path('unzipped/pdf'));
		$files = Storage::allFiles('unzipped/pdf');
		
		$i = 0;
        $u = 0;
        $b = '';
		foreach($files as $file) {
			// NOTA(RECKER): Traducir PDF a texto
			$parser = new Parser();
			$pdf = $parser->parseFile(Storage::path($file));
			$text = $pdf->getText();
			$text = str_replace("\t", "", $text);
            $text = str_replace(" ", "", $text);
			
			// NOTA(RECKER): Obtener cédulas existentes en el PDF
			$reg = '/\d{11}|\d{10}|\d{8}/';
			$is_match = preg_match($reg, $text, $usersPDF);
			$userExist = null;
            if($file === 'unzipped/pdf/Boleta_3-A_3_lapso.pdf') {
                dd($usersPDF);
            }

            // NOTA(RECKER): Revisar que alguna cédula esté registrada en el sistema y sea un alumno.
            $s = 0;
            foreach($usersPDF as $user) {
                $userExist = User::has('alumno')
                ->firstWhere('username', $usersPDF[$s]);

                if ($userExist) {
                    break 1;
                }
            }

			// NOTA(RECKER): Mover PDF
			if ($userExist) {
                // NOTA(RECKER): Path de la boleta
				$filePath = "users/$userExist->id/boletas/{$userExist->alumno->curso->code}/lapso_{$this->lapso}_{$userExist->alumno->curso->code}.pdf";
				
                // NOTA(RECKER): Verificar si la boleta está ya en el sistema
				if ($boletaExist = Boleta::firstWhere('boleta', $filePath)) {
					$boletaExist->boleta = $filePath;
                    $boletaExist->updated_at = now();
                    $boletaExist->save();

                    // NOTA(RECKER): Verificar curso
                    $title = 'Boleta actualizada';
                    $content = "";
                    $curso = strpos($boletaExist->curso->code, 'G');

                    if ($curso === false) {
                        $content = "Se ha actualizado la boleta {$boletaExist->curso->curso} año {$boletaExist->curso->seccion} - {$this->lapso}° lapso";
                    }else {
                        $content = "Se ha actualizado la boleta {$boletaExist->curso->curso} grado {$boletaExist->curso->seccion} - {$this->lapso}° lapso";
                    }

                    $u++;
				}else {
                    $boleta = $userExist->boletas()->create([
                        'boleta' => $filePath,
                        'lapso' => $this->lapso,
                        'curso_id' => $userExist->alumno->curso_id
                    ]);

                    // NOTA(RECKER): Verificar curso
                    $title = 'Nueva boleta disponible';
                    $content = "";
                    $curso = strpos($boleta->curso->code, 'G');

                    if ($curso === false) {
                        $content = "Se te ha cargado la boleta {$boleta->curso->curso} año {$boleta->curso->seccion} - {$this->lapso}° lapso";
                    }else {
                        $content = "Se te ha cargado la boleta {$boleta->curso->curso} grado {$boleta->curso->seccion} - {$this->lapso}° lapso";
                    }

                    $i++;
                }

                // NOTA(RECKER): Notificar a user
                $userExist->notify(new SocketsNotification($title, $content));

				
                // NOTA(RECKER): Mover PDF
				Storage::move($file, $filePath);
			}
		}

        // NOTA(RECKER): Limpiar archivos
		Storage::delete(Storage::allFiles('unzipped'));

        // NOTA(RECKER): Notificar a usuario
        $this->uploadBy->notify(new ProcessBoletasCompletedNotification($i, $u));
		
		$payload = [
			'boletas' => $i + $u,
		];

		$this->uploadBy->logs()->create([
			'action' => "Boletas cargadas",
			'payload' => $payload,
			'type' => 'gedure'
		]);
    }

    public function failed(Throwable $exception)
    {
        $this->uploadBy->notify(new SocketsNotification('Error al cargar boletas', 'El sistema no ha podido terminar de procesar las boletas cargadas, es posible que alguna boleta esté corrupta.', ['error' => $exception->getMessage()]));
    }
}
