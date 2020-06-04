@extends('layouts.app')

@section('title', 'Fonts')

@section('content')

<div id="App" class="App"></div>

<script type="application/json" id="displayedFonts">
	<?= $fonts ?>
</script>

<script type="application/json" id="AppURLs">
	<?= $AppURLs ?>
</script>
@endsection