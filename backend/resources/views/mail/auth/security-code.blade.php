@extends('mail.layouts.gedure')

@section('subject', 'Código de seguridad')
@section('preheader', 'Usa este código para restablecer tu contraseña. Caduca '.$expireAt.'.')
@section('title', 'Restablece tu contraseña')

@section('content')
  <p class="gd-muted" style="margin:0; color:#4B5563;">
    Recibimos una solicitud para restablecer la contraseña de tu cuenta de Gedure. Ingresa este código de seguridad en la aplicación para continuar.
  </p>

  @include('mail.partials.code', ['code' => $code, 'expireAt' => $expireAt, 'label' => 'Código de seguridad'])

  @include('mail.partials.alert', [
    'severity' => 'warning',
    'title' => '¿No lo solicitaste?',
    'body' => 'Ignora este correo y tu contraseña seguirá siendo la misma. Nunca compartas este código con nadie.',
  ])
@endsection
