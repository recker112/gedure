<!-- Modificar -->
<div class="c-caja" id="c-contenido-modificar" style="display: none">
  <div class="window">
    <span class="active" data-select="user">Modificar</span>
    <span data-select="prof">Profesores</span>
  </div>
  <div class="box" id="m-divUser">
    <span class="title">Modificar</span>
    <form action="#" method="POST" autocomplete="off" id="m-formU">
      <div id="selectU" class="m-div1">
        <span id="m-selectV" class="active" data-selector="V-">V-</span>
        <span id="m-selectA" data-selector="A-">A-</span>
        <span id="m-selectCR" data-selector="CR-">CR-</span>
        <input type="hidden" id="m-SeletorU" name="privilegio" value="V-" />
      </div>
      <div class="m-div2">
        <input class="inputText" type="text" name="cedula" id="m-CedulaU" placeholder="Cédula" />
        <input class="inputText" type="text" name="password" id="m-PassU" placeholder="Contraseña" />
        <input class="inputText" type="text" name="name" id="m-NombreU" placeholder="Nombre" />
      </div>
      <div class="m-div3" id="m-selectsOp">
        <span class="active" data-selector='INSERT' id="m-selectInsert">Insertar</span>
        <span id="m-optionUpdate" data-selector='UPDATE'>Actualizar</span>
        <span data-selector='DELETE'>Eliminar</span>
        <input type="hidden" id="m-selectOptionsU" name="option" value="INSERT" />
      </div>
      <div class="m-div4" id="m-selectsU">
        <select class="grado" name="grado" id="m-gradoU">
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
        <select class="seccion" name="seccion" id="m-seccionU">
          <option value="" selected="selected">Sección</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="U">U</option>
          <option value="1" hidden="">N/A</option>
        </select>
      </div>
      <div class="m-div5">
        <button id="m-okU">Realizar</button>
        <img id="m-loadingU" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
      </div>
    </form>
  </div>
  <div class="box" id="m-divProf" style="display: none;">
    <span class="title">Profesores</span>
    <form method="POST" id="m-formP" autocomplete="off">
      <div class="m-div1">
        <input class="inputText" type="text" name="name" id="m-nameP" placeholder="Nombre">
      </div>
      <div class="m-div2">
        <select class="grado" name="curso" id="m-gradoP">
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
        <select class="seccion" name="seccion" id="m-seccionP">
          <option value="" selected="selected">Sección</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="U">U</option>
        </select>
      </div>
      <div class="m-div3">
        <button id="m-okP">Realizar</button>
        <img id="m-loadingP" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
      </div>
    </form>
  </div>
</div>