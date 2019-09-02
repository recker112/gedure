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