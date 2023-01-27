<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

// Models
use App\Models\WalletSystem\ExchangeRate;
use App\Models\Gedure\Log;

use Carbon\Carbon;

class Exchanges extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'exchanges:prices';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Obtener conversiones a bolívares';

  /**
   * Execute the console command.
   *
   * @return int
   */
  public function handle()
  {
    $arrContextOptions=array(
      "ssl"=>array(
        "verify_peer"=>false,
        "verify_peer_name"=>false,
      ),
    );
    $exValues = [];
    $exchanges = file_get_contents("https://www.bcv.org.ve", false, stream_context_create($arrContextOptions));

    // NOTA(RECKER): Buscar zona del USD
    $find_pos_usd = strpos($exchanges, "USD");

    // NOTA(RECKER): Obtener fragmento del USD
    $USD = substr($exchanges, $find_pos_usd, 200);

    // NOTA(RECKER): Obtener y formatear valores
    $reg = '/[0-9]{1,},[0-9]{8}/';
    $USD = preg_match($reg, $USD, $resultUSD);
    $exValues['USD'] = str_replace(',', '.', $resultUSD[0]);
    $this->info('Tasa obtenida: '.$exValues['USD']);

    $i = 0;
    foreach ($exValues as $key => $value) {
      $lastReg = ExchangeRate::where('type', $key)->latest()->first();
      $valueBCV = round(floatval($exValues[$key]), 2);
      $this->info("Tasa parseada de $key: $valueBCV");

      if (!$lastReg || $lastReg->amount !== $valueBCV) {
        ExchangeRate::create([
          'type' => $key,
          'amount' => $valueBCV,
        ]);

        $i++;
      }
    }
    
    if ($i) {
      $this->info('ExchangeRate: Tasas de cambio actualizadas');

      Log::create([
        'action' => 'Precio del Dolar actualizado',
        'user_id' => null,
        'payload' => null,
        'type' => 'gedure',
      ]);
    } else {
      $this->info('ExchangeRate: No hay actualizaciones que realizar');
    }
    $this->info('');
  }
}
