@extends('mail.layouts.gedure')

@section('subject', 'La contraseña de tu cuenta ha cambiado')
@section('preheader', 'La contraseña de tu cuenta de Gedure se cambió el '.$changedAt.'.')
@section('title', 'La contraseña de tu cuenta ha cambiado')

@section('content')
  <p class="gd-muted" style="margin:0 0 16px; color:#4B5563;">
    Hola, {{ $name }}. La contraseña de tu cuenta de Gedure {{ $reset ? 'se restableció con un código de seguridad' : 'se cambió desde tu cuenta' }} el {{ $changedAt }}.
  </p>

  <p class="gd-muted" style="margin:0 0 24px; color:#4B5563;">
    {{ $reset ? 'Se cerraron todas tus sesiones abiertas: vuelve a iniciar sesión con la contraseña nueva.' : 'Se cerraron tus demás sesiones abiertas; la sesión desde la que se cambió sigue abierta.' }}
  </p>

  @include('mail.partials.alert', [
    'severity' => 'warning',
    'title' => '¿No fuiste tú?',
    'body' => 'Contacta con la administración de la U.E.P. La Candelaria cuanto antes para que revise tu cuenta.',
  ])
@endsection
