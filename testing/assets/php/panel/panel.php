	<main>
		<!-- Panel -->
		<div id="panel">
			<img id="avatar" src="<?php echo $avatar; ?>" alt="Avatar" width="120" height="120">
			<span id="user"><?php echo $user ?></span>
			<nav id="panel">
				<div class="div-fix">
					<?php if ($privilegio == "A-"){ ?>
					<p class="titulo-panel" data-selector="1" data-name="Gestión" data-open=">">Gestión <span class="icon-chevron-right"></span></p>
					<div class="div-fix2" id="panel-content1">
						<div class="panel-content">
							<a href="admin/manual.php" target="visor" class="item-panel" data-content="bienvenidos"><span class="icon-book"></span>Manual</a>
							<span class="item-panel" data-content="registros" id="registrosShow"><span class="icon-terminal"></span>Registros</span>
							<span id="nav_modificar" class="item-panel" data-content="modificar"><span class="icon-user-circle"></span>Modificar</span>
							<span class="item-panel" data-content="matricula"><span class="icon-file-pdf"></span>Matricula</span>
							<span class="item-panel" data-content="boletas"><span class="icon-file-excel"></span>Boletas</span>
							<span class="item-panel" data-content="configuracion"><span class="icon-cogs"></span>Configuracion</span>
							<span class="item-panel" data-content="borrar"><span class="icon-bin"></span>Borrar</span>
						</div>
					</div>
					<?php }else if ($privilegio == "V-"){ ?>
						<p class="titulo-panel" data-selector="1" data-name="Gestión" data-open=">">Gestión <span class="icon-chevron-right"></span></p>
						<div class="div-fix2" id="panel-content1">	
							<div class="panel-content">
								<span class="item-panel" data-content="informacion"><span class="icon-book1"></span>Información</span>
								<a href="user/boleta.php" target="visor" class="item-panel" data-content="bienvenidos"><span class="icon-edit"></span>Boleta</a>
								<a href="user/horario.php" target="visor" class="item-panel" data-content="bienvenidos"><span class="icon-clock-o"></span>Horario</a>
								<span class="item-panel" data-content="constancias"><span class="icon-file-word"></span>Constancias</span>
							</div>
						</div>
					<?php }else if($privilegio == "CR-") { ?>
						<p class="titulo-panel" data-selector="1" data-name="Gestión" data-open=">">Gestión <span class="icon-chevron-right"></span></p>
						<div class="div-fix2" id="panel-content1">	
							<div class="panel-content">
								<span class="item-panel" data-content="noticias"><span class="icon-newspaper"></span>Publicar noticia</span>
							</div>
						</div>
					<?php } ?>
					<p class="titulo-panel" data-selector="2" data-name="Cuenta" data-open=">">Cuenta <span class="icon-chevron-right"></span></p>
					<div class="div-fix2" id="panel-content2">		
						<div class="panel-content">
							<? if ($privilegio !== "V-") {
								?>
								<span class="item-panel" data-content="avatar"><span class="icon-photo"></span>Avatar</span>
								<?
							} ?>
							<span class="item-panel" data-content="opciones"><span class="icon-key"></span>Contraseña</span>
							<a href="logout.php" class="item-panel"><span class="icon-power-off"></span>Salir</a>
						</div>
					</div>
				</div>
			</nav>
			<span id="logo">
				<span>Desarrollado por Recker</span>
			</span>
		</div>