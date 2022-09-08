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
            $exonerado = $debt->user->can('account_exonerada');
            $debt->status = $exonerado ? 'exonerada' : 'no pagada';
            $debt->save();

            if ($exonerado) {
                // Generar transacciones
                $id = $debt->debt_lote->id;
                $payload = [
                    'actions' => [
                        [
                            'reason' => $debt->debt_lote->reason." (#$id)",
                            'amount' => $debt->debt_lote->amount_to_pay,
                        ]
                    ],
                ];

                $transaction = $debt->user->transactions()->create([
                    'type' => 'deuda pagada',
                    'payload' => $payload,
                    'amount' => $debt->debt_lote->amount_to_pay,
                    'previous_balance' => $debt->user->wallet->balance,
                    'payment_method' => 'otros',
                    'exonerado' => 1,
                ]);
        
                // Relación polimórfica
                $debt->transaction()->save($transaction);
            }
            $d++;
        }
        
        // Recorrer 12 meses
        $i = 0;
        $exo = [];
        while ($initDate <= now()->parse('August 01')->add(1,'year') && $lastDebtLote?->available_on <= now()) {
            // Variables
            $year = now()->year .'-'. now()->year+1;
            $reason = "Mensualidad ".ucwords($initDate->monthName).' '.$year;
            $amountDebt = $exAmountDebt * $exrate->amount;
            $amountIns = $exAmountIns * $exrate->amount;

            // Crear lote de deuda con la inscripción
            if ($initDate->month === 9) {
                // Creado para el mes de septiembre
                $created = now()->parse($initDate);
                // Habilitar deuda desde julio
                $available_on = now()->parse($initDate)->sub(2,'month');

                // Lote de deuda
                $lote = DebtLote::create([
                    'reason' => $reason,
                    'amount_to_pay' => $amountDebt,
                    'exchange_rate_id' => $exrate->id,
                    'exchange_amount' => $exAmountDebt,
                    'available_on' =>  $available_on,
                    'created_at' => $created,
                    'important' => 0,
                ]);
    
                // Registrar deudas
                foreach($studiends as $user) {
                    $debt = $user->debts()->create([
                        'debt_lote_id' => $lote->id,
                        'status' => $initDate <= now() ? 'no pagada' : 'futura',
                    ]);
                    
                    // Agregar exonerado
                    $exonerado = $user->can('account_exonerada');
                    if ($exonerado && $initDate <= now()) {
                        $exo[] = $debt->id;
                    }
                }
    
                // Lote de deuda para inscripción
                $lote = DebtLote::create([
                    'reason' => 'Inscripción '.$year,
                    'amount_to_pay' => $amountIns,
                    'exchange_rate_id' => $exrate->id,
                    'exchange_amount' => $exAmountIns,
                    'available_on' =>  $available_on,
                    'created_at' => $created,
                    'important' => 1,
                ]);
    
                // Registrar deudas
                foreach($studiends as $user) {
                    $debt = $user->debts()->create([
                        'debt_lote_id' => $lote->id,
                        'status' => $initDate <= now() ? 'no pagada' : 'futura',
                    ]);

                    // Agregar exonerado
                    $exonerado = $user->can('account_exonerada');
                    if ($exonerado && $initDate <= now()) {
                        $exo[] = $debt->id;
                    }
                }
            } else if ($initDate->month === 8) {
                // Creado para el mes de agosto
                $created = now()->parse($initDate);
                // Habilitar deuda desde julio
                $available_on = now()->parse($initDate)->sub(1,'month');

                // Crear lote de deuda para agosto
                $lote = DebtLote::create([
                    'reason' => $reason,
                    'amount_to_pay' => $amountDebt,
                    'exchange_rate_id' => $exrate->id,
                    'exchange_amount' => $exAmountDebt,
                    'available_on' =>  $available_on,
                    'created_at' => $created,
                ]);

                foreach($studiends as $user) {
                    $debt = $user->debts()->create([
                        'debt_lote_id' => $lote->id,
                        'status' => $initDate <= now() ? 'no pagada' : 'futura',
                    ]);

                    // Agregar exonerado
                    $exonerado = $user->can('account_exonerada');
                    if ($exonerado && $initDate <= now()) {
                        $exo[] = $debt->id;
                    }
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
                    'created_at' =>  $initDate,
                ]);

                foreach($studiends as $user) {
                    $debt = $user->debts()->create([
                        'debt_lote_id' => $lote->id,
                        'status' => $initDate <= now() ? 'no pagada' : 'futura',
                    ]);

                    // Agregar exonerado
                    $exonerado = $user->can('account_exonerada');
                    if ($exonerado && $initDate <= now()) {
                        $exo[] = $debt->id;
                    }
                }
            }

            // Incrementar mes
            $initDate->add(1,'month');
            $i++;
        }

        if ($i) {
            foreach ($exo as $id) {
                $debt = Debt::find($id);
                $debt->status = 'exonerada';
                $debt->save();

                // Generar transacciones
                $id = $debt->debt_lote->id;
                $payload = [
                    'actions' => [
                        [
                            'reason' => $debt->debt_lote->reason." (#$id)",
                            'amount' => $debt->debt_lote->amount_to_pay,
                        ]
                    ],
                ];

                $transaction = $user->transactions()->create([
                    'type' => 'deuda pagada',
                    'payload' => $payload,
                    'amount' => $debt->debt_lote->amount_to_pay,
                    'previous_balance' => $debt->user->wallet->balance,
                    'payment_method' => 'otros',
                    'exonerado' => 1,
                ]);
        
                // Relación polimórfica
                $debt->transaction()->save($transaction);
            }

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
