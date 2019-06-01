<body>
		<!-- Menu -->
		<header>
			<!-- Boton mobil -->
			<div class="m-menu">
				<span class="m-text">Menu</span>
				<span class="m-boton icon-menu"></span>
			</div>
			<div class="caja-menu">
				<!-- Logo -->
				<img class="logo" src="assets/img/logo.png" alt="Logo" width="120" height="38" />
				<!-- Menu -->
				<nav class="menu">
					<a href="<?php 
					if($_SESSION['privilegio'] == "A-") {
						echo 'admin.php';
					}else {
						echo 'user.php';
					}
					?>"><span class="icon-exit"></span>Regresar</a>
					<img class="m-logo" src="assets/img/logo.png" alt="Logo" width="120" height="38" />
				</nav>
		</header>