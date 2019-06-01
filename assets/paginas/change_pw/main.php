	<main>
		<form action="#" method="POST" id="change_pw" autocomplete="off">
			<h1>Cambiar contraseña</h1>
			<div class="pass_old_label">
				<label for="pass_o">Contraseña actual</label>
			</div>
			<div class="pass_old">
				<input type="password" id="pass_o" name="old_pw" value="" placeholder="Contraseña actual" />
			</div>
			<div class="pass_new_label">
				<label for="pass_n">Nueva contraseña</label>
				<label for="pass_nv">Repetir contraseña</label>
			</div>
			<div class="pass_new">
				<input type="password" id="pass_n" name="new_pw" value="" placeholder="Nueva contraseña" />
        		<input type="password" id="pass_nv" name="new_pw2" value="" placeholder="Verificar contraseña" />
			</div>
			<div id="submit" class="submit">
				<input id="change_pw_ok" type="submit" value="Cambiar" />
				<img id="loading" style="display: none;" src='assets/img/loading.gif' width='43' height='43' alt='loading' />
			</div>
		</form>
	</main>