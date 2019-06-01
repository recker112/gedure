<span id="admin-titulo7" style="display: none;"><span class="icon-bin"></span><b>Activar/Desactivar notas y horarios</b></span>
<div class="admin-activar" style="display: none;">
	<div class="seleccion">
		<select id="admin-activar-select">
			<option selected="selected" value="estu">Estudiante</option>
			<option value="sec">Seccion</option>
		</select>
	</div>
	<form id="admin-activar-estu" method="POST" autocomplete="off">
		<div class="secciones-estu">
			<span>Notas</span>
			<div>
				<label for="admin_activar_a">Activar</label>
				<input type="radio" id="admin_activar_a" name="nota" value="A" checked="checked">
				<label for="admin_activar_d">Desactivar</label>
				<input type="radio" id="admin_activar_d" name="nota" value="D">
			</div>
			<span>Horarios</span>
			<div>
				<label for="admin_activar_ha">Activar</label>
				<input type="radio" id="admin_activar_ha" name="horario" value="A" checked="checked">
				<label for="admin_activar_hd">Desactivar</label>
				<input type="radio" id="admin_activar_hd" name="horario" value="D">
			</div>
		</div>
	  <input type="text" id="admin_activar_cedula" name="cedula" placeholder="Cedula">
      <input id="admin_activar_estu_ok" type="submit" name="delete" value="Realizar cambios">
      <img id="loading_activar_estudiante" style="display: none;" src='assets/img/loading.gif' width='56' height='56' alt='loading' />
	</form>
	<form id="admin-activar-sec" method="POST" autocomplete="off">
		<div class="secciones-estu">
			<span>Notas</span>
			<div>
				<label for="admin_activar_a2">Activar</label>
				<input type="radio" id="admin_activar_a2" name="nota" value="A" checked="checked">
				<label for="admin_activar_d2">Desactivar</label>
				<input type="radio" id="admin_activar_d2" name="nota" value="D">
			</div>
			<span>Horarios</span>
			<div>
				<label for="admin_activar_ha2">Activar</label>
				<input type="radio" id="admin_activar_ha2" name="horario" value="A" checked="checked">
				<label for="admin_activar_hd2">Desactivar</label>
				<input type="radio" id="admin_activar_hd2" name="horario" value="D">
			</div>
		</div>
		<select name="curso" id="admin_activar_curso">
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
		<select name="seccion" id="admin_activar_seccion">
		    <option value="" selected="selected">Sección</option>
		    <option value="A">A</option>
		    <option value="B">B</option>
		    <option value="C">C</option>
			<option value="U">U</option>
			<option value="all">Todos</option>
		</select>
		<div class="fix_admin_activar_sec_ok">
			<input id="admin_activar_sec_ok" type="submit" name="delete" value="Realizar cambios">
		</div>
      	<img id="loading_activar_secciones" style="display: none;" src='assets/img/loading.gif' width='56' height='56' alt='loading' />
	</form>
</div>