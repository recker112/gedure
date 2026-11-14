{{--
  Aviso en línea (filete izquierdo + fondo tenue).
  Uso: @include('mail.partials.alert', ['severity' => 'warning', 'title' => '...', 'body' => '...'])
  Severidades: warning, info.
--}}
@php
  $font = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  $palette = [
    'warning' => ['main' => '#D69A12', 'dark' => '#7F5300', 'light' => '#FDF6E3'],
    'info' => ['main' => '#1B4F9C', 'dark' => '#143B75', 'light' => '#EAF0F9'],
  ];
  $severity = isset($palette[$severity ?? null]) ? $severity : 'info';
  $c = $palette[$severity];
@endphp
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate; margin:0;">
  <tr>
    <td class="gd-alert" bgcolor="{{ $c['light'] }}" style="background-color:{{ $c['light'] }}; border-left:3px solid {{ $c['main'] }}; border-radius:0 4px 4px 0; padding:12px 16px 14px;">
      @isset($title)
        <p style="margin:0 0 4px; font-family:{{ $font }}; font-size:11px; line-height:1.4; letter-spacing:.14em; text-transform:uppercase; font-weight:600; color:{{ $c['dark'] }};">{{ $title }}</p>
      @endisset
      <p class="gd-muted" style="margin:0; font-family:{{ $font }}; font-size:13.5px; line-height:1.55; color:#4B5563;">{{ $body }}</p>
    </td>
  </tr>
</table>
