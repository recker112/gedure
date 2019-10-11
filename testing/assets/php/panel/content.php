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
				require 'contentCreator/noticias.php';
      }
      ?>
			<!-- Opciones -->
			<div class="c-caja" id="c-contenido-opciones" style="display: none">
				<div class="box">
					<span class="title">Opciones</span>
					<form action="#" id="form_opciones" method="POST" autocomplete="off">
						<div class="op-div1">
							<span>Contraseña actual</span>
							<input class="inputText" type="password" id="pass_actual" name="pass_actual" placeholder="Contraseña actual" />
						</div>
						<div class="op-div2">
							<div class="pass-new-text">
								<span>Nueva contraseña</span>
								<input class="inputText" type="password" id="pass_new" name="pass_new" placeholder="Nueva contraseña" />
							</div>
							<div class="pass-new-inputs">
								<span>Repetir contraseña</span>
								<input class="inputText" type="password" id="pass_new_repit" name="pass_new_repit" placeholder="Repetir contraseña" />
							</div>
						</div>
						<div class="op-div3">
							<button id="op_boton">Cambiar</button>
							<img id="op_loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
					</div>
					</form>
				</div>
			</div>
		</div>
  </main>