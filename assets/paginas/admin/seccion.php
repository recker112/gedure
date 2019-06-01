<span id="admin-titulo6" style="display: none;"><span class="icon-bin"></span><b>Borrar Sección/Boletas</b></span>
<div class="admin-delete" style="display: none;">
	<div class="seleccion">
		<select id="admin-delete-select">
			<option selected="selected" value="sec">Sección</option>
			<option value="bol">Boletas</option>
		</select>
	</div>
	<form id="admin-delete" method="POST" autocomplete="off">
		<div class="secciones-delete">
			<select name="curso" id="admin_del_curso">
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
	      <select name="seccion" id="admin_del_seccion">
	        <option value="" selected="selected">Sección</option>
	        <option value="A">A</option>
	        <option value="B">B</option>
	        <option value="C">C</option>
	        <option value="U">U</option>
	        <option value="all">Todos</option>
	      </select>
		</div>
		<input type="hidden" name="cedula" value="<?php echo $_SESSION['cedula']; ?>">
      <input id="delete-seccion" type="submit" name="delete" value="Borrrar sección">
      <input style="display: none;" id="delete-boletas" type="submit" name="delete" value="Borrrar boletas">
      <img id="loading_delete" style="display: none;" src='assets/img/loading.gif' width='56' height='56' alt='loading' />
	</form>
</div>