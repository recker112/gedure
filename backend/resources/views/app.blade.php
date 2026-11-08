<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{ config('app.name', 'Laravel') }} (dev)</title>
</head>
<body>
  <p>API de desarrollo. El SPA de React se corre aparte con <code>npm start</code> (http://localhost:3000).</p>
</body>
</html>
