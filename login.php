<?php 
require 'assets/php/verify_cookie_session.php';
if ($verify_cs){
	header("location: panel.php");
}
?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<title>UEP APEP "La Candelaria"</title>
		<meta name="description" content="Pagina web de la UEP APEP La Candelaria, lugar donde los estudiantes podrán ver sus notas y otras actividades" />
		<meta name="author" content="Recker" />
		<meta name="copyright" content="UEP APEP La Candelaria" />
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="stylesheet" type="text/css" href="assets/css/login.css" />
		<link rel="icon" type="image/png" href="assets/img/farvicon.png" />
	</head>
	<body>
		<!-- Menu -->
		<header>
			<div class="caja-menu">
				<!-- Logo -->
				<img class="logo" src="assets/img/logo.png" alt="Logo" width="120" height="38" />
				<!-- Menu -->
				<p>Login</p>
			</div>
		</header>
		<main>
			<form id="form_login" action="#" method="POST">
				<div id="login-text">
					<h1>Ingresa tus datos</h1>
				</div>
				<div id="login-user">
					<input type="text" name="cedula" id="login_user" placeholder="Usuario" />
				</div>
				<div id="login-password">
					<input type="password" name="password" id="login_password" placeholder="Contraseña" />
				</div>
				<div id="login-remember">
					<input type="checkbox" name="remember" id="remember" />
					<label for="remember">Recuerdame en este equipo</label>
				</div>
				<div id="login-submit">
					<button id="login_button">Entrar</button>
					<img id="login_loading" style="display: none;" src='assets/img/loading.svg' height='37' alt='imagen de carga' />
				</div>
				<input type="hidden" name="token" value="<?php echo password_hash("reckersito49937", PASSWORD_BCRYPT) ?>">
			</form>
		</main>
		<div id="popad">
			<div id="popad-caja">
				<div id="popad-title">
					<span id="popad-titulo"></span>
					<span id="popad-cerrar">X</span>
				</div>
				<div id="popad-caja2">
					<span id="popad-info"></span>
				</div>
			</div>
		</div>
		<?php require 'footer.php'; ?>
		<script type="text/javascript" src="assets/new_js/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src="assets/new_js/func_global.js"></script>
		<script type="text/javascript" src="assets/new_js/ajax_login.js"></script>
	</body>
</html>