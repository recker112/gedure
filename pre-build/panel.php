<?php
require 'assets/php/verify_cookie_session.php';
if ($verify_cs){
	$privilegio = $_SESSION['privilegio'];
	if ($privilegio == "V-") {
		$user = $_SESSION['user'];
		$cedula = $_SESSION['cedula'];
		$cedulaSin = $_SESSION['cedulaSin'];
		$curso = $_SESSION['curso'];
		$seccion = $_SESSION['seccion'];
		$archivo = $_SESSION['archivo'];
		$nota = $_SESSION['nota'];
		$horario = $_SESSION['horario'];
		$profeGuia = $_SESSION['profeGuia'];
		$avatar = $_SESSION['avatar'];
		$token = $_SESSION['token'];
	}else if ($privilegio == "A-"){
		$user = $_SESSION['user'];
		$cedula = $_SESSION['cedula'];
		$cedulaSin = $_SESSION['cedulaSin'];
		$avatar = $_SESSION['avatar'];
		$token = $_SESSION['token'];
	}else if ($privilegio == "CR-"){
		$user = $_SESSION['user'];
		$cedula = $_SESSION['cedula'];
		$cedulaSin = $_SESSION['cedulaSin'];
		$avatar = $_SESSION['avatar'];
		$token = $_SESSION['token'];
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>UEP APEP "La Candelaria"</title>
	<meta name="description" content="Pagina web de la UEP APEP La Candelaria, lugar donde los estudiantes podrán ver sus notas y otras actividades">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" type="text/css" href="assets/css/panel.css" />
	<link rel="icon" type="image/png" href="assets/img/farvicon.png" />
</head>
<body>
	<header>
		<!-- Header -->
		<span id="button_panel" class="menu icon-menu"></span>
		<?php if ($privilegio == "A-"): ?>
		<div id="buscador">
			<div id="search">
				<input type="text" name="search" id="search_estudi" placeholder="Estudiante">
				<div id="search_status">
				</div>
			</div>
		</div>
		<?php endif ?>
		<p>Panel</p>
	</header>
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
							<span class="item-panel" data-content="registros"><span class="icon-terminal"></span>Registros</span>
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
								<span class="item-panel"><span class="icon-terminal"></span>Registros</span>
								<span class="item-panel"><span class="icon-newspaper"></span>Subir contenido</span>
							</div>
						</div>
					<?php } ?>
					<p class="titulo-panel" data-selector="2" data-name="Cuenta" data-open=">">Cuenta <span class="icon-chevron-right"></span></p>
					<div class="div-fix2" id="panel-content2">		
						<div class="panel-content">
							<span class="item-panel" data-content="opciones"><span class="icon-key"></span>Contraseña</span>
							<a href="logout.php" class="item-panel"><span class="icon-power-off"></span>Salir</a>
						</div>
					</div>
				</div>
			</nav>
			<span id="logo">
				<span>Desarrollado por Recker</span>
			</span>
		<!-- Contenido -->
		</div>
		<div id="contenido">
			<?php if ($privilegio == "A-") { ?>
			<!-- Bienvenidos -->
			<span class="c-caja" id="c-titulo-bienvenidos">Bienvenido</span>
			<div class="c-caja" id="c-contenido-bienvenidos">Le damos la bienvenida al Panel de Administación, aquí usted prodrá realizar acciones como: carga de matricula, carga de boletas, modificar usuarios, eliminar usuarios, ver los registros, borrar cursos o boletas, entre otras cosas. Se le recomienda leerse el manual para poder obtener información completa sobre las acciones que realizan cada función en la web.
			</div>
			<!-- Registros -->
			<span class="c-caja" id="c-titulo-registros"><span class="icon-terminal"></span>Registros</span>
			<div class="c-caja" id="c-contenido-registros">
				<div id="console">
					<div class="titulos">
						<span class="r-titulo">Cedula</span>
						<span class="r-titulo r-titulo-accion">Acción</span>
					</div>
					<div class="datos">
						<div id="cedula">
						</div>
						<div id="accion">
						</div>
					</div>
				</div>
			</div>
			<!-- Modificar -->
			<span class="c-caja" id="c-titulo-modificar"><span class="icon-user-circle"></span>Modificar</span>
			<div class="c-caja" id="c-contenido-modificar">
				<div id="m-selector">
					<select id="m_selector_id">
						<option value="user" selected="">Usuario</option>
						<option value="prof">Profesores</option>
					</select>
				</div>
				<form method="POST" autocomplete="off" id="form_modificar_user">
					<div class="m-div1">
						<select id="m_selector_user" name="privilegio">
							<option value="V-" selected="selected">V-</option>
							<option value="A-">A-</option>
							<option value="CR-">CR-</option>
						</select>
						<input type="text" id="m_cedula_user" name="cedula" placeholder="Cédula" />
						<input type="password" id="m_pass_user" name="password" placeholder="Contraseña" />
					</div>
					<div class="m-div2">
						<input type="text" id="m_name_user" name="name" placeholder="Nombre" />
					</div>
					<div class="m-options">
						<select id="m_option_user" name="option">
					        <option value="INSERT" selected="selected">Insertar</option>
					        <option value="UPDATE">Actualizar</option>
					        <option value="DELETE">Eliminar</option>
					      </select>
					      <select class="grado" name="grado" id="m_grado_user">
					        <option value="" selected="selected">Grado/Año</option>
					        <option value="1G">1 grado</option>
					        <option value="2G">2 grado</option>
					        <option value="3G">3 grado</option>
					        <option value="4G">4 grado</option>
					        <option value="5G">5 grado</option>
					        <option value="6G">6 grado</option>
					        <option value="1">1 año</option>
					        <option value="2">2 año</option>
					        <option value="3">3 año</option>
					        <option value="4">4 año</option>
					        <option value="5">5 año</option>
					        <option value="6">6 año</option>
					      </select>
					      <select class="seccion" name="seccion" id="m_seccion_user">
					        <option value="" selected="selected">Sección</option>
					        <option value="A">A</option>
					        <option value="B">B</option>
					        <option value="C">C</option>
					        <option value="U">U</option>
					        <option value="1" hidden="">x</option>
					      </select>
					      <select class="lista" name="lista" id="m_lista_user">
					        <option value="" selected="selected">Lista</option>
					        <option value="1">1</option>
					        <option value="2">2</option>
					        <option value="3">3</option>
					        <option value="4">4</option>
					        <option value="5">5</option>
					        <option value="6">6</option>
					        <option value="7">7</option>
					        <option value="8">8</option>
					        <option value="9">9</option>
					        <option value="10">10</option>
					        <option value="11">11</option>
					        <option value="12">12</option>
					        <option value="13">13</option>
					        <option value="14">14</option>
					        <option value="15">15</option>
					        <option value="16">16</option>
					        <option value="17">17</option>
					        <option value="18">18</option>
					        <option value="19">19</option>
					        <option value="20">20</option>
					        <option value="21">21</option>
					        <option value="22">22</option>
					        <option value="23">23</option>
					        <option value="24">24</option>
					        <option value="25">25</option>
					        <option value="26">26</option>
					        <option value="27">27</option>
					        <option value="28">28</option>
					        <option value="29">29</option>
					        <option value="30">30</option>
					        <option value="31">31</option>
					        <option value="32">32</option>
					        <option value="33">33</option>
					        <option value="34">34</option>
					        <option value="35">35</option>
					        <option value="36">36</option>
					        <option value="37">37</option>
					        <option value="38">38</option>
					      </select>
					</div>
					<div class="m-submit">
						<button id="m_button_user" data-modificar="user">Realizar</button>
						<img id="m_loading_user" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
					</div>
				</form>
				<form method="POST" id="form_modificar_prof" autocomplete="off">
					<div class="m-div1">
						<input type="text" name="name" id="m_name_prof" placeholder="Nombre">
					</div>
					<div class="m-options">
					      <select class="grado" name="curso" id="m_curso_prof">
					        <option value="" selected="selected">Grado/Año</option>
					        <option value="1G">1 grado</option>
					        <option value="2G">2 grado</option>
					        <option value="3G">3 grado</option>
					        <option value="4G">4 grado</option>
					        <option value="5G">5 grado</option>
					        <option value="6G">6 grado</option>
					        <option value="1">1 año</option>
					        <option value="2">2 año</option>
					        <option value="3">3 año</option>
					        <option value="4">4 año</option>
					        <option value="5">5 año</option>
					        <option value="6">6 año</option>
					      </select>
					      <select class="seccion" name="seccion" id="m_seccion_prof">
					        <option value="" selected="selected">Sección</option>
					        <option value="A">A</option>
					        <option value="B">B</option>
					        <option value="C">C</option>
					        <option value="U">U</option>
					      </select>
					</div>
					<div class="m-submit">
						<button id="m_button_prof" data-modificar="prof">Realizar</button>
						<img id="m_loading_prof" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
					</div>
				</form>
			</div>
			<!-- Matricula -->
			<span class="c-caja" id="c-titulo-matricula" class="c-titulo"><span class="icon-file-pdf"></span>Subir/Cargar matricula</span>
			<div class="c-caja" id="c-contenido-matricula" class="c-contenido">
				<form method="POST" id="form_matricula" enctype="multipart/form-data">
					<div id="m-archivo">
						<input type="file" id="matri_archivo" name="archivo" />
						<br>
						<span>(Máximo: 10KB)</span>
					</div>
					<div id="m-curso">
						<select class="grado" name="curso" id="matri_curso">
					        <option value="" selected="selected">Grado/Año</option>
					        <option value="1G">1 grado</option>
					        <option value="2G">2 grado</option>
					        <option value="3G">3 grado</option>
					        <option value="4G">4 grado</option>
					        <option value="5G">5 grado</option>
					        <option value="6G">6 grado</option>
					        <option value="1">1 año</option>
					        <option value="2">2 año</option>
					        <option value="3">3 año</option>
					        <option value="4">4 año</option>
					        <option value="5">5 año</option>
					        <option value="6">6 año</option>
					    </select>
					    <select class="seccion" name="seccion" id="matri_seccion">
					        <option value="" selected="selected">Sección</option>
					        <option value="A">A</option>
					        <option value="B">B</option>
					        <option value="C">C</option>
					        <option value="U">U</option>
				    </select>
					</div>
					<div id="m-cargar">	
						<button id="matri_boton">Subir archivo</button>
						<img id="matri_loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
						<p></p>
					</div>
				</form>
			</div>
			<!-- Boletas -->
			<span class="c-caja" id="c-titulo-boletas"><span class="icon-file-excel"></span>Subir boletas</span>
			<div class="c-caja" id="c-contenido-boletas">
				<form id="form_boletas" method="POST" enctype="multipart/form-data">
					<div id="b-archivo">
						<input type="file" id="b_archivo" name="archivo" multiple="" />
						<br>
						<span>(Máximo: 2MB)</span>
					</div>
					<div id="b-curso">
						<select class="grado" name="grado" id="b_grado">
					        <option value="" selected="selected">Grado/Año</option>
					        <option value="1G">1 grado</option>
					        <option value="2G">2 grado</option>
					        <option value="3G">3 grado</option>
					        <option value="4G">4 grado</option>
					        <option value="5G">5 grado</option>
					        <option value="6G">6 grado</option>
					        <option value="1">1 año</option>
					        <option value="2">2 año</option>
					        <option value="3">3 año</option>
					        <option value="4">4 año</option>
					        <option value="5">5 año</option>
					        <option value="6">6 año</option>
					    </select>
					    <select class="seccion" name="seccion" id="b_seccion">
					        <option value="" selected="selected">Sección</option>
					        <option value="A">A</option>
					        <option value="B">B</option>
					        <option value="C">C</option>
					        <option value="U">U</option>
					    </select>
					</div>
					<div id="b-cargar">	
						<button id="b_boton">Subir archivo</button>
						<img id="b_loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
						<p id="b_status"></p>
					</div>
				</form>
			</div>
			<!-- Configuracion -->
			<span class="c-caja" id="c-titulo-configuracion"><span class="icon-cogs"></span>Configurar notas y horarios</span>
			<div class="c-caja" id="c-contenido-configuracion">
				<form id="form_configuracion" method="POST" autocomplete="off">
					<div class="n-seleccion">
						<select id="conf_selector">
							<option selected="selected" value="estu">Estudiante</option>
							<option value="sec">Seccion</option>
						</select>
					</div>
					<div id="n-notas">
						<span>Notas</span>
						<div>
							<label for="n_notas_a">Activar</label>
							<input type="radio" id="n_notas_a" name="nota" value="A" checked="checked">
							<label for="n_notas_d">Desactivar</label>
							<input type="radio" id="n_notas_d" name="nota" value="D">
						</div>
					</div>
					<div id="n-horarios">
						<span>Horarios</span>
						<div>
							<label for="n_horarios_a">Activar</label>
							<input type="radio" id="n_horarios_a" name="horario" value="A" checked="checked">
							<label for="n_horarios_d">Desactivar</label>
							<input type="radio" id="n_horarios_d" name="horario" value="D">
						</div>
					</div>
					<div id="n-afectado">
						<input type="text" id="n_user" name="cedula" placeholder="Cedula" />
						<select class="grado" name="grado" id="n_grado" style="display: none">
					        <option value="" selected="selected">Grado/Año</option>
					        <option value="1G">1 grado</option>
					        <option value="2G">2 grado</option>
					        <option value="3G">3 grado</option>
					        <option value="4G">4 grado</option>
					        <option value="5G">5 grado</option>
					        <option value="6G">6 grado</option>
					        <option value="1">1 año</option>
					        <option value="2">2 año</option>
					        <option value="3">3 año</option>
					        <option value="4">4 año</option>
					        <option value="5">5 año</option>
					        <option value="6">6 año</option>
					    </select>
					    <select class="seccion" name="seccion" id="n_seccion" style="display: none">
					        <option value="" selected="selected">Sección</option>
					        <option value="A">A</option>
					        <option value="B">B</option>
					        <option value="C">C</option>
					        <option value="U">U</option>
					    </select>
					    <input type="hidden" name="option" value="estu" id="n_hidden">
					</div>
					<div id="n-submit">
						<button id="n_boton">Realizar cambios</button>
						<img id="n_loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
					</div>
				</form>
			</div>
			<!-- Borrar -->
			<span class="c-caja" id="c-titulo-borrar"><span class="icon-bin"></span>Borrar Sección/Boletas</span>
			<div class="c-caja" id="c-contenido-borrar">
				<form id="form_borrar" method="POST">
					<div id="borr-seleccion">
						<select id="borr_selec" name="select">
							<option value="sec" selected="selected">Sección</option>
							<option value="bol">Boletas</option>
						</select>
					</div>
					<div class="borr-curso">
						<select name="curso" id="borr_curso">
			        <option value="" selected="selected">Grado/Año</option>
			        <option value="1G">1 grado</option>
			        <option value="2G">2 grado</option>
			        <option value="3G">3 grado</option>
			        <option value="4G">4 grado</option>
			        <option value="5G">5 grado</option>
			        <option value="6G">6 grado</option>
			        <option value="1">1 año</option>
			        <option value="2">2 año</option>
			        <option value="3">3 año</option>
			        <option value="4">4 año</option>
			        <option value="5">5 año</option>
			        <option value="6">6 año</option>
		      	</select>
		      	<select name="seccion" id="borr_seccion">
		        	<option value="" selected="selected">Sección</option>
		        	<option value="A">A</option>
		        	<option value="B">B</option>
		        	<option value="C">C</option>
		        	<option value="U">U</option>
		        	<option value="all">Todos</option>
		      	</select>
					</div>
					<div id="borr-submit">
						<button id="borr_boton">Borrar</button>
						<img id="borr_loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
					</div>
				</form>
			</div>
			<?php }else if ($privilegio == "V-") {?>
			<!-- Bienvenidos -->
			<span class="c-caja" id="c-titulo-bienvenidos">Bienvenido</span>
			<div class="c-caja" id="c-contenido-bienvenidos">Le damos la bienvenida al Panel de Administación, aquí usted prodrá ver información sobre el estudiante, algunos datos personales de su progreso, y descarga de constancias.
			</div>
			<span class="c-caja" id="c-titulo-informacion"><span class="icon-book"></span>Información</span>
			<div class="c-caja" id="c-contenido-informacion">
				<div id="informacion">
					<span>Profesor Guia: <?php echo "$profeGuia." ?></span>
					<span>Curso: <?php 
					if ($curso[1]) {
						echo "$curso[0] grado $seccion.";
					}else {
						echo "$curso[0] año $seccion.";
					}
					?></span>
					<span>Número de lista: <?php echo "$archivo." ?></span>
				</div>
			</div>
			<span class="c-caja" id="c-titulo-constancias"><span class="icon-file-pdf"></span>Constancias</span>
			<div class="c-caja" id="c-contenido-constancias">
				<div id="constancias">
					<div class="row">
						<a class="estu" href="user/file_download.php?file=c_estudio">Estudio</a>
						<a class="assi" href="user/file_download.php?file=c_asistencia">Asistencia</a>
						<a class="bn_con" href="user/file_download.php?file=c_buena_conducta">Buena conducta</a>
					</div>
					<div class="row">
						<a class="acept_cup" href="user/file_download.php?file=c_aceptacion_cupo">Aceptación de cupo</a>
						<a class="solici" href="user/file_download.php?file=c_nota_certificada">Solicitud de notas</a>
					</div>
				</div>
			</div>
			<?php }else if ($privilegio == "CR-") { ?>
			<!-- Bienvenidos -->
			<span class="c-caja" id="c-titulo-bienvenidos">Bienvenido</span>
			<div class="c-caja" id="c-contenido-bienvenidos">Le damos la bienvenida al Panel de Administación, aquí usted prodrá realizar acciones como: carga de matricula, carga de boletas, modificar usuarios, eliminar usuarios, ver los registros, borrar cursos o boletas, entre otras cosas. Se le recomienda leerse el manual para poder obtener información completa sobre las acciones que realizan cada función en la web.
			</div>
			<?php } ?>
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
	<div id="cookies">
		<span>Este sitio web utiliza cookies propias para que usted tenga una mejor experiencia de usuario. Si continúa navegando está dando su consentimiento para la aceptación de las mencionadas cookies y la aceptación de nuestra <span class="cookie_link">política de cookies</span>.</span>
		<a href="javascript:void(0)" class="ok" id="confirm_cookie">Aceptar politicas de cookies</a>
	</div>
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
	<script type="text/javascript" src="assets/js/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="assets/js/func_global.js"></script>
	<script type="text/javascript" src="assets/js/func_panel.js"></script>
	<script type="text/javascript" src="assets/js/ajax_change_password.js"></script>
	<?php if ($privilegio == "A-"){ ?>
		<script type="text/javascript" src="assets/js/func_panel_admin.js"></script>
		<script type="text/javascript" src="assets/js/ajax_panel_buscador.js"></script>
		<script type="text/javascript" src="assets/js/ajax_panel_admin.js"></script>
	<?php } ?>
	<script type="text/javascript" src="assets/js/cookies.js"></script>
</body>
</html>
<?php
}else {
	header("location: login.php");
}
?>
