<!-- Matricula -->
<div class="c-caja" id="c-contenido-matricula" class="c-contenido" style="display: none">
  <div class="box">
    <span class="title">Matricula</span>
    <form action="#" method="POST" id="ma-form" enctype="multipart/form-data">
    <div class="ma-div1">
      <input type="file" id="ma-file" name="archivo" />
      <span>(Máximo: 10KB)</span>
    </div>
    <div class="ma-div2">
      <select class="grado" name="curso" id="ma-grado">
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
        <select class="seccion" name="seccion" id="ma-grado">
          <option value="" selected="selected">Sección</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="U">U</option>
      </select>
    </div>
    <div class="ma-div3">	
      <button id="ma-ok">Subir archivo</button>
      <img id="ma-loading" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
      <p></p>
    </div>
    </form>
  </div>
</div>