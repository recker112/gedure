{{--
  Código destacado con su caducidad.
  Uso: @include('mail.partials.code', ['code' => $code, 'expireAt' => $expireAt, 'label' => 'Código de verificación'])

  El código va en un único nodo de texto para que se pueda copiar entero.
--}}
@php($font = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif")
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate; margin:28px 0 24px;">
  <tr>
    <td class="gd-code-box" align="center" bgcolor="#EAF0F9" style="background-color:#EAF0F9; border-radius:8px; padding:24px 16px 22px;">
      <p class="gd-muted" style="margin:0 0 10px; font-family:{{ $font }}; font-size:11px; line-height:1.4; letter-spacing:.16em; text-transform:uppercase; color:#4B5563;">{{ $label ?? 'Tu código' }}</p>
      <p class="gd-code" style="margin:0; font-family:Consolas, 'Courier New', monospace; font-size:38px; line-height:1.2; font-weight:700; letter-spacing:10px; padding-left:10px; color:#1B4F9C; -webkit-user-select:all; user-select:all;">{{ $code }}</p>
      @isset($expireAt)
        <p class="gd-muted" style="margin:12px 0 0; font-family:{{ $font }}; font-size:13.5px; line-height:1.5; color:#4B5563;">Caduca <strong class="gd-text" style="font-weight:600; color:#1F2937;">{{ $expireAt }}</strong></p>
      @endisset
    </td>
  </tr>
</table>
