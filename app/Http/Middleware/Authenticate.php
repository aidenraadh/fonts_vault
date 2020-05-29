<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {

            $urlPrefix = $request->route()->getPrefix();
            $guards = array_keys(config('auth.guards'));

            foreach ($guards as $guard) {
                if (
                    Auth::guard($guard)->check() ||
                    ($urlPrefix === RouteServiceProvider::PATH_PATTERN[$guard])
                ) {
                    return route(RouteServiceProvider::LOGIN[$guard]);
                }
            }                      
        }
    }
}
