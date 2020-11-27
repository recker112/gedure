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
		
		Passport::tokensExpireIn(now()->addHours(8));
		Passport::refreshTokensExpireIn(now()->addHours(8));
		Passport::personalAccessTokensExpireIn(now()->addHours(8));
		
		Passport::tokensCan([
			'user' => 'usuario dentro del sistema',
			'admin' => 'administrador dentro del sistema',
			'profe' => 'profesor dentro del sistema'
		]);
		
		// Implicitly grant "Super Admin" role all permission checks using can()
		Gate::before(function ($user, $ability) {
			if ($user->hasRole('soy-admin')) {
				return true;
			}
		});
	}
}
