<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Fonts;

class FontsController extends Controller
{
	public function index(Request $request, Fonts $Fonts){
		return view(
			'fonts',
			[
				'fonts' => json_encode($Fonts->getAllFonts(), true),
				'AppURLs' => json_encode([
					'domain' => config('app.url'),
					'images' => asset('images').'/',
					'icons' => asset('images/icons').'/',
					'storageLink' => asset('storage/fonts').'/',
					'getFontFamilyURL' => route('getFontFamily'),
				], true),
			]
		);
	}

	public function searchFonts(Request $request, Fonts $Fonts){
		//the input value
		$test = [
			'serif',
			'sans serif',
		];

		$typefaces = [];
 
		foreach ($test as $value) {
			$typefaces[] = '"'.$value.'"';
		}

		return view(
			'search',
			['fonts' => json_encode($Fonts->getFonts($typefaces), true)]			
		);

		//var_dump( $Fonts->getFonts($typefaces) );
	}

	public function getFontFamily(Request $request, Fonts $Fonts){
    	$v = Validator::make($request->all(),[
    		'font_id' => ['bail', 'required', 'integer', 'exists:fonts_files,font_id']
    	]);

    	if($v->fails()){
    		return 'noooo';
    	}

    	return json_encode($Fonts->getFontFamily($request->font_id), true);		
	}	
}
