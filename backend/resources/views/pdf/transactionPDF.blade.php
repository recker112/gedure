<!DOCTYPE HTML>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>Transacción #{{ $transaction->id }}</title>
	<?php
		$BankListSearch = [
			'0102' => 'Banco de Venezuela',
			'0104' => 'Venezolano de Crédito',
			'0105' => 'Mercantil',
			'0108' => 'Provincial',
			'0114' => 'Bancaribe',
			'0115' => 'Exterior',
			'0116' => 'Occidental de Descuento',
			'0128' => 'Banco Caroní',
			'0134' => 'Banesco',
			'0138' => 'Banco Plaza',
			'0151' => 'BFC Banco Fondo Común',
			'0156' => '100% Banco',
			'0157' => 'Delsur',
			'0163' => 'Banco del Tesoro',
			'0166' => 'Banco Agrícola de Venezuela',
			'0168' => 'Bancrecer',
			'0169' => 'Mi Banco',
			'0171' => 'Banco Activo',
			'0172' => 'Bancamiga',
			'0174' => 'Banplus',
			'0175' => 'Bicentenario del Pueblo',
			'0177' => 'Banfanb',
			'0191' => 'BNC Nacional de Crédito'
		];
		
		function parseMoney($value)
		{
			$moneyText = strVal($value);
			$moneyText = explode('.', $moneyText);
			$decimals = isset($moneyText[1]) ? $moneyText[1] : '00';
			$amount = $moneyText[0];
			
			$negative = false;
			
			if ($amount[0] === '-') {
				$negative = true;
				$amount = substr($amount, 1);
			}
			
			$newText = '';
			for($o = 1; strlen($amount) >= $o; $o++) {
				if ($o % 3 === 0) {
					$newText = isset($amount[$o]) ? '.'.$amount[strlen($amount) - $o].$newText : $amount[strlen($amount) - $o].$newText;
				}else {
					$newText = $amount[strlen($amount) - $o].$newText;
				}
			}
			$newText = $negative ? '-'.$newText : $newText;
			$newText = 'Bs. '.$newText.','.$decimals;
			
			return $newText;
		}
	?>
	<style>
		/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fCRc4EsA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fABc4EsA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fCBc4EsA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fBxc4EsA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fCxc4EsA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fChc4EsA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fBBc4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu72xKOzY.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu5mxKOzY.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu7mxKOzY.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4WxKOzY.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu7WxKOzY.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu7GxKOzY.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fCRc4EsA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fABc4EsA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fCBc4EsA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBxc4EsA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fCxc4EsA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fChc4EsA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfABc4EsA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfCBc4EsA.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBxc4EsA.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfCxc4EsA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfChc4EsA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
	</style>
	<style>
		* {
			font-family: Roboto;
			margin: 0;
			padding: 0;
		}
		
		.paper {
			padding: 15px 25px;
		}
		
		.container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
		}
		
		.container__box {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20px;
		}
		
		.container__instituto {
			width: 100%;
		}
		
		.instituto__logo {
			float: left;
			margin-right: 10px;
		}
		
		.transaction__logo {
			text-align: right;
			font-size: 2.125rem;
		}
		
		.transaction__logo--part1 {
			color: rgb(0, 221, 255);
		}
		
		.transaction__logo--part2 {
			color: rgb(42, 134, 255);
		}
		
		.body1 {
			font-weight: 400;
			font-size: 1rem;
			line-height: 1.5;
			letter-spacing: 0.00938em;
		}

		.body1--right {
			display: inline-table; 
			width: 100%; 
			text-align: right;
		}
		
		.h5 {
			font-size: 1.5em;
			line-height: 1.334;
			letter-spacing: 0em;
			margin-bottom: 10px;
		}
		
		.text__bold {
			font-weight: 500;
		}
		
		.text__bold--semi {
			font-weight: 600;
		}
		
		.text__bold--big {
			font-weight: 700;
		}
		
		.text__opacity {
			opacity: 0.7;
		}
		
		.text__opacity--semi {
			opacity: 0.5;
		}
		
		.text__opacity--big {
			opacity: 0.4;
		}
		
		.text__left {
			text-align: left;
		}
		
		.text__right {
			text-align: right;
		}
		
		.text__center {
			text-align: center;
		}
		
		.divider {
			height: 3px;
			background-color: rgba(0, 0, 0, 0.12);
			border: none;
			margin-bottom: 20px;
		}
		
		.table {
			width: 100%;
			margin-bottom: 20px;
		}
		
		.tc {
			padding: 15px 10px;
		}
		
		.sello {
			margin-top: 110px;
			margin-bottom: 20px;
		}
		
		.sello__divider {
			width: 350px;
			margin: auto;
		}
		
		.powered {
			text-align: center;
		}
		
		table {
			border-collapse: collapse;
		}
		
		table, td, th {
			border-bottom: 1px solid rgba(0, 0, 0, 0.25);
		}

		.container__left {
			float: left; 
			width: 50%;
		}

		.container__right {
			margin-left: 50%;
			width: 50%;
			margin-bottom: 20px;
		}
	</style>
</head>
<body>
	<div class='paper'>
		<div class='container'>
			<div class='container__instituto'>
				<img class='instituto__logo' width='75' src='{{ storage_path('app/public/favicon.png') }}' />
				<div>
					<p class='body1 text__bold'>
						U.E.P A.P.E.P "La Candelaria"
					</p>
					<p class='body1 text__opacity'>
						N° Factura #{{ $transaction->id }}
					</p>
				</div>
			</div>
			
			<div class='transaction__logo text__bold--semi'>
				<span class='transaction__logo--part1'>Transacción</span> <span class='transaction__logo--part2'>realizada</span>
			</div>
		</div>
		
		<hr class='divider' />
		
		<div>
			<div class="container__left">
				<p class='body1 text__bold'>
					Comprobante a nombre de:
				</p>
				<p class='body1'>
					{{ $transaction->user->name }} ({{ $transaction->user->privilegio . $transaction->user->username }})
				</p>
			</div>
			<div class="container__right">
				@if ($transaction->type === 'pago verificado')
					<p class='body1 body1--right text__bold'>
						Pago realizado a:
					</p>
					<p class='body1 body1--right'>
						{{ $transaction->payload->extra_data->name }}
					</p>
					<p class='body1 body1--right'>
						J-{{ substr($transaction->payload->extra_data->rif, 0, -1) }}-{{ substr($transaction->payload->extra_data->rif, -1) }}
					</p>
					<p class='body1 body1--right'>
						{{ $BankListSearch[$transaction->payload->extra_data->code] }}
					</p>
					<p class='body1 body1--right'>
						{{ $transaction->payload->extra_data->type }}
					</p>
				@else
					<p class='body1 body1--right text__bold'>
						Pago realizado a:
					</p>
					<p class='body1 body1--right'>
						Sistema gedure
					</p>
				@endif
			</div>
		</div>

		<div>
			<div class="container__left">
				<p class='body1 text__bold'>
					Fecha:
				</p>
				<p class='body1'>
					{{ $transaction->created_at }}
				</p>
			</div>
			<div class="container__right">
				<p class='body1 body1--right text__bold'>
					Método de pago:
				</p>
				<p class='body1 body1--right'>
					{{ ucfirst($transaction->payment_method) }}
				</p>
			</div>
		</div>
		
		<div class='h5 text__bold'>
			Acciones
		</div>
		
		<table class='table'>
			<thead>
				<tr>
					<th class='text__left tc'>Descripción</th>
					<th class='text__right tc'>Importe</th>
				</tr>
			</thead>
			<tbody>
				@foreach ($transaction->payload->actions as $action)
					<tr>
						<td class='text__left tc'>{{ $action->reason }}</td>
						<td class='text__right tc'>{{ parseMoney($action->amount) }}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
		
		<div class='body1 text__right'>
			<span class='text__bold'>Total: </span> {{ parseMoney($transaction->amount) }}
		</div>
		
		<div class='sello'>
			<hr class='sello__divider'/>
			<div class='body1 text__center'>Sello</div>
		</div>
		
		@if ($transaction->exonerado)
			<div class='text__opacity--semi'>
				<p class='body1 text__bold'>
					Pago exonerado por:
				</p>
				<p class='body1'>
					@if ($transaction->exonerante)
						{{ $transaction->exonerante->name }} ({{ $transaction->exonerante->privilegio+$transaction->exonerante->username }})
					@else
						U.E.P A.P.E.P "La Candelaria"
					@endif
				</p>
				<span></span>
			</div>
		@endif
		
		<div class='powered body1 text__opacity--semi text__bold--semi'>
			Powered by
			<br/>
			<img class='powered__img' width='60' src='{{ storage_path('app/public/gedure-logo-recto.svg') }}' />
		</div>
	</div>
</body>
</html>