@extends('layouts.app')

@section('title', 'Admin - Home')

@section('content')

<div id="AdminApp" class="App home_view">
	
</div>

<script type="application/json" id="fonts"><?= $fonts ?></script>
<script type="application/json" id="AppURLs"><?= $AppURLs ?></script>
<script type="application/json" id="AdminData"><?= $AdminData ?></script>
@endsection