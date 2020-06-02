<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:admins');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function index()
    {
        return view(
            'admin_views.home',
            [
                'fonts' => json_encode(app()->make('App\Admin\AdminCRUD')->getFonts(),true),
                'AppURLs' => json_encode([
                    'domain' => config('app.url'),
                    'images' => asset('images').'/',
                    'icons' => asset('images/icons').'/',
                    'storageLink' => asset('storage/fonts').'/',
                    'getFontFamilyURL' => route('getFontFamily'),
                    'deleteFontsURL' => config('app.url').'admin/fonts/delete',
                ], true),
            ]
        );
    }
}
