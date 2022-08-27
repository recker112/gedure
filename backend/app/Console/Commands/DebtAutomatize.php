<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

// Models
use App\Models\User;
use App\Models\WalletSystem\DebtLote;
use App\Models\WalletSystem\Debt;
use App\Models\WalletSystem\ExchangeRate;

// Notifications
use App\Notifications\SocketsNotification;

class DebtAutomatize extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'debt:automatize';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deudas automáticas';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Variables
        $studiends = User::where('privilegio', 'V-')->get();
        $lastDebtLote = DebtLote::orderBy('available_on','desc')->first();
        $debtsPending = Debt::where('status', 'futura')
            ->whereHas('debt_lote', function ($query) {
                $query->where('available_on', '<=', now());
            })
            ->get();
        $initDate = now()->parse('September 01');

        // Exchange rate
        $exrate = ExchangeRate::where('type', 'USD')->latest()->first();
        $exAmountDebt = 4;
        $exAmountIns = 2;

        // Verificar debts pendientes
        $d = 0;
        foreach ($debtsPending as $debt) {
            $debt->status = 'no pagada';
            $debt->save();
            $d++;
        }
        
        // Recorrer 12 meses
        $i = 0;
        while ($initDate <= now()->parse('August 01')->add(1,'year') && $lastDebtLote?->available_on <= now()) {
            // Variables
            $year = now()->year.'-'.now(1,'year')->year+1;
            $reason = "Mensualidad ".ucwords($initDate->monthName).' '.$year;
            $amountDebt = $exAmountDebt * $exrate->amount;
            $amountIns = $exAmountIns * $exrate->amount;

            // Crear lote de deuda con la inscripción
            if ($initDate->month === 9) {
                // Habilitar deuda desde julio
                $initDate->sub(2,'month');

                // Lote de deuda
                $lote = DebtLote::create([
                    'reason' => $reason,
                    'amount_to_pay' => $amountDebt,
                    'exchange_rate_id' => $exrate->id,
                    'exchange_amount' => $exAmountDebt,
                    'available_on' =>  $initDate,
                    'important' => 0,
                ]);
    
                // Registrar deudas
                foreach($studiends as $user) {
                    $user->debts()->create([
                        'debt_lote_id' => $lote->id,
                        'status' => $initDate <= now() ? 'no pagada' : 'futura',
                    ]);
                }
    
                // Lote de deuda para inscripción
                $lote = DebtLote::create([
                    'reason' => 'Inscripción '.$year,
                    'amount_to_pay' => $amountIns,
                    'exchange_rate_id' => $exrate->id,
                    'exchange_amount' => $exAmountIns,
                    'available_on' =>  $initDate,
                    'important' => 1,
                ]);
    
                // Registrar deudas
                foreach($studiends as $user) {
                    $user->debts()->create([
                        'debt_lote_id' => $lote->id,
                        'status' => $initDate <= now() ? 'no pagada' : 'futura',
                    ]);
                }

                // Acomodar fecha
                $initDate->add(2,'month');
            } else if ($initDate->month === 8) {
                // Habilitar deuda desde julio
                $initDate->sub(1,'month');

                // Crear lote de deuda para agosto
                $lote = DebtLote::create([
                    'reason' => $reason,
                    'amount_to_pay' => $amountDebt,
                    'exchange_rate_id' => $exrate->id,
                    'exchange_amount' => $exAmountDebt,
                    'available_on' =>  $initDate,
                ]);

                foreach($studiends as $user) {
                    $user->debts()->create([
                        'debt_lote_id' => $lote->id,
                        'status' => $initDate <= now() ? 'no pagada' : 'futura',
                    ]);
                }

                // Acomodar fecha
                $initDate->add(1,'month');
            } else {
                $lote = DebtLote::create([
                    'reason' => $reason,
                    'amount_to_pay' => $amountDebt,
                    'exchange_rate_id' => $exrate->id,
                    'exchange_amount' => $exAmountDebt,
                    'available_on' =>  $initDate,
                ]);

                foreach($studiends as $user) {
                    $user->debts()->create([
                        'debt_lote_id' => $lote->id,
                        'status' => $initDate <= now() ? 'no pagada' : 'futura',
                    ]);
                }
            }

            // Incrementar mes
            $initDate->add(1,'month');
            $i++;
        }

        if ($i) {
            // Notificar a estudiantes
            Notification::send($studiends, new SocketsNotification('Nuevas deudas disponibles', 'Se han generado las deudas del siguiente año escolar, recuerde mantenerse al día con los pagos.'));
        }
        
        $this->info('Total de meses registrados: '.$i);
        $this->info('Total de deudas actualizadas: '.$d);
        $notifys = $i ? $studiends->count() : 0;
        $this->info("Total de notificaciones enviadas: {$notifys}");
        return 0;
    }
}
