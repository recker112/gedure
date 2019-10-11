<!-- Boletas -->
<div class="c-caja" id="c-contenido-boletas" style="display: none">
  <div class="box">
    <span class="title">Boletas</span>
    <form action="#" id="form_boletas" method="POST" enctype="multipart/form-data">
      <div class="b-div1">
        <input type="file" id="b_archivo" name="archivo" multiple="" />
        <span>(Cantidad máxima: 40 archivos)</span>
        <span>(Tamaño máximo: 2MB)</span>
      </div>
      <div class="b-div2">
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
      <div class="b-div3">
        <button id="b_boton">Subir archivo</button>
        <img id="b_loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
        <p id="b_status"></p>
      </div>
    </form>
  </div>
</div>