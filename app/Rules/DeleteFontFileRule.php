<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class DeleteFontFileRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    private $font_id;

    public function __construct($font_id)
    {
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
        $num_of_files = DB::select(
            'SELECT COUNT(file_name) AS files FROM fonts_files WHERE font_id = ?',
            [$this->font_id]
        );

        if(count($value) === $num_of_files){
            return false;
        }
        else{
            return true;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The number of deleted files must be less than the total number of files';
    }
}
