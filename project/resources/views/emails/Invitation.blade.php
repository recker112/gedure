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
			background-color: #64a7d6 !important;
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
	<!-- Compiled and minified CSS -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

	<!-- Compiled and minified JavaScript -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
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
				Fuiste invitado al sistema, de click en el botรณn para iniciar el proceso de registro.
			</p>
			<div class='main__button main__line'>
				<a target='_blank' href='{{ config('app.url', '') }}/invitacion/{{ $key }}' class="waves-effect waves-light btn button">
					Aceptar invitación
				</a>
			</div>
		</div>
		<footer class='footer'>
			<p>
				&copy; 2020 - Desarrollado por Recker
			</p>
			<p>
				Powered by gedure
			</p>
		</footer>
	</div>
</body>
</html>