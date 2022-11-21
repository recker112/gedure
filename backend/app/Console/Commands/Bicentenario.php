<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

// Excel
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use App\Imports\BankTransactionImport;

// Jobs
use App\Jobs\WalletSystem\RegisterLogsGedure;

// Models
use App\Models\User;
use App\Models\Gedure\Log;
use App\Models\WalletSystem\BankAccount;
use App\Models\WalletSystem\Transaction;

class Bicentenario extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bicentenario:get';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Descargar transacciones del banco';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
            $this->info('Iniciando proceso de carga de transacciones bancaria...');

            // Get cookies
            $response = Http::withoutVerifying()->get('https://bicentenarioenlinea.bicentenariobu.com.ve/?p=1');

            $cookies = $response->headers();

            $xsrf = explode(';',$cookies['Set-Cookie'][0])[0];
            $session = explode(';',$cookies['Set-Cookie'][1])[0];

            $headers = [
                'Cookie' => "$xsrf; $session",
            ];

            if (!isset($xsrf) && !isset($session)) {
                throw new \Exception('No se pudieron obtener las cookies');
            }

            // Check data
            $data = [
                'tipodocben' => env('BB_TIPODOCBEN'),
                'documento' => env('BB_DOCUMENTO'),
            ];

            $response = Http::withoutVerifying()
                ->withHeaders($headers)
                ->post('https://bicentenarioenlinea.bicentenariobu.com.ve/lg/chk', $data);

            $check = $response->ok();

            // Get Cookies
            $cookies = $response->headers();

            $xsrf = explode(';',$cookies['Set-Cookie'][0])[0];
            $session = explode(';',$cookies['Set-Cookie'][1])[0];

            $headers = [
                'Cookie' => "$xsrf; $session",
            ];

            if (!isset($xsrf) && !isset($session)) {
                throw new \Exception('No se pudieron obtener las cookies');
            }

            $this->info('Check login: PASS');

            // Login
            $data = [
                'u' => env('BB_USER'),
                'p' => env('BB_PASSWORD'),
                'd' => 'J'.env('BB_DOCUMENTO'),
            ];

            $response = HTTP::withoutVerifying()
                ->withHeaders($headers)
                ->post('https://bicentenarioenlinea.bicentenariobu.com.ve/lg/exe', $data);

            $login = $response->ok();

            // Get Cookies
            $cookies = $response->headers();

            $xsrf = explode(';',$cookies['Set-Cookie'][0])[0];
            $session = explode(';',$cookies['Set-Cookie'][1])[0];

            $headers = [
                'Cookie' => "$xsrf; $session",
            ];

            if (!isset($xsrf) && !isset($session)) {
                throw new \Exception('No se pudieron obtener las cookies');
            }

            $this->info('Login: PASS');

            $date = now()->timezone('GMT-4')->sub(2,'day')->format('d-m-Y');

            // Download Excel
            $response = HTTP::withoutVerifying()
                ->withHeaders($headers)
                ->get('https://bicentenarioenlinea.bicentenariobu.com.ve/c/c/e3/'.env('BB_ACCOUNT').'/'.$date.'/'.$date);

            $download = $response->ok();

            if (!$download) {
                throw new \Exception('No se pudo descargar el estado de cuenta');
            }else {
                $reader = new \PhpOffice\PhpSpreadsheet\Reader\Html();
                $spreadsheet = $reader->loadFromString($response->body());

                $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
                $writer->save(base_path('storage/app/estado.xlsx')); 

                $this->info('Convertir y guardar excel: PASS');
            }

            // Logout
            $response = HTTP::withoutVerifying()
                ->withHeaders($headers)
                ->post('https://bicentenarioenlinea.bicentenariobu.com.ve/logout');

            $this->info('Logout: PASS');

            $bank_account = BankAccount::firstWhere('n_account', env('BB_ACCOUNT'));

            if (!$bank_account) {
                throw new \Exception('Cuenta bancaria no creada');
            }

            $file = new File(base_path('storage/app/estado.xlsx'));

            $result = (new BankTransactionImport($bank_account->id))->queue($file)->allOnQueue('high')->chain([
                new RegisterLogsGedure("Carga de transacciones realizada")
            ]);

            $this->info('Crear job para procesar transacciones: PASS');

            $this->info('Estado de cuenta del día '.$date.' actualizada');

            Log::create([
                'action' => 'Estado de cuenta descargada',
                'user_id' => null,
                'type' => 'gedure',
            ]);
        } catch (\Throwable $th) {
            $this->info('Proceso terminado por error interno.');

            $payload = [
                'error' => $th->getMessage(),
            ];

            Log::create([
                'action' => 'Estado de cuenta fallido',
                'user_id' => null,
                'payload' => $payload,
                'type' => 'gedure',
            ]);
        }

        return Command::SUCCESS;
    }
}
