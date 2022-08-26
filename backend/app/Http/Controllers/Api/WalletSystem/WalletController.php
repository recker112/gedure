<?php

namespace App\Http\Controllers\Api\WalletSystem;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

// Models
use App\Models\User;
use App\Models\WalletSystem\Wallet;

// Request
use App\Http\Requests\WalletSystem\Wallet\VerifyTransferRequest;
use App\Http\Requests\WalletSystem\Wallet\ConfirmTransferRequest;

// Notifications
use App\Notifications\WalletSystem\TransferCompletedNotification;

class WalletController extends Controller
{
  public function verifyTransfer(VerifyTransferRequest $request)
  {
    $this->authorize('verifyWallet', Wallet::class);

    $user = $request->user();
    $reqUsername = $request->username;
    $reqAmount = $request->amount_to_transfer;

    // Buscar usuario
    $userFind = User::with(['alumno.curso:id,code'])->firstWhere('username', $reqUsername);
    $userFind?->alumno?->curso->makeVisible(['code']);

    return response()->json([
      'name' => $userFind->name,
      'curso' => $userFind?->alumno?->curso,
		], 200);
  }

  public function confirmTransfer(ConfirmTransferRequest $request)
  {
    $this->authorize('verifyWallet', Wallet::class);

    $user = $request->user();
    $reqAmount = $request->amount_to_transfer;
    $reqUsername = $request->username;
    $userTransfer = User::firstWhere('username', $reqUsername);
    $reason = $request->reason;

    // Generar transacciones
    $payload1 = [
			'actions' => [
				[
					'reason' => $reason ? trim($reason) : "Transferencia de saldo entre cuentas",
					'amount' => $reqAmount,
				]
      ],
      'extra_data' => [
        'sender' => true,
        'username' => $userTransfer->privilegio.$userTransfer->username,
        'name' => $userTransfer->name,
      ]
		];
    $payload2 = [
			'actions' => [
				[
					'reason' => $reason ? trim($reason) : "Transferencia de saldo entre cuentas",
					'amount' => $reqAmount,
				]
      ],
      'extra_data' => [
        'sender' => false,
        'username' => $user->privilegio.$user->username,
        'name' => $user->name,
      ]
		];

    $transaction1 = $user->transactions()->create([
      'type' => 'transferencia de saldo',
			'payload' => $payload1,
			'amount' => $reqAmount,
			'previous_balance' => $user->wallet->balance,
			'payment_method' => 'saldo disponible',
		]);

    $transaction2 = $userTransfer->transactions()->create([
			'type' => 'transferencia de saldo',
			'payload' => $payload2,
			'amount' => $reqAmount,
			'previous_balance' => $userTransfer->wallet->balance,
			'payment_method' => 'saldo disponible',
		]);

    // Transferir saldo
    $user->wallet->balance -= $reqAmount;
    $user->wallet->save();
    $userTransfer->wallet->balance += $reqAmount;
    $userTransfer->wallet->save();

    // Notificar a otro usuario
    $userTransfer->notify(new TransferCompletedNotification($reqAmount));

    return response()->json([
      'msg' => 'Transferencia realizada',
      'balance' => $user->wallet->balance,
		], 200);
  }
}
