<!-- Configuracion -->
<div class="c-caja" id="c-contenido-configuracion" style="display: none">
  <div class="box">
    <span class="title">Configuracion de cuentas</span>
    <form action="#" id="c-form" method="POST" autocomplete="off">
      <div id="c-selectOption" class="c-div1">
        <span data-select="estu" class="active">Estudiante</span>
        <span data-select="sec">Sección</span>
        <input type="hidden" name="option" value="estu" />
      </div>
      <div class="c-div2">
        <span>Notas</span>
        <br/>
        <label for="n_notas_a">Activar</label>
        <input type="radio" id="n_notas_a" name="nota" value="A" checked="checked">
        <label for="n_notas_d">Desactivar</label>
        <input type="radio" id="n_notas_d" name="nota" value="D">
      </div>
      <div class="c-div3">
        <span>Horarios</span>
        <div>
          <label for="n_horarios_a">Activar</label>
          <input type="radio" id="n_horarios_a" name="horario" value="A" checked="checked">
          <label for="n_horarios_d">Desactivar</label>
          <input type="radio" id="n_horarios_d" name="horario" value="D">
        </div>
      </div>
      <div class="c-div4">
        <input class="inputText" type="text" id="c-user" name="cedula" placeholder="Cédula" />
      </div>
      <div id="c-secGra" class="c-div5" style="display: none">
        <select class="grado" name="grado" id="c-grado">
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
        <select class="seccion" name="seccion" id="c-seccion">
          <option value="">Sección</option>
          <option value="A" selected="selected">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="U">U</option>
        </select>
      </div>
      <div class="c-div6">
        <button id="c-ok">Realizar cambios</button>
        <img id="c-loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
      </div>
    </form>
  </div>
</div>