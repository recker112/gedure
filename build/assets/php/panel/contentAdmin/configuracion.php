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
        <option value="">Grado/Año</option>
        <option value="1G">1 grado</option>
        <option value="2G">2 grado</option>
        <option value="3G">3 grado</option>
        <option value="4G">4 grado</option>
        <option value="5G">5 grado</option>
        <option value="6G">6 grado</option>
        <option value="1" selected="selected">1 año</option>
        <option value="2">2 año</option>
        <option value="3">3 año</option>
        <option value="4">4 año</option>
        <option value="5">5 año</option>
        <option value="6">6 año</option>
      </select>
      <select class="seccion" name="seccion" id="n_seccion" style="display: none">
        <option value="">Sección</option>
        <option value="A" selected="selected">A</option>
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