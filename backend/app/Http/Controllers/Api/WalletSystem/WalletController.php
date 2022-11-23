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
use App\Http\Requests\TableRequest;

// Notifications
use App\Notifications\WalletSystem\TransferCompletedNotification;

class WalletController extends Controller
{
  public function index(TableRequest $request)
  {
    // Variables
		$search = urldecode($request->search);
		$perPage = $request->per_page;

    $wallets = User::select(['id','username','privilegio'])
      ->with('wallet')
			->has('wallet')
			->where('username', 'like', '%'.$search.'%')
			->orderBy('id', 'desc')
			->paginate($perPage);

    // Ocultar datos innecesarios
		$data = $wallets->getCollection();
		$data->each(function ($item) {
			$item->makeHidden(['email', 'name', 'avatar', 'actived_at']);
		});
		$wallets->setCollection($data);

    return response()->json([
			'data' => $wallets->items(),
			'totalRows' => $wallets->total(),
		], 200);
  }

  public function edit(Request $request, Wallet $wallet)
  {
    $total_amount = 0.00;
		$user = $wallet->user;

    foreach($request->data as $action) {
			$total_amount += $action['amount'];
		}

    $payload = [
			'actions' => $request->data,
		];

    // NOTA(RECKER): Verificar balance negativo
		if ($wallet->balance + $total_amount < 0) {
			return response()->json([
				'msg' => 'La cuenta no puede quedar con balance negativo'
			], 400);
		}

    $transaction = $user->transactions()->create([
			'type' => 'manual',
			'payload' => $payload,
			'amount' => $total_amount,
			'previous_balance' => $user->wallet->balance,
			'payment_method' => 'otros',
		]);
		
		// NOTA(RECKER): Agregar saldo
		$user->wallet->balance += $total_amount;
		$user->wallet->save();

    // Notificar a otro usuario
    $user->notify(new TransferCompletedNotification($total_amount,$user->wallet->balance, 1));

    // NOTA(RECKER): Log
		$payload = [
			'username' => $user->privilegio.$user->username,
			'name' => $user->name,
      'actions' => $request->data,
		];
		$request->user()->logs()->create([
			'action' => "Monedero editado",
			'payload' => $payload,
			'type' => 'wallet'
		]);
		
		return response()->json([
			'msg' => 'Transacción realizada'
		], 200);
  }

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
    $userTransfer->notify(new TransferCompletedNotification($reqAmount,$userTransfer->wallet->balance));

    // NOTA(RECKER): Log
		$payload = [
			'username' => $user->privilegio.$user->username,
			'name' => $user->name,
      'amount' => $reqAmount,
		];
		$request->user()->logs()->create([
			'action' => "Transferencia de saldo",
			'payload' => $payload,
			'type' => 'wallet'
		]);

    return response()->json([
      'msg' => 'Transferencia realizada',
      'balance' => $user->wallet->balance,
		], 200);
  }
}
