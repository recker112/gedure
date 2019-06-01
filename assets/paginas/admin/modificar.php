<span id="admin-titulo3" style="display: none;"><span class="icon-user-circle"></span><b>Modificar y Desbloquear</b></span>
<div class="admin-modify" style="display: none;">
  <div class="menu-modify">
    <select id="menu-modify-select">
     <option value="user" selected="selected">Usuarios</option>
     <option value="prof">Profesores</option>
      <option value="block">Bloqueos</option>
    </select>
  </div>
  <form action="#" method="post" autocomplete="off" id="modify_user">
    <div class="seleccion">
      <select class="privilegio" name="privilegio" id="privilegio_add">
        <option value="V-" selected="selected">V-</option>
        <option value="A-">A-</option>
        <option value="P-">P-</option>
      </select>
      <input type="text" name="cedula" placeholder="cedula" id="modify_cedula" />
      <input type="password" name="password" placeholder="contraseña" maxlength="15" id="modify_password" />
      <br/>
      <input type="text" name="nombre" placeholder="nombre" id="modify_name" />
    </div>
    <div class="datos fix_loading2" id="datos_add">
      <select id="option" name="option" id="option">
        <option value="" selected="selected">Opción</option>
        <option value="INSERT">Insertar</option>
        <option value="UPDATE">Actualizar</option>
        <option value="DELETE">Eliminar</option>
      </select>
      <select class="grado" name="grado" id="grado">
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
      <select class="seccion" name="seccion" id="seccion">
        <option value="" selected="selected">Sección</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="U">U</option>
      </select>
      <select class="lista" name="lista" id="lista">
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
    <img id="loading_modify" style="display: none;" src='assets/img/loading.gif' width='56' height='56' alt='loading' />
    <input type="submit" value="Realizar" id="modify_users" />
  </form>
  <form method="POST" id="modify_prof" autocomplete="off" style="display: none">
    <input type="text" name="nombre" placeholder="Nombre" id="prof_nombre">
    <div class="datos fix_loading2">
      <select class="grado" name="curso" id="prof_curso">
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
      <select class="seccion" name="seccion" id="prof_seccion">
        <option value="" selected="selected">Sección</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="U">U</option>
      </select>
    </div>
    <img id="loading_modify_prof" style="display: none;" src='assets/img/loading.gif' width='56' height='56' alt='loading' />
    <input type="submit" value="Realizar" id="modify_prof_ok">
  </form>
  <form method="POST" id="modify_block" autocomplete="off" style="display: none;">
    <div class="seleccion fix_loading_block">
      <select class="privilegio" name="privilegio">
          <option value="V-" selected="selected">V-</option>
          <option value="A-">A-</option>
          <option value="P-">P-</option>
      </select>
      <input type="text" name="cedula" placeholder="cedula" id="modify-unlock-cedula">
  </div>
    <input type="submit" value="Desbloquear" id="modify_unlock">
    <img id="loading_modify_block" style="display: none;" src='assets/img/loading.gif' width='56' height='56' alt='loading' />
  </form>
</div>