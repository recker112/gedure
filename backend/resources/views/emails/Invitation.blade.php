<!doctype html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
	<title>Invitación al sistema</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
	<style>
		* {
			margin: 0;
			padding: 0;
			font-family: Roboto;
		}
		
		.container {
			background: #dadbdc;
		}
		
		.header {
			margin: 20px;
			text-align: center;
		}
		
		.header__img {
			margin-top: 30px;
			margin-bottom: 5px;
		}
		
		.header__title {
			font-style: italic;
			font-weight: 600;
			font-size: 25px;
		}
		
		.main {
			background: #fff;
			border-radius: 5px;
			padding: 25px;
			margin: 25px auto;
			width: 500px;
		}
		
		.main__text {
			font-size: 18px;
		}
		
		.main__line {
			margin-top: 10px;
		}
		
		.main__button {
			text-align: center;
			margin-top: 20px;
			font-size: 40px;
		}
		
		.button {
			background-color: #1976d2 !important;
			text-decoration: none;
			color: white !important;
			padding: 10px 20px;
			border-radius: 10px;
			font-size: 22px;
		}
		
		.footer {
			width: 350px;
			margin: 0px auto;
			padding: 30px;
			text-align: center;
			border-top: 1px solid #00000040;
			opacity: 0.6;
		}
	</style>
</head>
<body>
	<div class='container'>
		<header class='header'>
			<div>
				<img class='header__img' src='{{ secure_asset('resources/favicon.png') }}' width='60' />
			</div>
			<span class='header__title'>U.E.P A.P.E.P La Candelaria</span>
		</header>
		<div class='main'>
			<p class='main__text' style='text-align: center'>Hola <strong>{{ $user->name }}</strong>.</p>
			<p class='main__line main__text'>
				Este es un correo de invitación al sistema, de click en el botón para poder saber cuál es su usuario y crear una contraseña.
			</p>
			<div class='main__button main__line'>
				<a target='_blank' href='{{ config('app.url', '') }}/invitacion/{{ $key }}' class="button">
					Aceptar invitación
				</a>
			</div>
		</div>
		<footer class='footer'>
			<p>
				&copy; U.E.P.A.P.E.P "La Candelaria" | 2021
			</p>
			<p>
				Powered by gedure
			</p>
		</footer>
	</div>
</body>
</html>