<?php

namespace App\Admin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AdminPanel
{
	public function storeFonts($fontData, $fontFiles){
		// Store font files in storage
        Storage::disk('public')->makeDirectory('fonts/'.$fontData['font_name']);		

        foreach ($fontFiles as $fontFile) {
        	$fontFile->storeAs(
        		'fonts/'.$fontData['font_name'],
        		$fontFile->getClientOriginalName(),
        		'public'
        	);
        }

        // Find Regular File
        $regularFile = '';
        foreach ($fontFiles as $fontFile) {
        	if(stripos($fontFile->getClientOriginalName(), 'regular')){
        		$regularFile = $fontFile->getClientOriginalName();
        		break;
        	}
        	else{
        		$regularFile = $fontFile->getClientOriginalName(); 
        	}
        }

        // Insert font to fonts table
	DB::insert(
		'INSERT INTO fonts(font_name, typeface, default_file) VALUES(?,?,?)',
		[$fontData['font_name'], $fontData['typeface'], $regularFile]
	);

		$LAST_ID = DB::select('SELECT MAX(id) AS LAST_ID FROM fonts')[0]->LAST_ID;	
        $lastFileKey = array_key_last($fontFiles);
        $insertQueries = '';

        foreach ($fontFiles as $key => $fontFile) {
        	// Generate query for mass INSERT
        	$insertQueries .= '('.$LAST_ID.',"'.$fontFile->getClientOriginalName().'")';
        	if($key !== $lastFileKey){
        		$insertQueries .= ', ';
        	}
        }

        // Insert font files to fonts_files table
        DB::insert('INSERT INTO fonts_files(font_id, file_name) VALUES '.$insertQueries);
	}

	public function getFonts(){
		return DB::select( 'SELECT * FROM fonts');
	}

	/*public function getFontFamilies($data){
		DB::select(
			'',
			$data
		);
	}*/	
}
