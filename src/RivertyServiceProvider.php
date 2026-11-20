<?php

namespace Rapidez\Riverty;

use Illuminate\Support\Facades;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Rapidez\Riverty\View\Composers\PaymentMethodComposer;

class RivertyServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'riverty');

        Facades\View::composer('rapidez::checkout.steps.payment-method', PaymentMethodComposer::class);

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../resources/views' => resource_path('views/vendor/riverty'),
            ], 'views');

            $this->publishes([
                __DIR__.'/../resources/payment-icons' => public_path('vendor/payment-icons'),
            ], 'payment-icons');
        }

        Route::get('afterpay/payment/sca/{extra?}', fn (?string $extra = null) => redirect(
            rtrim(config('rapidez.magento_url'), '/') . '/afterpay/payment/sca/' . $extra
                . (request()->getQueryString() ? '?' . request()->getQueryString() : ''),
            308
        ))->where('extra', '.*');
    }
}
