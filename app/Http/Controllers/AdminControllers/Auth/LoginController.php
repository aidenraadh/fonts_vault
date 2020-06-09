<?php

namespace App\Http\Controllers\AdminControllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = 'admin/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest:admins')->except('logout');
    }

    public function showLoginForm()
    {
        return view('admin_views.auth.login', [
            'AppURLs' => json_encode([
                'domain' => config('app.url'),
                'images' => asset('images').'/',
                'icons' => asset('images/icons').'/',                
                'login' => route('admin/login'),
                'registerPage' => route('admin/register')
            ], true),
        ]);
    } 

    protected function guard()
    {
        return Auth::guard('admins');
    }    

}
