<?php

namespace App;
use Illuminate\Support\Facades\DB;

class Fonts
{

	public function getAllFonts(){
		return DB::select(
			'SELECT id, family_name, default_file, num_of_files FROM fonts'
		);
	}

	public function getFonts($typefaces){
		return DB::select(
			'SELECT id, font_name, default_file FROM fonts WHERE typeface IN('.implode(',', $typefaces).')'
		);
	}

	public function getFontFamily($font_id){
		return DB::select('SELECT file_name FROM fonts_files WHERE font_id = ?', [$font_id]);
	}	
}
