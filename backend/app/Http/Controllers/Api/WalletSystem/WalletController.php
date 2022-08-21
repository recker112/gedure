<?php

namespace App\Http\Controllers\Api\WalletSystem;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

// Models
use App\Models\User;
use App\Models\WalletSystem\Wallet;

// Request
use App\Http\Requests\WalletSystem\Wallet\VerifyTransferRequest;

class WalletController extends Controller
{
  /**
   * Determine whether the user can permanently delete the model.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Auth\Access\Response
   */
  public function verifyTransfer(VerifyTransferRequest $request)
  {
    $this->authorize('verifyWallet', Wallet::class);

    $user = $request->user();
    $reqUsername = $request->username;
    $reqAmount = $request->amount_to_transfer;

    // Buscar usuario
    $userFind = User::with(['alumno.curso:id,code'])->firstWhere('username', $reqUsername);
    $userFind?->alumno?->curso->makeVisible(['code']);

    // Verificar usuario a transferir
    if (!$userFind || $user->id === $userFind->id) {
      return response()->json([
        'msg' => 'Usuario no encontrado'
      ], 404);
    }

    // Verificar saldo disponible
    if ($user->wallet->balance < $reqAmount) {
      return response()->json([
        'msg' => 'Saldo insuficiente'
      ], 400);
    }

    return response()->json([
      'name' => $userFind->name,
      'curso' => $userFind?->alumno?->curso,
		], 200);
  }
}
