<main>
	<form id="form_login" action="#" method="POST">
		<h1>Ingresa tus datos</h1>
		<div class="login-textos">
			<label for="usuario"><span class="icon-user"></span>Usuario</label>
			<label for="contrasena"><span class="icon-key"></span> Contraseña</label>
		</div>
		<div class="login-datos">
			<input type="text" name="cedula" id="login-user" placeholder="Usuario" />
			<input type="password" name="password" id="login-password" placeholder="Contraseña" />
		</div>
		<div class="login-remember">
			<input type="checkbox" name="remember" id="remember" />
			<label for="remember">Recuerdame en este equipo</label>
		</div>
		<div class="login_submit">
			<button>Entrar</button>
			<img id="login_loading" style="display: none;" src='assets/img/loading.gif' width='64' height='64' alt='loading' />
		</div>
		<input type="hidden" name="token" value="<?php echo password_hash("reckersito49937", PASSWORD_BCRYPT) ?>">
	</form>
</main>