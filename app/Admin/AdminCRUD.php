<?php

namespace App\Admin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AdminCRUD{

	public function storeFonts($fontData, $fontFiles){

		// Find the default file of the font
        $defaultFile = '';
        foreach ($fontFiles as $fontFile) {
        	if(stripos($fontFile->getClientOriginalName(), 'regular')){
        		$defaultFile = $fontFile->getClientOriginalName();
        		break;
        	}
        	else{
        		$defaultFile = $fontFile->getClientOriginalName(); 
        	}
        }

        DB::beginTransaction();

        try {
        	DB::insert(
				'INSERT INTO fonts(family_name, typeface, num_of_files, default_file) VALUES(?,?,?,?)',
				[$fontData['family_name'], $fontData['typeface'], count($fontFiles), $defaultFile]			  	
        	);

	   		$LAST_ID = DB::select('SELECT MAX(id) AS LAST_ID FROM fonts')[0]->LAST_ID;	
       		$lastFileKey = array_key_last($fontFiles);
       		$insertQueries = '';

       		// Generate query for mass INSERT
       		foreach ($fontFiles as $key => $fontFile) {
       			$insertQueries .= '('.$LAST_ID.',"'.$fontFile->getClientOriginalName().'")';
       			if($key !== $lastFileKey){
       				$insertQueries .= ', ';
       			}
       		}

       		// Insert font files to fonts_files table
       		DB::insert('INSERT INTO fonts_files(font_id, file_name) VALUES '.$insertQueries);

       		DB::commit();

			Storage::disk('public')->makeDirectory('fonts/'.$fontData['family_name']);
			foreach ($fontFiles as $fontFile) {
				$fontFile->storeAs(
					'fonts/'.$fontData['family_name'],
					$fontFile->getClientOriginalName(),
					'public'
				);
			}

        } catch (Exception $e) {
        	DB::rollback();
        	abort(403);
        }      
	}

	public function getFonts(){
		return DB::select( 'SELECT * FROM fonts');
	}

	public function deleteFonts($font_IDs){
		$IDs = implode(',', $font_IDs);
		$family_names = DB::select('SELECT family_name FROM fonts WHERE id IN('.$IDs.')');
		$publicDisk = Storage::disk('public');

		DB::beginTransaction();

		try {
			DB::delete('DELETE FROM fonts WHERE id IN('.$IDs.')');
			DB::commit();
			foreach ($family_names as $name) {
			        $publicDisk->deleteDirectory('fonts/'.$name->family_name);
			}
		} catch (Exception $e) {
		    DB::rollback();
		    abort(403);
		}		
	}

	public function getFontsForEdit($font_id){
		return [
			'font_info' => DB::select(
				'SELECT id, family_name, typeface, default_file FROM fonts WHERE id = ?',
				[$font_id]
			)[0],
			'font_files' => DB::select(
				'SELECT file_name from fonts_files WHERE font_id = ?',
				[$font_id]
			)
		];
	}
	
}