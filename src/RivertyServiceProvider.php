<?php

namespace Rapidez\Riverty;

use Illuminate\Support\ServiceProvider;

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

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../resources/views' => resource_path('views/vendor/riverty'),
            ], 'views');

            $this->publishes([
                __DIR__.'/../resources/payment-icons' => public_path('vendor/payment-icons'),
            ], 'payment-icons');
        }
    }
}
