	<main>
		<!-- Panel -->
		<div id="panel">
			<span id="title">PANEL</span>
			<nav>
				<?php if ($privilegio == "A-"){ ?>
				<span class="titulo-panel">Gestión</span>
				<a href="admin/manual.php" target="visor" class="item-panel" data-content="bienvenidos"><span class="icon-book"></span>Manual</a>
				<span class="item-panel" data-content="registros" id="registrosShow"><span class="icon-terminal"></span>Registros</span>
				<span id="nav_modificar" class="item-panel" data-content="modificar"><span class="icon-user-circle"></span>Modificar</span>
				<span class="item-panel" data-content="matricula"><span class="icon-file-pdf"></span>Matricula</span>
				<span class="item-panel" data-content="boletas"><span class="icon-file-excel"></span>Boletas</span>
				<span class="item-panel" data-content="configuracion"><span class="icon-cogs"></span>Configuracion</span>
				<span class="item-panel" data-content="borrar"><span class="icon-bin"></span>Borrar</span>
				<span class="titulo-panel">Noticias</span>
				<span class="item-panel" data-content="noticias"><span class="icon-newspaper"></span>Publicar noticia</span>
				<span class="item-panel" data-content="anuncios"><span class="icon-newspaper"></span>Publicar anuncio</span>
				<span class="item-panel" data-content="borrarN"><span class="icon-bin"></span>Borrar noticias</span>
				<?php }else if ($privilegio == "V-"){ ?>
				<span class="titulo-panel">Gestión</span>
				<span class="item-panel" data-content="informacion"><span class="icon-book1"></span>Información</span>
				<a href="user/boleta.php" target="visor" class="item-panel" data-content="bienvenidos"><span class="icon-edit"></span>Boleta</a>
				<a href="user/horario.php" target="visor" class="item-panel" data-content="bienvenidos"><span class="icon-clock-o"></span>Horario</a>
				<span class="item-panel" data-content="constancias"><span class="icon-file-word"></span>Constancias</span>
				<?php }else if($privilegio == "CR-") { ?>
				<span class="titulo-panel">Gestión</span>
				<span class="item-panel" data-content="noticias"><span class="icon-newspaper"></span>Publicar noticia</span>
				<?php } ?>
				<span class="titulo-panel">Cuenta</span>
					<? if ($privilegio !== "V-") {
						?>
						<span class="item-panel" data-content="avatar"><span class="icon-photo"></span>Avatar</span>
						<?
					} ?>
				<span class="item-panel" data-content="passChange"><span class="icon-key"></span>Contraseña</span>
				<a href="logout.php" class="item-panel"><span class="icon-power-off"></span>Salir</a>
			</nav>
			<span id="logo">
				<span>Desarrollado por Recker</span>
			</span>
		</div>