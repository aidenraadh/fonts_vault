@extends('layouts.app')

@section('title', 'Admin - Edit Font')

@section('content')

<div id="AdminApp" class="App edit_font_view" style="padding-top: 15rem;">
	
</div>

<script type="application/json" id="font"><?= $font ?></script>
<script type="application/json" id="typefaces"><?= $typefaces ?></script>
<script type="application/json" id="AppURLs"><?= $AppURLs ?></script>
<script type="application/json" id="AdminData"><?= $AdminData ?></script>
@endsection