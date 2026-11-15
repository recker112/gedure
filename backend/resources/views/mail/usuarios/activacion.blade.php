@extends('mail.layouts.gedure')

@php($font = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif")

@section('subject', 'Activa tu cuenta de Gedure')
@section('preheader', 'Elige tu contraseña para entrar en Gedure. El enlace caduca '.$caduca.'.')
@section('title', 'Te damos la bienvenida, '.$name)

@section('content')
  <p class="gd-muted" style="margin:0 0 16px; color:#4B5563;">
    {{ $enviadaPor ? $enviadaPor.', de la administración de la U.E.P. La Candelaria, creó' : 'La administración de la U.E.P. La Candelaria creó' }} tu cuenta en Gedure. Para empezar a usarla, elige tu contraseña.
  </p>

  <p class="gd-muted" style="margin:0; color:#4B5563;">
    Iniciarás sesión con tu usuario <strong>{{ $username }}</strong> o con este correo.
  </p>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate; margin:28px 0 24px;">
    <tr>
      <td bgcolor="#1B4F9C" style="background-color:#1B4F9C; border-radius:8px;">
        <a href="{{ $url }}" style="display:inline-block; padding:14px 28px; font-family:{{ $font }}; font-size:16px; font-weight:600; color:#FFFFFF; text-decoration:none;">Activar mi cuenta</a>
      </td>
    </tr>
  </table>

  <p class="gd-muted" style="margin:0 0 20px; font-size:13.5px; line-height:1.55; color:#4B5563;">
    El enlace caduca {{ $caduca }} y solo sirve una vez. Si el botón no funciona, copia esta dirección en tu navegador:<br>
    <a href="{{ $url }}" style="color:#1B4F9C; word-break:break-all;">{{ $url }}</a>
  </p>

  @include('mail.partials.alert', [
    'severity' => 'info',
    'title' => '¿No esperabas este correo?',
    'body' => 'Ignóralo: sin el enlace nadie puede activar la cuenta. Si crees que es un error, contacta con la administración del colegio.',
  ])
@endsection
