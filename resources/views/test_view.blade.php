@extends('layouts.app')

@section('title', 'test view')

@section('content')
<form id="test" action="{{config('app.url')}}testpost" method="POST">
	@csrf
	<button type="submit">submit</button>
</form>
<input type="checkbox" name="selectedFams[]" value="1" form="test">a<br>
<input type="checkbox" name="selectedFams[]" value="2" form="test">b<br>
<input type="checkbox" name="selectedFams[]" value="3" form="test">c<br>
<input type="checkbox" name="selectedFams[]" value="4" form="test">d<br>
<input type="checkbox" name="selectedFams[]" value="5" form="test">e<br>
<input type="checkbox" name="selectedFams[]" value="6" form="test">f<br>
<input type="checkbox" name="selectedFams[]" value="7" form="test">g<br>
<input type="checkbox" name="selectedFams[]" value="8" form="test">h<br>
@endsection