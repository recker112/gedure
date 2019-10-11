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
		<div class="avatar">
			<p class="user"><?php echo $user ?></p>
			<img src="<?php echo $avatar; ?>" width="48" height="48" alt="Vatar">
		</div>
	</header>