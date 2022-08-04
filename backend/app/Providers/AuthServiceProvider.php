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
			// 'App\Models\Model' => 'App\Policies\ModelPolicy',
	];

	/**
	 * Register any authentication / authorization services.
	 *
	 * @return void
	 */
	public function boot()
	{
		$this->registerPolicies();

		Passport::routes();
		
		Passport::personalAccessTokensExpireIn(now()->addMonths(6));
		
		Passport::tokensCan([
			'user' => 'usuario dentro del sistema',
			'profe' => 'profesor dentro del sistema'
		]);
		
		// Implicitly grant "Super Admin" role all permission checks using can()
		Gate::before(function ($user, $ability) {
			if ($user->hasRole('super-admin')) {
				return true;
			}
		});

		Gate::define('viewWebSocketsDashboard', function ($user = null) {
			return true;
	});
	}
}
