<!-- Matricula -->
<span class="c-caja" id="c-titulo-matricula" class="c-titulo"><span class="icon-file-pdf"></span>Subir/Cargar matricula</span>
<div class="c-caja" id="c-contenido-matricula" class="c-contenido">
  <form method="POST" id="form_matricula" enctype="multipart/form-data">
    <div id="m-archivo">
      <input type="file" id="matri_archivo" name="archivo" />
      <br>
      <span>(Máximo: 10KB)</span>
    </div>
    <div id="m-curso">
      <select class="grado" name="curso" id="matri_curso">
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
        <select class="seccion" name="seccion" id="matri_seccion">
          <option value="" selected="selected">Sección</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="U">U</option>
      </select>
    </div>
    <div id="m-cargar">	
      <button id="matri_boton">Subir archivo</button>
      <img id="matri_loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
      <p></p>
    </div>
  </form>
</div>