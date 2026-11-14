@extends('mail.layouts.gedure')

@section('subject', 'Código de verificación')
@section('preheader', 'Usa este código para terminar de iniciar sesión. Caduca '.$expireAt.'.')
@section('title', 'Confirma que eres tú')

@section('content')
  <p class="gd-muted" style="margin:0; color:#4B5563;">
    Estás iniciando sesión en Gedure, el sistema de la U.E.P. La Candelaria. Para terminar, ingresa este código de verificación en la aplicación.
  </p>

  @include('mail.partials.code', ['code' => $code, 'expireAt' => $expireAt, 'label' => 'Código de verificación'])

  @include('mail.partials.alert', [
    'severity' => 'warning',
    'title' => '¿No fuiste tú?',
    'body' => 'Ignora este correo: sin este código nadie puede entrar a tu cuenta. Si se repite, cambia tu contraseña. Nunca compartas este código con nadie.',
  ])
@endsection
