<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">    
    <link rel="stylesheet" type="text/css" href="{{asset('css/app.css')}}">
    <style type="text/css" id="fontFaces"></style>
    <style type="text/css" id="selectedFamFontFaces"></style>
</head>

<body>

@yield('content')

<script type="text/javascript" src="{{asset('js/app.js')}}" defer></script>
</body>

</html>
