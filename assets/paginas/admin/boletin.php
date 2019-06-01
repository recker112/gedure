<span id="admin-titulo4" style="display: none;"><span class=" icon-newspaper"></span><b>Subir  boletas</b></span>
<div class="admin-boletin" style="display: none;">
  <form action="#" method="post" enctype="multipart/form-data" id="boletin">
    <div class="archivo">
       <input type="file" name="archivo" id="archivo_boletin" multiple="" />
        <br/>
        <span class="max">(Máximo: 2MB)</span>
    </div>
    <div class="archivo fix_loading3">
      <select name="curso" id="curso_boletin">
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
      <select name="seccion" id="seccion_boletin">
        <option value="" selected="selected">Seccion</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="U">U</option>
      </select>
    </div>
    <img id="loading_boletin" style="display: none;" src='assets/img/loading.gif' width='56' height='56' alt='loading' />
    <input type="submit" value="Realizar" id="ok_boletin" disabled="disabled" />
  </form>
</div>