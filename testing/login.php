<?php 
require 'assets/php/consults/verify_cookie_session.php';
if ($verify_cs){
	header("location: panel.php");
}
?>
<?php require('assets/php/login/head.php') ?>
	<body>
		<!-- Menu -->
		<header>
			<nav>
				<a href="news.php">Noticias UEP APEP</a>
				<a href="#">Entrar al SGI</a>
			</nav>
		</header>
		<main>
			<form id="form_login" action="#" method="POST">
				<div id="loginText">
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
				<input type="hidden" id="token" name="token" value="<?php echo password_hash("reckersito49937", PASSWORD_BCRYPT) ?>">
			</form>
		</main>
<?php require('assets/php/login/footer.php') ?>