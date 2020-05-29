@extends('layouts.app')

@section('title', 'test view')

@section('content')
asdf
<button id="haha" onclick="lol()">haha</button>
<script type="application/json" id="json"><?= '["'.$x.'"]' ?></script>
<script type="text/javascript">
	function lol(){
		let data = JSON.parse(document.getElementById('json').innerHTML);
		console.log(data[0]);
	}
</script>
@endsection