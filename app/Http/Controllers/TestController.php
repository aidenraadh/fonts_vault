<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Fonts;

class TestController extends Controller
{
    public function index(Request $request, Fonts $Fonts){
    	return view('test_view');
    }

    public function testpost(Request $request){
    	return 'asd';
    }    
}


