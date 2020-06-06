@extends('layouts.app')

@section('title', 'Admin - Edit Font')

@section('content')

<div id="AdminApp" data-view-name="edit_font" class="App">
	
</div>

<script type="application/json" id="font"><?= $font ?></script>
<script type="application/json" id="typefaces"><?= $typefaces ?></script>
<script type="application/json" id="AppURLs"><?= $AppURLs ?></script>
<script type="application/json" id="AdminData"><?= $AdminData ?></script>
@endsection