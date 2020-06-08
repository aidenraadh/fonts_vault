<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

use App\Fonts;

class TestController extends Controller
{
    public function index(Request $request, Fonts $Fonts){
    	$disk = Storage::disk('public');
    	$files = $disk->files('fonts/Montserrat');
    	foreach ($files as $file) {
    		echo substr($file, strrpos($file, '/')+1).'<br>';
    	}

    }

    public function testpost(Request $request){
    	return 'asd';
    }    
}


