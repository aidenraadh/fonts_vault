<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class FontFileRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The font files is already exists or the format is wrong.';
    }
}
