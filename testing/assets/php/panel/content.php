    <!-- Contenido -->
    <div id="contenido">
      <?php 
      if ($privilegio == "A-") { 
        require 'contentAdmin/welcome.php';
        require 'contentAdmin/registros.php';
        require 'contentAdmin/modificar.php';
        require 'contentAdmin/matricula.php';
        require 'contentAdmin/boletas.php';
        require 'contentAdmin/configuracion.php';
        require 'contentAdmin/borrar.php';
      }elseif ($privilegio == "V-"){
        require 'contentStudent/welcome.php';
        require 'contentStudent/informacion.php';
        require 'contentStudent/constancias.php';
      }elseif ($privilegio == "CR-") {
        require 'contentCreator/welcome.php';
      }
      ?>
			<!-- Opciones -->
			<span class="c-caja" id="c-titulo-opciones"><span class="icon-key"></span>Cambiar contraseña</span>
			<div class="c-caja" id="c-contenido-opciones">
				<form action="" id="form_opciones" method="POST" autocomplete="off">
					<div id="pass-actual">
						<span>Contraseña actual</span>
						<input type="password" id="pass_actual" name="pass_actual" placeholder="Contraseña actual" />
					</div>
					<div id="pass-new">
						<div class="pass-new-text">
							<span>Nueva contraseña</span>
							<input type="password" id="pass_new" name="pass_new" placeholder="Nueva contraseña" />
						</div>
						<div class="pass-new-inputs">
							<span>Repetir contraseña</span>
							<input type="password" id="pass_new_repit" name="pass_new_repit" placeholder="Repetir contraseña" />
						</div>
					</div>
					<div id="o-submit">
						<button id="op_boton">Cambiar</button>
						<img id="op_loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
					</div>
				</form>
			</div>
		</div>
  </main>