@extends('layouts.app')

@section('title', 'Fonts')

@section('content')

<div id="App" class="App"></div>

<script type="application/json" id="filteredFonts">
	<?= $fonts ?>
</script>

<script type="application/json" id="AppURLs">
	<?= $AppURLs ?>
</script>
@endsection