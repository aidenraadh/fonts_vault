<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('test', 'TestController@index');
Route::post('testpost', 'TestController@testpost');

Route::get('fonts', 'FontsController@index');
Route::post('search', 'FontsController@searchFont');
Route::post('fonts/getFontFamily', 'FontsController@getFontFamily')->name('getFontFamily');

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');

Route::prefix('admin')->group(function () {
	Route::get('home', 'AdminControllers\HomeController@index')->name('admin/home');

	Route::get('login', 'AdminControllers\Auth\LoginController@showLoginForm')->name('admin/login');
	Route::post('login', 'AdminControllers\Auth\LoginController@login');
	Route::post('logout', 'AdminControllers\Auth\LoginController@logout')->name('admin/logout');

	Route::get('password/confirm', 'AdminControllers\Auth\ConfirmPasswordController@showConfirmForm');
	Route::post('password/confirm', 'AdminControllers\Auth\ConfirmPasswordController@confirm');

	Route::post('password/email', 'AdminControllers\Auth\ForgotPasswordController@sendResetLinkEmail')
	->name('admin/password.email');
	Route::get('password/reset', 'AdminControllers\Auth\ForgotPasswordController@showLinkRequestForm')
	->name('admin/password.request');
	

	Route::post('password/reset', 'AdminControllers\Auth\ResetPasswordController@reset')
	->name('admin/password.update');
	Route::get('password/reset/{token}', 'AdminControllers\Auth\ResetPasswordController@showResetForm')
	->name('admin/password.reset');

	Route::get('register', 'AdminControllers\Auth\RegisterController@showRegistrationForm')->name('admin/register');
	Route::post('register', 'AdminControllers\Auth\RegisterController@register');		
});