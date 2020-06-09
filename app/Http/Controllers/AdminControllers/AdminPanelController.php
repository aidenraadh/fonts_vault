<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Rules\UploadFontFileRule;
use App\Rules\UpdateFontRule;

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
                    'deleteFontsURL' => config('app.url').'admin/fonts/delete',
                ], true),
                'AdminData' => json_encode([
                    'name' => Auth::user()->name,
                ], true),
            ]
        );
    }

	public function storeFont(Request $request){
    	$v = Validator::make($request->all(), [
            'family_name' => ['bail', 'required', 'string', 'max:50'],
            'typeface' => ['bail', 'required', 'string', Rule::in(config('app.typefaces'))],
    		'font_files' => ['bail', 'required', 'array'],
    		'font_files.*' => ['bail', 'required', 'file', new UploadFontFileRule],
    	]);

    	if($v->fails()){
    		return $v->errors()->all();
    	}

        app()->make('App\Admin\AdminCRUD')->storeFonts(
            ['family_name' => $request->family_name, 'typeface' => $request->typeface],
            $request->font_files
        );

        return redirect()->back();
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
        $deletedFonts = json_decode($request->deletedFonts);
        $v2 = Validator::make(['deletedFonts' => $deletedFonts], [
            'deletedFonts' => ['bail', 'required', 'array'],
            'deletedFonts.*' => ['bail', 'integer', 'exists:fonts,id'],
        ]);
        
        if($v2->fails()){
            abort(403);
        }

        app()->make('App\Admin\AdminCRUD')->deleteFonts($deletedFonts);

        return redirect()->back();
	}

    public function editFont(Request $request, $font_id){
        // Check if the font exists
        $v = Validator::make(['id' => $font_id], [
            'id' => ['bail', 'required', 'integer', 'exists:fonts,id'],
        ]);

        if($v->fails()){
            abort(404);
        }

        return view('admin_views.edit_font', [
            'font' => json_encode(app()->make('App\Admin\AdminCRUD')->getFontsForEdit($font_id), true),
            'typefaces' => json_encode(config('app.typefaces'), true),
            'AppURLs' => json_encode([
                'domain' => config('app.url'),
                'images' => asset('images').'/',
                'icons' => asset('images/icons').'/',                
                'updateFontURL' => config('app.url').'admin/fonts/update',
            ], true),
            'AdminData' => json_encode([
                'name' => Auth::user()->name,
            ], true),            
        ]);
    }    

	public function updateFont(Request $request){
        $addedFiles = json_decode($request->addedFiles, true);
        $filteredNewFiles = $request->newFiles;

        if($request->newFiles){
            foreach ($request->newFiles as $key => $file) {
                if(!in_array($file->getClientOriginalName(), $addedFiles)){
                    unset($filteredNewFiles[$key]);
                }
            }
        }
        $changes = [
            'id' => $request->id,
            'family_name' => $request->family_name,
            'typeface' => $request->typeface,
            'default_file' => $request->default_file,
            'newFiles' => $filteredNewFiles,
            'deletedFiles' => (
                json_decode($request->deletedFiles) ? json_decode($request->deletedFiles) : []
            ),
        ];

        $v = Validator::make($changes, [
            'id' => ['bail', 'integer', 'exists:fonts,id'],
            'family_name' => ['bail', 'string', new UpdateFontRule($changes['id'])],
            'typeface' => ['bail', 'required', 'string', Rule::in(config('app.typefaces'))],
            'default_file' => ['bail', 'string', Rule::notIn($changes['deletedFiles'])],
            'newFiles.*' => ['bail', 'file', new UploadFontFileRule],
            'deletedFiles.*' => ['bail', new UpdateFontRule($changes['id'])],
        ]);

        if($v->fails()){
            dd($v->errors()->all());
        }


        app()->make('App\Admin\AdminCRUD')->updateFont($changes);

        return redirect()->route('admin/home');
	}
}
