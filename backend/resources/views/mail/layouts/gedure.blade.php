{{--
  Layout base de los correos de Gedure (U.E.P. La Candelaria).

  Identidad: azul institucional #1B4F9C. Hecho con tablas y estilos en línea
  porque Outlook y Gmail ignoran gran parte del CSS moderno; el bloque <style>
  solo añade ajustes para móvil y modo oscuro.

  Secciones:
    - subject:   <title> del documento.
    - preheader: texto de vista previa en la bandeja de entrada.
    - title:     encabezado de la tarjeta.
    - content:   cuerpo del correo.

  Fragmentos reutilizables: mail.partials.code y mail.partials.alert.
--}}
@php
  $school = 'U.E.P. La Candelaria';
  $font = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
@endphp
<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>@yield('subject', $school)</title>
  <style>
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    a { color: #1B4F9C; }

    @media only screen and (max-width: 620px) {
      .gd-gutter { padding-left: 12px !important; padding-right: 12px !important; }
      .gd-pad { padding-left: 24px !important; padding-right: 24px !important; }
      .gd-title { font-size: 22px !important; }
      .gd-code { font-size: 30px !important; letter-spacing: 6px !important; padding-left: 6px !important; }
    }

    @media (prefers-color-scheme: dark) {
      .gd-body, .gd-bg { background-color: #10151F !important; }
      .gd-card { background-color: #1A2232 !important; border-color: #2C3A52 !important; }
      .gd-text { color: #F2F5FA !important; }
      .gd-muted { color: #B4BDCC !important; }
      .gd-code-box { background-color: #10151F !important; border: 1px solid #2C3A52 !important; }
      .gd-code { color: #8DB4F0 !important; }
      .gd-alert { background-color: #2A2415 !important; }
    }
  </style>
</head>
<body class="gd-body" style="margin:0; padding:0; width:100%; background-color:#F2F5FA; font-family:{{ $font }};">
  <div style="display:none; max-height:0; max-width:0; overflow:hidden; opacity:0; mso-hide:all; font-size:1px; line-height:1px; color:#F2F5FA;">
    @yield('preheader')&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;
  </div>

  <table role="presentation" class="gd-bg" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#F2F5FA;">
    <tr>
      <td class="gd-gutter" align="center" style="padding:40px 16px;">
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; margin:0 auto; border-collapse:separate;">
          {{-- Cabecera azul institucional --}}
          <tr>
            <td class="gd-pad" bgcolor="#1B4F9C" style="background-color:#1B4F9C; padding:24px 40px; border-radius:12px 12px 0 0;">
              <p style="margin:0; font-family:{{ $font }}; font-size:20px; line-height:1.3; font-weight:700; color:#FFFFFF;">{{ $school }}</p>
              <p style="margin:2px 0 0; font-family:{{ $font }}; font-size:13px; line-height:1.4; letter-spacing:.08em; text-transform:uppercase; color:#D6E2F5;">Gedure</p>
            </td>
          </tr>
          <tr>
            <td class="gd-card" style="background-color:#FFFFFF; border:1px solid #DCE3EE; border-top:0; border-radius:0 0 12px 12px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="gd-pad" style="padding:32px 40px 0;">
                    <h1 class="gd-text gd-title" style="margin:0; font-family:{{ $font }}; font-size:26px; line-height:1.25; font-weight:600; color:#1F2937;">@yield('title')</h1>
                  </td>
                </tr>
                <tr>
                  <td class="gd-pad" style="padding:12px 40px 32px; font-family:{{ $font }}; font-size:16px; line-height:1.6; color:#4B5563;">
                    @yield('content')
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          {{-- Pie --}}
          <tr>
            <td class="gd-pad" align="center" style="padding:24px 40px 0; font-family:{{ $font }}; font-size:12.5px; line-height:1.6; color:#6B7280;">
              <p class="gd-muted" style="margin:0; color:#6B7280;">Este es un mensaje automático; por favor, no respondas a este correo.</p>
              <p class="gd-muted" style="margin:6px 0 0; color:#6B7280;">&copy; {{ date('Y') }} {{ $school }} · Gedure</p>
            </td>
          </tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
