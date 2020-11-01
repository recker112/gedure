<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;

// Auth Class
use Illuminate\Support\Facades\Auth;

// Models
use App\Models\Block;
use App\Models\Log;

class LoginController extends Controller
{
  public function login(LoginRequest $request)
	{
		// Verificar baneos
		$blockStatus = Block::getStatus($request->cedula);
		
		if ($blockStatus !== 'ok') {
			
		}
		
		$credenciales = $request->only(['cedula', 'password']);
		
		$verifyAuth = Auth::attempt($credenciales);
		
		if (!$verifyAuth) {
			$jsonMessage = Block::checkAttemps($request->cedula);
			return response()->json($jsonMessage, 400);
		}
		
		$user = $request->user();
		
		// Token
		if ($user->privilegio === 'A-') {
			$tokenResult = $user->createToken($user->cedula.' access', ['admin']);
		}else if ($user->privilegio === 'P-') {
			$tokenResult = $user->createToken($user->cedula.' access', ['profesor']);
		}else {
			$tokenResult = $user->createToken($user->cedula.' access', ['user']);
		}
    $token = $tokenResult->token;
		
		// expired_at
		if($request->checkbox) {
			$token->expires_at =now()->addMonths(6);
		}
		
		$token->save();
		
		Log::create([
			'user_id' => $user->id,
			'action' => "Inicio de sesión.",
			'type' => 'session'
		]);

		//Regresar datos
		return response()->json([
			'access_key' => $tokenResult->accessToken,
			'user' => $user,
			'permissions' => null
		], 200);
	}
	
	public function relogin()
	{
		$user = request()->user();
		
		return response()->json([
			'user' => $user,
			'permissions' => null
		], 200);
		
		Log::create([
			'user_id' => $user->id,
			'action' => "Inicio de sesión por relogin.",
			'type' => 'session'
		]);
	}
	
	public function logout()
	{
		$user = request()->user();
		
		$user->token()->revoke();
		
		Log::create([
			'user_id' => $user->id,
			'action' => "Sesión cerrada.",
			'type' => 'session'
		]);
		
		return response()->json([
			'msg'=>'logout',
			'description' => 'Sesión cerrada'
		], 200);
	}
	
	public function logoutAllTokens()
	{
		$user = request()->user();
		$tokens = $user->tokens;
		
		foreach ($tokens as $token) {
			$token->revoke();
		}
		
		Log::create([
			'user_id' => $user->id,
			'action' => "Sesiones cerradas.",
			'type' => 'session'
		]);
		
		return response()->json([
			'msg'=>'logout_all',
			'description' => 'Sesiones cerradas'
		], 200);
	}
}
