<!-- Modificar -->
<div class="c-caja" id="c-contenido-modificar" style="display: none">
  <div class="window">
    <span class="active" data-selectM="user">Modificar</span>
    <span data-selectM="prof">Profesores</span>
  </div>
  <div class="box">
    <span class="title">Modificar</span>
    <form action="#" method="POST" autocomplete="off" id="form_modificar_user">
      <div class="m-div1">
        <span class="active" id="m-selectV">V-</span>
        <span id="m-selectA">A-</span>
        <span id="m-selectCR">CR-</span>
        <input type="hidden" id="m-SeletorU" name="privilegio" value="V-" />
      </div>
      <div class="m-div2">
        <input class="inputText" type="text" name="cedula" id="m-CedulaU" placeholder="Cédula" />
        <input class="inputText" type="text" name="password" id="m-PassU" placeholder="Contraseña" />
        <input class="inputText" type="text" name="name" id="m-NombreU" placeholder="Nombre" />
      </div>
      <div class="m-div3">
        <span class="active" id="m-selectIn">Insertar</span>
        <span id="m-selectAc">Actualizar</span>
        <span id="m-selectEl">Eliminar</span>
        <input type="hidden" id="MSeletorOption" name="option" value="INSERT" />
      </div>
      <div class="m-div4">
        <select class="grado" name="grado" id="m_grado_user">
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
        <select class="seccion" name="seccion" id="m_seccion_user">
          <option value="" selected="selected">Sección</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="U">U</option>
          <option value="1" hidden="">N/A</option>
        </select>
      </div>
      <div class="m-div5">
        <button id="m_button_user" data-modificar="user">Realizar</button>
        <img id="m_loading_user" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
      </div>
    </form>
  </div>
  <div id="m-selector">
    <select id="m_selector_id">
      <option value="user" selected="">Usuario</option>
      <option value="prof">Profesores</option>
    </select>
  </div>
  <form method="POST" id="form_modificar_prof" autocomplete="off">
    <div class="m-div1">
      <input type="text" name="name" id="m_name_prof" placeholder="Nombre">
    </div>
    <div class="m-options">
      <select class="grado" name="curso" id="m_curso_prof">
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
      <select class="seccion" name="seccion" id="m_seccion_prof">
        <option value="" selected="selected">Sección</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="U">U</option>
      </select>
    </div>
    <div class="m-submit">
      <button id="m_button_prof" data-modificar="prof">Realizar</button>
      <img id="m_loading_prof" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
    </div>
  </form>
</div>