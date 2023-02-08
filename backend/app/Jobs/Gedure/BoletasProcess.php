<?php

namespace App\Jobs\Gedure;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Jmleroux\PDFMerger\PDFMerger;
use Illuminate\Support\Str;
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
    
    /**
     * Configuración de queues
     */
	public $backoff = 0;
	
	/**
     * Vars
     */
    protected User $uploadBy;
    protected string $zipPath;
    protected int $lapso;
    protected int $inserts = 0;
    protected int $updateds = 0;

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
        /**
         * Limpiar carpeta PDF para evitar cargar archivos ya usados.
         */
		Storage::delete(Storage::files('unzipped/pdf'));

        /**
         * Descomprimir archivo .zip
         */
		$unzipper = new Unzip();
		$unzipper->extract(Storage::path($this->zipPath), Storage::path('unzipped/pdf'));

        /**
         * Separar archivos PDF que tengan más de 1 página
         */
		$this->splitPDFs();

        /**
         * Cargar archivos PDF
         */
		$this->uploadPDFs();

        /**
         * Limpiar archivos usados para el proceso
         */
		Storage::delete(Storage::allFiles('unzipped'));

        /**
         * Notificar al usuario sobre el proceso de las boletas
         */
        $this->uploadBy->notify(new ProcessBoletasCompletedNotification($this->inserts, $this->updateds));
		
		$payload = [
			'boletas' => $this->inserts + $this->updateds,
		];

		$this->uploadBy->logs()->create([
			'action' => "Boletas cargadas",
			'payload' => $payload,
			'type' => 'boleta'
		]);
    }
    
    public function splitPDFs()
    {
        /**
         * Obtener archivos PDF
         */
        $files = Storage::allFiles('unzipped/pdf');

        foreach($files as $file) {
            /**
             * Variables
             */
            $filePath = Storage::path($file);
            $fileName = explode('/', $filePath);
            $fileName = $fileName[count($fileName) - 1];
            $fileName = explode('.', $fileName)[0];

            /**
             * Leer PDF
             */
            $parser = new Parser();
			$pdf = $parser->parseFile($filePath);
            $pages = $pdf->getDetails()['Pages'];

            /**
             * Pasar al siguiente archivo si no tiene más de 1 página.
             */
            if ($pages <= 1) {
                continue;
            }

            /**
             * Separar archivos
             */
            for ($i=1; $i <= $pages; $i++) {
                $pdfMerger = new PDFMerger();
                $pdfMerger->addPDF($filePath, $i);
                $pdfMerger->merge('file', Storage::path('unzipped/pdf/'.Str::random(10).'.pdf'));
            }

            /**
             * Eliminar archivo ya dividido
             */
            Storage::delete($file);
        }
    }

    public function uploadPDFs()
    {
        /**
         * Obtener archivos PDF
         */
        $files = Storage::allFiles('unzipped/pdf');
        
        foreach($files as $file) {
            /**
             * Leer PDF
             */
            $parser = new Parser();
			$pdf = $parser->parseFile(Storage::path($file));

            /**
             * Obtener texto del PDF y acomodarlo para leerlo mejor
             */
			$text = $pdf->getText();
			$text = str_replace("\t", "", $text);
            $text = str_replace(" ", "", $text);

            /**
             * Buscar cédulas dentro del texto.
             */
            $reg = '/\d{11}|\d{10}|\d{8}/';
			$is_match = preg_match($reg, $text, $usersPDF);


            /**
             * Buscar cédulas en la DB
             */
            $userExist = null;
            $u = 0;
            foreach($usersPDF as $user) {
                $userExist = User::has('alumno')
                ->firstWhere('username', $usersPDF[$u]);

                if ($userExist) {
                    break;
                }
                $u++;
            }

            /**
             * Revisar siguiente archivo si no se ha encontrado un usuario
             */
            if (!$userExist) {
                continue;
            }

            /**
             * Buscar boleta en el sistema
             */
            $filePath = "users/$userExist->id/boletas/{$userExist->alumno->curso->code}/lapso_{$this->lapso}_{$userExist->alumno->curso->code}.pdf";
            $boletaExist = Boleta::firstWhere('boleta', $filePath);

            /**
             * Verificar si la boleta existe en el sistema
             */
            if ($boletaExist) {
                $boletaExist->boleta = $filePath;
                $boletaExist->save();

                /**
                 * Verificar curso para enviar notificación
                 */
                $title = 'Boleta actualizada';
                $content = "";
                $curso = strpos($boletaExist->curso->code, 'G');

                if ($curso === false) {
                    $content = "Se ha actualizado la boleta {$boletaExist->curso->curso} año {$boletaExist->curso->seccion} - {$this->lapso}° lapso";
                }else {
                    $content = "Se ha actualizado la boleta {$boletaExist->curso->curso} grado {$boletaExist->curso->seccion} - {$this->lapso}° lapso";
                }

                $this->updateds++;
            } else {
                /**
                 * Crear una nueva boleta
                 */
                $boleta = $userExist->boletas()->create([
                    'boleta' => $filePath,
                    'lapso' => $this->lapso,
                    'curso_id' => $userExist->alumno->curso_id
                ]);

                /**
                 * Verificar curso para enviar notificación
                 */
                $title = 'Nueva boleta disponible';
                $content = "";
                $curso = strpos($boleta->curso->code, 'G');

                if ($curso === false) {
                    $content = "Se te ha cargado la boleta {$boleta->curso->curso} año {$boleta->curso->seccion} - {$this->lapso}° lapso";
                }else {
                    $content = "Se te ha cargado la boleta {$boleta->curso->curso} grado {$boleta->curso->seccion} - {$this->lapso}° lapso";
                }

                $this->inserts++;
            }

            /**
             * Notificar al usuario de la boleta
             */
            $userExist->notify(new SocketsNotification($title, $content));

				
            /**
             * Mover el archivo en la carpeta PDF ($file) a
             * la ruta donde se ubicará la boleta en el sistema
             * ($filePath)
             */
            Storage::move($file, $filePath);
        }
    }

    public function failed(Throwable $exception)
    {
        $this->uploadBy->notify(new SocketsNotification('Error al cargar boletas', 'El sistema no ha podido terminar de procesar las boletas cargadas, es posible que alguna boleta esté corrupta.', ['error' => $exception->getMessage()]));
    }
}
