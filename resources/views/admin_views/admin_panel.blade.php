@extends('layouts.app')

@section('title', 'Admin Panel')

@section('content')

<form method="POST" action="{{ config('app.url') }}admin/store" enctype="multipart/form-data">
	@csrf
	<input type="text" name="font_name" placeholder="font_name" required><br>
	<input type="text" name="typeface" placeholder="typeface" required><br>
	<input type="file" name="font_files[]" multiple required><br>
	<button type="submit">SUBMIT</button>
</form>


@endsection