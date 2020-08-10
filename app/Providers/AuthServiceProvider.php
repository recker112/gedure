<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\CustomExtensions\CustomEloquentUserProvider;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
	/**
	 * The policy mappings for the application.
	 *
	 * @var array
	 */
	protected $policies = [
			// 'App\Model' => 'App\Policies\ModelPolicy',
	];

	/**
	 * Register any authentication / authorization services.
	 *
	 * @return void
	 */
	public function boot()
	{
		$this->registerPolicies();

		//Registrar Custom Eloquent
		Auth::provider('custom_auth', function ($app, array $config) {
			$model = $app['config']['auth.providers.users.model'];
			return new CustomEloquentUserProvider($app['hash'], $model);
		});
		
		Passport::routes();
		
		Passport::tokensExpireIn(now()->addHours(8));
		Passport::refreshTokensExpireIn(now()->addHours(8));
		Passport::personalAccessTokensExpireIn(now()->addHours(8));
		
		Passport::personalAccessClientId(
        config('passport.personal_access_client.id')
    );

    Passport::personalAccessClientSecret(
        config('passport.personal_access_client.secret')
    );
		
		Passport::tokensCan([
			'user' => 'usuario dentro del sistema',
			'admin' => 'administrador dentro del sistema',
			'profe' => 'profesor dentro del sistema'
		]);
	}
}
