@extends('mail.layouts.gedure')

@section('subject', 'El correo de tu cuenta ha cambiado')
@section('preheader', 'La administración del colegio cambió el correo de tu cuenta de Gedure.')
@section('title', 'El correo de tu cuenta ha cambiado')

@section('content')
  <p class="gd-muted" style="margin:0 0 16px; color:#4B5563;">
    Hola, {{ $name }}. La administración de la U.E.P. La Candelaria cambió el correo de tu cuenta de Gedure a <strong>{{ $nuevo }}</strong>. A partir de ahora los códigos de acceso llegarán a esa dirección, no a esta.
  </p>

  <p class="gd-muted" style="margin:0 0 24px; color:#4B5563;">
    Se cerraron todas tus sesiones abiertas.
  </p>

  @include('mail.partials.alert', [
    'severity' => 'warning',
    'title' => '¿No lo sabías?',
    'body' => 'Contacta con la administración de la U.E.P. La Candelaria cuanto antes para que revise tu cuenta.',
  ])
@endsection
