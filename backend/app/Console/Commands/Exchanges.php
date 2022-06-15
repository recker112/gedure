<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\WalletSystem\ExchangeRate;

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
    $exValues = [];
    $exchanges = file_get_contents("http://www.bcv.org.ve");

    // NOTA(RECKER): Buscar zona del USD
    $find_pos_usd = strpos($exchanges, "USD");

    // NOTA(RECKER): Obtener fragmento del USD
    $USD = substr($exchanges, $find_pos_usd, 200);

    // NOTA(RECKER): Obtener y formatear valores
    $reg = '/[0-9]{1,},[0-9]{8}/';
    $USD = preg_match($reg, $USD, $resultUSD);
    $exValues['USD'] = str_replace(',', '.', $resultUSD[0]);

    $i = 0;
    foreach ($exValues as $key => $value) {
      $lastReg = ExchangeRate::where('type', $key)->latest()->first();
      $valueBCV = round(floatval($exValues[$key]), 2);

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
    } else {
      $this->info('ExchangeRate: No hay actualizaciones que realizar');
    }
  }
}
