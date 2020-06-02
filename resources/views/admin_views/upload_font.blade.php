@extends('layouts.app')

@section('title', 'Admin - Upload Font')

@section('content')

<form method="POST" action="{{ config('app.url') }}admin/fonts/store" enctype="multipart/form-data">
	@csrf
	<input type="text" name="font_name" placeholder="font_name" required><br>
	<select name="typeface" required>
		<option value="serif">serif</option>
		<option value="sans serif">sans serif</option>
		<option value="monospace">monospace</option>
		<option value="display">display</option>
		<option value="script">script</option>
	</select><br>	
	<input type="file" name="font_files[]" multiple required><br>
	<button type="submit">SUBMIT</button>
</form>


@endsection