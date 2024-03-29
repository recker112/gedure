<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

// Models
use App\Models\User;
use App\Models\Gedure\Log;
use App\Models\WalletSystem\DebtLote;
use App\Models\WalletSystem\Debt;
use App\Models\WalletSystem\ExchangeRate;

class DebtUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'debt:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Actualizar deudas';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $loteDebts = DebtLote::with('exchange_rate')
            ->has('exchange_rate')
            ->whereHas('debts', function ($query) {
                $query->where('status', '!=', 'pagada');
            })
            ->get();

        $i = 0;
        foreach ($loteDebts as $loteDebt) {
            $exRate = ExchangeRate::latest()->firstWhere('type', $loteDebt->exchange_rate->type);

            $loteDebt->amount_to_pay = $loteDebt->exchange_amount * $exRate->amount;
            $loteDebt->exchange_rate_id = $exRate->id;
            $loteDebt->save();
            $i++;
        }

        $this->info('Total de deudas actualizadas: '.$i);
        
		Log::create([
			'action' => 'Precios actualizados',
			'user_id' => null,
			'payload' => null,
			'type' => 'gedure',
		]);
        return Command::SUCCESS;
    }
}
