<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class UpdateFontRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    private $font_id;
    public function __construct($font_id)
    {
        //
        $this->font_id = $font_id;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        switch ($attribute) {

            case 'family_name':
                $prev_val = DB::select(
                    'SELECT family_name FROM fonts WHERE id=?', [$this->font_id]
                )[0]->family_name;
                if($value !== $prev_val){
                    if(
                        DB::select(
                            'SELECT COUNT(family_name) AS name FROM fonts WHERE family_name=? LIMIT 1',
                            [$value]
                        )[0]->name
                    ){
                        return false;
                    }
                    return true;
                }
                return true; break;

            default:
                if(
                    DB::select(
                        'SELECT COUNT(file_name) AS name FROM fonts_files 
                        WHERE font_id=? AND file_name=? LIMIT 1',
                        [$this->font_id, $value]
                    )[0]->name
                ){
                    return true;
                }
                return false; break;
        }

/*      // Get the previous family_name, typeface, and default_file value
        $prev_vals = DB::select(
            'SELECT family_name, typeface, default_file FROM fonts WHERE id=?',
            [$value['id']]
        )[0];

        // Validate family_name field only if it is different from the prev value
        if($value['family_name'] !== $prev_vals->family_name){
            // Check if the value is not empty
            if(!$value['family_name']){
                return false;
            }
            // Sanitize the string
            $value['family_name'] = filter_var($value['family_name'], FILTER_SANITIZE_STRING);
            // Check if the value is unique in fonts table
            if(
                DB::select(
                    'SELECT COUNT(family_name) AS name FROM fonts WHERE family_name=? LIMIT 1',
                    [$value['family_name']]
                )[0]->family_name
            ){
                return false;
            }
        }
        // Validate typeface field only if it is different from the prev value
        if($value['typeface'] !== $prev_vals->typeface){
            // Check if the value is not empty
            if(!$value['typeface']){
                return false;
            }
            // Sanitize the string
            $value['typeface'] = filter_var($value['typeface'], FILTER_SANITIZE_STRING);
            // Check if the value is in the accepted typefaces
            if(
                !in_array($value['typeface'], config('app.typefaces'))
            ){
                return false;
            }
        }
        // Validate default_file field only if it is different from the prev value
        if($value['default_file'] !== $prev_vals->default_file){
            // Check if the value is not empty
            if(!$value['default_file']){
                return false;
            }            
            // Sanitize the string
            $value['default_file'] = filter_var($value['default_file'], FILTER_SANITIZE_STRING);
            // Check if the file name is already stored in fonts_files table
            if(
                !DB::select(
                    'SELECT file_name FROM fonts_files WHERE id=? AND file_name=?',
                    [$value['id'], $value['default_file']]
                )[0]->id
            ){
                return false;
            }
            // Check if the file name is not inside the deletedFiles field
            if(!in_array($value['default_file'], $value['deletedFiles'])){
                return false;
            }
        }
        // Validate the new uploaded files
        // Check if the file already exists
        $count = DB::select(
            'SELECT COUNT(file_name) AS count FROM fonts_files WHERE file_name = ? LIMIT 1',
            [$value->getClientOriginalName()]
        )[0]->count;

        if($count === 1){
            return false;
        }

        $finfo = finfo_open(FILEINFO_MIME);

        if(!in_array(finfo_file($finfo, $value->path()), config('app.supportedMimes'))){
            finfo_close($finfo);
            return false;
        }

        finfo_close($finfo);        

        // Validate the deletedFiles if there is any
        if($value['deletedFiles']){
            foreach($value['deletedFiles'] as $file){
                if(
                    !DB::select(
                        'SELECT COUNT(file_name) AS file FROM fonts_files WHERE 
                        id=? AND file_name=? LIMIT 1',
                        [$value['id'], $file]
                    )[0]->file
                ){
                    return false;
                }
            }
            // Check if the number of deleted files isn't equal to
            // The number of files left.
            if(
                DB::select(
                    'SELECT COUNT(file_name) AS files FROM fonts_files WHERE id=?',
                    [$value['id']]
                )[0]->files
                ===
                count($value['deletedFiles'])
            ){
                return false;
            }      
        }

        // All is well
        return true;
*/    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute error message.';
    }
}
