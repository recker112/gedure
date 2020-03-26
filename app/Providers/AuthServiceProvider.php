<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\CustomExtensions\CustomEloquentUserProvider;
use Illuminate\Support\Facades\Auth;

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
    }
}
