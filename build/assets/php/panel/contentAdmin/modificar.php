<!-- Modificar -->
<span class="c-caja" id="c-titulo-modificar"><span class="icon-user-circle"></span>Modificar</span>
<div class="c-caja" id="c-contenido-modificar">
  <div id="m-selector">
    <select id="m_selector_id">
      <option value="user" selected="">Usuario</option>
      <option value="prof">Profesores</option>
    </select>
  </div>
  <form method="POST" autocomplete="off" id="form_modificar_user">
    <div class="m-div1">
      <select id="m_selector_user" name="privilegio">
        <option value="V-" selected="selected">V-</option>
        <option value="A-">A-</option>
        <option value="CR-">CR-</option>
      </select>
      <input type="text" id="m_cedula_user" name="cedula" placeholder="Cédula" />
      <input type="password" id="m_pass_user" name="password" placeholder="Contraseña" />
    </div>
    <div class="m-div2">
      <input type="text" id="m_name_user" name="name" placeholder="Nombre" />
    </div>
    <div class="m-options">
      <select id="m_option_user" name="option">
        <option value="INSERT" selected="selected">Insertar</option>
        <option value="UPDATE">Actualizar</option>
        <option value="DELETE">Eliminar</option>
      </select>
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
      <select class="lista" name="lista" id="m_lista_user">
        <option value="" selected="selected">Lista</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
        <option value="32">32</option>
        <option value="33">33</option>
        <option value="34">34</option>
        <option value="35">35</option>
        <option value="36">36</option>
        <option value="37">37</option>
        <option value="38">38</option>
      </select>
    </div>
    <div class="m-submit">
      <button id="m_button_user" data-modificar="user">Realizar</button>
      <img id="m_loading_user" style="display: none;" src='assets/img/loading.svg' height='28' alt='imagen de carga' />
    </div>
  </form>
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