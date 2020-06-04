@extends('layouts.app')

@section('title', 'test view')

@section('content')
<form id="test" action="{{config('app.url')}}testpost" method="POST">
	@csrf
	<button type="submit">submit</button>
</form>

<input type="radio" name="default_file" value="a" form="test">a<br>
<input type="radio" name="default_file" value="b" form="test">b<br>
<input type="radio" name="default_file" value="c" form="test">c<br>

@endsection