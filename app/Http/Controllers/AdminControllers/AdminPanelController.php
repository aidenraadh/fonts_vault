<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AdminPanelController extends Controller
{
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

	public function uploadFont(){
		return view('admin_views.upload_font');
	}

	public function storeFont(){
/*    	$v = Validator::make($request->all(), [
            'font_name' => ['bail', 'required', 'string', 'max:50'],
            'typeface' => ['bail', 'required', 'string', 'max:50', Rule::in(config('app.typefaces'))],
    		'font_files' => ['bail', 'required', 'array'],
    		'font_files.*' => ['bail', 'required', 'file', new FontFileRule],
    	]);

    	if($v->fails()){
    		return $v->errors()->all();
    	}

        app()->make('App\Admin\AdminCRUD')->storeFonts(
            ['font_name' => $request->font_name, 'typeface' => $request->typeface],
            $request->font_files
        );*/
	}


	public function deleteFonts(Request $request){
        // Validate Admin
        $v1 = Validator::make(['AdminID' => Auth::guard('admins')->id()], [
            'AdminID' => ['bail', 'required', 'integer', 'exists:admins,id'],
        ]);

        if($v1->fails()){
            abort(403);
        }
        // Validate Font Families
        $v2 = Validator::make($request->all(), [
            'selectedFams' => ['bail', 'required', 'array'],
            'selectedFams.*' => ['bail', 'integer', 'exists:fonts,id'],
        ]);
        
        if($v2->fails()){
            abort(403);
        }

        app()->make('App\Admin\AdminCRUD')->deleteFonts($request->selectedFams);
	}

	public function updateFont(){
		return 'asd';
	}		
}
