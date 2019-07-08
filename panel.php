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
		$progeGuia = $_SESSION['profeGuia'];
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
		<div id="panel">
			<img id="avatar" src="<?php echo $avatar; ?>" alt="Avatar" width="120" height="120">
			<span id="user"><?php echo $user ?></span>
			<nav id="panel">
				<div class="div-fix">
					<?php
					if ($_SESSION['loginIs']=="admin" || $_SESSION['loginIs']=="creador"){?>
					<p class="titulo-panel" data-selector="1" data-name="Gestión" data-open=">">Gestión ></p>
					<div class="div-fix2" id="panel-content1">
						<div class="panel-content">
							<span class="item-panel"><span class="icon-file-word"></span>Manual</span>
							<span class="item-panel" data-content="notificaciones">Notificaciones</span>
							<span class="item-panel" data-content="registros"><span class="icon-terminal"></span>Registros</span>
							<span class="item-panel" data-content="modificar"><span class="icon-user-circle"></span>Modificar</span>
							<span class="item-panel" data-content="matricula"><span class="icon-file-text2"></span>Matricula</span>
							<span class="item-panel" data-content="boletas"><span class="icon-newspaper"></span>Boletas</span>
							<span class="item-panel" data-content="notas">Notas</span>
							<span class="item-panel" data-content="borrar"><span class="icon-bin"></span>Borrar</span>
						</div>
					</div>
					<p class="titulo-panel" data-selector="2" data-name="Cuenta" data-open=">">Cuenta ></p>
					<div class="div-fix2" id="panel-content2">		
					<div class="panel-content">
						<span class="item-panel" data-content="opciones"><span class="icon-cog"></span>Opciones</span>
						<a href="logout.php" class="item-panel"><span class="icon-power-off"></span>Salir</a>
					</div>
					</div>
					<?php
					}else if ($_SESSION['loginIs']=="user"){?>
						<p class="titulo-panel" data-selector="1">Gestión</p>
						<div class="div-fix2" id="panel-content1">	
							<div class="panel-content">
								<span class="item-panel"><span class="icon-book"></span>Información</span>
								<span class="item-panel"><span class="icon-newspaper"></span>Boleta</span>
								<span class="item-panel"><span class="icon-clock"></span>Horario</span>
								<span class="item-panel"><span class="icon-file-pdf"></span>Constancias</span>
							</div>
						</div>
						<p class="titulo-panel" data-selector="2">Cuenta</p>
						<div class="div-fix2" id="panel-content2">
							<div class="panel-content">
								<span class="item-panel"><span class="icon-cog"></span>Opciones</span>
								<span class="item-panel"><span class="icon-power-off"></span>Salir</span>
							</div>
						</div>
					<?php
					}?>
				</div>
			</nav>
			<span id="logo">
				<span>Desarrollado por Recker</span>
			</span>
		</div>
		<div id="contenido">
			<span id="c-titulo-bienvenidos">Bienvenido</span>
			<div id="c-contenido-bienvenidos">Le damos la bienvenida al Panel de Administación, aquí usted prodrá realizar acciones como: carga de matricula, carga de boletas, modificar usuarios, eliminar usuarios, ver los registros, borrar cursos o boletas, entre otras cosas. Se le recomienda leerse el manual para poder obtener información completa sobre las acciones que realizan cada función en la web.
			</div>
		</div>
	</main>
	<div id="cookies">
		<span>Este sitio web utiliza cookies propias para que usted tenga una mejor experiencia de usuario. Si continúa navegando está dando su consentimiento para la aceptación de las mencionadas cookies y la aceptación de nuestra <a href="politica-cookies.php" class="link">política de cookies</a>.</span>
		<a href="javascript:void(0)" class="ok" id="confirm_cookie">Aceptar politicas de cookies</a>
	</div>
	<script type="text/javascript" src="assets/new_js/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="assets/new_js/func_global.js"></script>
	<script type="text/javascript" src="assets/new_js/func_panel.js"></script>
	<script type="text/javascript" src="assets/new_js/cookies.js"></script>
</body>
</html>
<?php
}else {
	header("location: login.php");
}
?>
