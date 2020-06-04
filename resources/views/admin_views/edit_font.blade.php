@extends('layouts.app')

@section('title', 'Admin - Edit Font')

@section('content')

<div id="AdminApp" data-view-name="edit_font">
	
</div>

<script type="application/json" id="font"><?= $font ?></script>
<script type="application/json" id="typefaces"><?= $typefaces ?></script>
<script type="application/json" id="AppURLs"><?= $AppURLs ?></script>
@endsection