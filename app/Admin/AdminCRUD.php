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

	public function updateFont($changes){
		// Get the previous number of files
		$num_of_files = DB::select(
      'SELECT num_of_files FROM fonts WHERE id = ?',
      [$changes['id']]
    )[0]->num_of_files;

    $data = DB::select(
      'SELECT family_name, typeface, default_file FROM fonts WHERE id = ?',
      [$changes['id']]
    )[0];

    $prev_val = [
      'family_name' => $data->family_name,
      'typeface' => $data->typeface,
      'default_file' => $data->default_file,
    ];



		$num_of_files = $num_of_files + 
			($changes['newFiles'] ? count($changes['newFiles']) : 0) -
			($changes['deletedFiles'] ? count($changes['deletedFiles']) : 0);
		DB::beginTransaction();

    try {
      $queriesForFontsTable = '';
      $dataForFontsTable = [];

      foreach($prev_val as $key => $val){
        if($val !== $changes[$key]){
          $queriesForFontsTable .= $key.'="'.$changes[$key].'",';
        }
      }

    	DB::update(
    		'UPDATE fonts SET '.$queriesForFontsTable.' num_of_files='.$num_of_files.
        ' WHERE id ='.$changes['id']
    	);
      // Delete the font's files in database if the deleted files exist
    	if($changes['deletedFiles']){
    		DB::delete(
    			'DELETE FROM fonts_files WHERE font_id = ? AND file_name IN('.
    			'"'.implode('","', $changes['deletedFiles']).'"'
    			.')',
    			[$changes['id']]
    		);
    	}
      // Insert the new font's files to database if the new files exist
    	if($changes['newFiles']){
   			// Generate query for mass INSERT
   			$lastFileKey = array_key_last($changes['newFiles']);
   			$insertQueries = '';
   			
   			foreach ($changes['newFiles'] as $key => $fontFile) {
   				$insertQueries .= '('.$changes['id'].',"'.$fontFile->getClientOriginalName().'")';
   				if($key !== $lastFileKey){
   					$insertQueries .= ', ';
   				}
   			}
   			DB::insert('INSERT INTO fonts_files(font_id, file_name) VALUES '.$insertQueries);       			
    	}
   		DB::commit();
      $publicDisk = Storage::disk('public');
      // Delete the font's files in the storage if the deleted file exists
      if($changes['deletedFiles']){
        foreach ($changes['deletedFiles'] as $file_name) {
          $publicDisk->delete('fonts/'.$prev_val['family_name'].'/'.$file_name);
        }
      }
      // Store the new font's files in the storage if there is any
      if($changes['newFiles']){
        foreach ($changes['newFiles'] as $file) {
          $file->storeAs(
            'fonts/'.$prev_val['family_name'],
            $file->getClientOriginalName(),
            'public'
          );
        }
      }
      // Only when the family name is changed, which also change
      // the directory where font's files stored
      if($prev_val['family_name'] !== $changes['family_name']){
        // Get all files
        $all_files = $publicDisk->files('fonts/'.$prev_val['family_name']);
        // Make new directory
        $publicDisk->makeDirectory('fonts/'.$changes['family_name']);
        // Move the file to new directory
        foreach ($all_files as $file) {
          $publicDisk->move($file, 'fonts/'.$changes['family_name'].'/'.substr($file, strrpos($file, '/')+1));
        }
        // Remove the old directory
        $publicDisk->deleteDirectory('fonts/'.$prev_val['family_name']);
      }
    } catch (Exception $e) {
    	DB::rollback();
    	abort(403);
    }      		
	}	
	
}