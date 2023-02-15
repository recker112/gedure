<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
	/**
	 * The policy mappings for the application.
	 *
	 * @var array
	 */
	protected $policies = [
			'App\Models\WalletSystem\Wallet' => 'App\Policies\WalletSystem\WalletPolicy',
			'App\Models\WalletSystem\Transaction' => 'App\Policies\WalletSystem\TransactionPolicy',
			'App\Models\WalletSystem\Debt' => 'App\Policies\WalletSystem\DebtPolicy',
			'App\Models\Gedure\Post' => 'App\Policies\Gedure\PostPolicy',
	];

	/**
	 * Register any authentication / authorization services.
	 *
	 * @return void
	 */
	public function boot()
	{
		$this->registerPolicies();
		
		Passport::personalAccessTokensExpireIn(now()->addMonths(6));
		
		Passport::tokensCan([
			'user' => 'usuario dentro del sistema',
			'profe' => 'profesor dentro del sistema'
		]);
		
		// Implicitly grant "Super Admin" role all permission checks using can()
		Gate::after(function ($user, $ability) {
			return $user->hasRole('super-admin'); // note this returns boolean
		});

		Gate::define('viewWebSocketsDashboard', function ($user = null) {
			return env('WEBSOCKETS_URL_STATS', true);
		});
	}
}
