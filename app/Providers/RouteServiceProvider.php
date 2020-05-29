<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * The name of the "home" route for your application
     * based on the guards of this app.
     *
     * (str)guard_name => (str)home_route_name
     */
    public const HOME = [
        'web' => '/home',
        'admins' => 'admin/home',
    ];

    /**
     * The name of the "login" route for your application
     * based on the guards of this app.
     *
     * (str)guard_name => (str)login_route_name
     */    

    public const LOGIN = [
        'web' => 'login',
        'admins' => 'admin/login',
    ];

    /**
     * The path prefix of the routes for your application by the guards
     * of this app.
     *
     * (str)guard_name => (str)path_prefix
     */      

    public const PATH_PATTERN = [
        'web' => null,
        'admins' => '/admin',
    ];    


    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }
}
