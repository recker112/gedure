<!-- Borrar -->
<div class="c-caja" id="c-contenido-borrar" style="display: none">
  <div class="box">
    <span class="title">Borrar</span>
    <form action="#" id="bo-form" method="POST">
      <div id="bo-selectOption" class="bo-div1">
        <span data-select="sec" class="active">Sección</span>
        <span data-select="bol">Boletas</span>
        <input type="hidden" id="bo-inputUser" name="select" value="sec" />
      </div>
      <div class="bo-div2">
        <select name="curso" id="bo-curso">
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
        <select name="seccion" id="bo-seccion">
          <option value="" selected="selected">Sección</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="U">U</option>
          <option value="all">Todos</option>
        </select>
      </div>
      <div class="bo-div3">
        <button id="bo-ok">Borrar</button>
        <img id="bo-loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
      </div>
    </form>
  </div>
</div>