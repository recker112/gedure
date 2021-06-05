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
			$newText = 'Bs/S '.$newText.','.$decimals;
			
			return $newText;
		}
	?>
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
	</style>
</head>
<body>
	<div class='paper'>
		<div class='container'>
			<div class='container__instituto'>
				<img class='instituto__logo' width='75' src='{{ storage_path('app/public/favicon.png') }}' />
				<div>
					<p class='body1 text__bold'>
						U.E.P.A.P.E.P "La Candelaria"
					</p>
					<p class='body1 text__opacity'>
						Movimiento #{{ $transaction->id }}
					</p>
				</div>
			</div>
			
			<div class='transaction__logo text__bold--semi'>
				<span class='transaction__logo--part1'>Transacción</span> <span class='transaction__logo--part2'>realizada</span>
			</div>
		</div>
		
		<hr class='divider' />
		
		<div class='container__box'>
			<div>
				<p class='body1 text__bold'>
					Comprobante a nombre de:
				</p>
				<p class='body1'>
					{{ $transaction->user->name }} ({{ $transaction->user->privilegio . $transaction->user->username }})
				</p>
			</div>
			
			@if ($transaction->type === 'pago verificado')
				<div class='text__right'>
					<p class='body1 text__bold'>
						Pago realizado a:
					</p>
					<p class='body1'>
						{{ $transaction->payload->extra_data->name }}
						<br />
						{{ $BankListSearch[$transaction->payload->extra_data->code] }}
						<br />
						{{ $transaction->payload->extra_data->type }}
					</p>
				</div>
			@endif
		</div>
		
		<div class='container__box'>
			<div>
				<p class='body1 text__bold'>
					Fecha:
				</p>
				<p class='body1'>
					{{ $transaction->created_at }}
				</p>
			</div>
			
			<div class='text__right'>
				<p class='body1 text__bold'>
					Método de pago:
				</p>
				<p class='body1'>
					{{ $transaction->payment_method }}
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
			<br />
			<span class='text__bold'>Restante en cuenta: </span> {{ parseMoney($transaction->previous_balance+$transaction->amount) }}
		</div>
		
		<div class='sello'>
			<hr class='sello__divider'/>
			<div class='body1 text__center'>Sello/firma</div>
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
						U.E.P.A.P.E.P "La Candelaria"
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