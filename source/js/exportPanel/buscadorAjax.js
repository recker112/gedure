//Importar jquery
import $ from 'jquery';
//Alertas
import {alerts} from './../exports/alerts';
//Ajax
import {consultAjax, loadingAnimation} from './../exports/ajaxPromise';
import { async } from 'regenerator-runtime';

/*
Funciones del buscador
*/
let inputSearch = document.getElementById('search_estudi');
let statusSearch = document.getElementById('search_status');

//FocusIn
inputSearch.addEventListener('focusin', () => {
  const inputVal = inputSearch.value;
  if (inputVal != "" && inputVal != " ") {
    $(statusSearch).slideToggle(400);
  }
});

//FocusOut
inputSearch.addEventListener('focusout', () => {
  $(statusSearch).slideUp(400);
});

//Busqueda
inputSearch.addEventListener('keyup', async () => {
  //Estudiante
  const inputVal = inputSearch.value;
  if (inputVal != "" && inputVal != " ") {
    //Datos transofrmados en un FormData()
    let datos = new FormData();
    datos.append("buscar", inputVal);
    
    //Consulta
    const res = await consultAjax('assets/php/consults/ajax_search_panel.php', datos);

    if (res !== 'no_connect_file_php') {
      if (res[0]) {
        const text = new prepareTextSearch(res).formatText();

        //Insertar texto
        statusSearch.innerHTML = text;

        //Mostrar search_status
        $("#search_status").slideDown(400);
        addEventToSpan();
      }else {
        //Texto a insertar
        const text = `<span class='datos'>
        <span id='user1-nombre'>No resultados</span>
        <span id='user1-cedula'></span>
        </span>`;

        //Insertar texto
        statusSearch.innerHTML = text;

        //Mostrar search_status
        $("#search_status").slideDown(400);
      }
    }else {
      //Alert
      alerts('Error al conectar con el servidor!', 'danger');
    }
  }else {
    //Ocultar search_status
		$(statusSearch).slideUp(400);
  }
});

function addEventToSpan() {
  //Obtener datos del buscador
  document.querySelectorAll('#search_status span.datos').forEach(element => {
    element.addEventListener('click', () => {
      const dataHTML = element.dataset;
      //Seleccionar variable privilegio
      if (dataHTML.cedula[2] !== "-") {
        //Variable para los NO CR-
        var privilegioS = dataHTML.cedula[0]+dataHTML.cedula[1];
      }else {
        //Variable para los CR-
        var privilegioS = dataHTML.cedula[0]+dataHTML.cedula[1]+dataHTML.cedula[2];
      }

      //Algoritmos
      if (dataHTML.user) {
        //Variables
        let text = '';

        //Título popad
        document.getElementById('popad-titulo').innerHTML = 'Buscar';

        //Estructura básica
        text += `Nombre: ${dataHTML.user}.</br>
        Cedula: ${dataHTML.cedula}.</br>`;

        //Verificar si es estudiante
        if (dataHTML.estu === 'true') {
          text += `Curso: ${dataHTML.curso}.</br>
          Sección: ${dataHTML.seccion}.</br>
          N° lista: ${dataHTML.lista}.</br>`;
        }

        /*
        Sección de opciones
        */
        text += `<div id='options'>`;

        //Boton desbloquear
        if (dataHTML.user_ban === 'true') {
          text += `<button id='pOpt-desbloquear' data-cedula='${dataHTML.cedula}'>Desbloquear</button>`;
        }

        //CedulaSin
        let cedulaSin = '';
        let open = 0;

        for (let i = 0; i < (dataHTML.cedula.length - 1); i++) {
          const element = dataHTML.cedula[i];
          if (element === '-' || open === 1){
            cedulaSin += dataHTML.cedula[i+1];
            open=1;
          }
        }

        //Boton modificar
        text += `<button id='pOpt-modificar' data-cedula='${cedulaSin}' data-privilegio='${privilegioS}' data-user='${dataHTML.user}' data-curso='${dataHTML.curso}' data-seccion='${dataHTML.seccion}' data-lista='${dataHTML.lista}'>Modificar</button>`;

        //Boton generar contraseña
        text += `<button id='pOpt-generar_contraseña' data-cedula='${dataHTML.cedula}' data-privilegio='${privilegioS}'>Generar contraseña</button>`;

        //Cerrar div
        text += `</div>`;

        //Insertar texto
        document.getElementById('popad-info').innerHTML = text;

        //Mostar popad
        $("#popad").fadeIn(200).css("display", "flex");

        addEventToButtonSearch();
      }else {
        alerts('Error al obtener los datos', 'danger');
      }
    });
  });
}

function addEventToButtonSearch() {
  //Modificar
  const btnModifySearch = document.getElementById('pOpt-modificar');
  btnModifySearch.addEventListener('click', () => {
    //Datos
    const dataHTML = btnModifySearch.dataset;

    //Cerrar ventana popad
    const cerrarPopad = document.getElementById('popad-cerrar');
    cerrarPopad.click();

    //Click en el panel (el item modificar)
    const navModify = document.getElementById('nav_modificar');
    navModify.click();

    //Rellenar datos
    const m_selector = document.getElementById('m_selector_user');
    const m_option = document.getElementById('m_option_user');
    const m_cedula = document.getElementById('m_cedula_user');
    const m_user = document.getElementById('m_name_user');
    const event = new Event('change');


    m_selector.value = dataHTML.privilegio;
    m_selector.dispatchEvent(event);//Ejecutar evento change
    m_option.value = 'UPDATE';
    m_option.dispatchEvent(event);//Ejecutar evento
    m_cedula.value = dataHTML.cedula;
    m_user.value = dataHTML.user;

    //Añadir valores extras a estudaintes
    if (dataHTML.privilegio === 'V-') {
      //Variables
      let fix_curso;
      const m_grado = document.getElementById('m_grado_user');
      const m_seccion = document.getElementById('m_seccion_user');
      const m_lista = document.getElementById('m_lista_user');

      //Arreglar texto en la variable curso
      if (dataHTML.curso[2] == "g") {
        fix_curso = dataHTML.curso[0]+"G";
      }else {
        fix_curso = dataHTML.curso[0];
      }

      //Insertar extras
      m_grado.value = fix_curso;
      m_seccion.value = dataHTML.seccion;
      m_lista.value = dataHTML.lista;
    }
  });

  //Desbloquear
  const btnDesblockSearch = document.getElementById('pOpt-desbloquear');
  const popadInfo = document.getElementById('popad-info');
  if (btnDesblockSearch) {
    btnDesblockSearch.addEventListener('click', async () => {
      //Datos
      const m_cedula = btnDesblockSearch.dataset.cedula;
  
      //Datos transformados con FormData()
      const datos = new FormData();
      datos.append("cedula", m_cedula);
      popadInfo.innerHTML = `<img id='m_loading_user' src='assets/img/loading.svg' height='32' alt='imagen de carga' /></br>
      <span>Realizando cambios, por favor espere....</span>`;
  
      const res = await consultAjax('assets/php/consults/ajax_desbloquear.php', datos);
  
      if (res !== 'no_connect_file_php') {
        if (res.message === 'ok') {
          popadInfo.innerHTML = `La cedula ${m_cedula} fue desbloqueada!`;
        }else {
          popadInfo.innerHTML = `La cedula ${m_cedula} no está bloqueada actualemte.`;
        }
      }else {
        //No connect
        alerts("Error al conectar con el servidor!", "danger");
      }
    });
  }

  //Generar contraseña
  const btnGenerarSearch = document.getElementById('pOpt-generar_contraseña');
  btnGenerarSearch.addEventListener('click', () => {
    const dataHTML = btnGenerarSearch.dataset;
    popadInfo.innerHTML = `<span>Al generar una contraseña se perderá la contraseña anterior, reemplazandola por la generada a continuación.</span>
    </br>
    <span>¿Está seguro de realizar esta acción?</span>
    </br>
    <div id='options'>
    <button id='GenNewPass_ok' data-cedula='${dataHTML.cedula}' data-privilegio='${dataHTML.privilegio}'>Si</button>
    <button id='GenNewPass_nel' data-nel='"+text_temp+"'>No</button>
    </div>`;

    addEventToButtonGenerarPass();
  });
}

function addEventToButtonGenerarPass() {
  //SI
  const popadInfo = document.getElementById('popad-info');
  const genOk = document.getElementById('GenNewPass_ok');
  genOk.addEventListener('click', async () => {
    //Datos
    const dataHTML = genOk.dataset;

    const datos = new FormData();

    datos.append("cedula", dataHTML.cedula);
    datos.append("privilegio", dataHTML.privilegio);

    popadInfo.innerHTML = `<img id='m_loading_user' src='assets/img/loading.svg' height='32' alt='imagen de carga' /></br>
    <span>Realizando cambios, por favor espere....</span>`;

    //Consulta
    const res = await consultAjax('assets/php/consults/ajax_buscador_password.php', datos);

    if (res !== 'no_connect_file_php') {
      if (res.message === 'no_found') {
        popadInfo.innerHTML = `<span>Usuario no encontrado.</span>`;
      }else if (res.message === 'update_error') {
        popadInfo.innerHTML = `<span>Error al actualizar la contraseña.</span>`;
      }else if (res.message === 'no_change_admin') {
        popadInfo.innerHTML = `<span>No se puede cambiar la contraseña a los usuarios administradores.</span>`;
      }else if (res.message === 'update_ok') {
        popadInfo.innerHTML = `<span>Contraseña generada correctamente!</span></br>
        <span>Contraseña generada: ${res.password}</span>`;
      }
    }else {
      //No connect
      alerts("Error al conectar con el servidor!", "danger");
    }
  });

  //NO
  const genNel = document.getElementById('GenNewPass_nel');
  genNel.addEventListener('click', () => {
    //Cerrar ventana popad
    const cerrarPopad = document.getElementById('popad-cerrar');
    cerrarPopad.click();
    
  });
}

class prepareTextSearch {
  constructor(res){
    this.res = res;
  }

  formatText(){
    //Texto
    let text='';

    for(let i=0; i < this.res.rows; i++) {
      //Variables
      let user = this.res[i].user;
      let cedula = this.res[i].cedula;
      let user_ban = this.res[i].user_ban;
      let estudiante = this.res[i].estu;

      //Verificar si es estudiante
      if (estudiante) {
        //Variables extras
        let curso = this.res[i].curso;
        let seccion = this.res[i].seccion;
        let lista = this.res[i].lista;

        text += `<span class='datos' data-user='${user}' data-cedula='${cedula}' data-user_ban='${user_ban}' data-estu='${estudiante}' data-curso='${curso}' data-seccion='${seccion}' data-lista='${lista}'>
        <span>${user}</span>
        <span>${cedula}</span>
        </span>`;
      }else {
        text += `<span class='datos' data-user='${user}' data-cedula='${cedula}' data-user_ban='${user_ban}' data-estu='${estudiante}'>
        <span>${user}</span>
        <span>${cedula}</span>
        </span>`;
      }
    }
    return text;
  }
}