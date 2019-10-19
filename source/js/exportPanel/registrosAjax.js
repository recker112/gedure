/*
Funciones para consultas
*/
//Importar jquery
import $ from 'jquery';
//Ajax
import {consultAjax} from './../exports/ajaxPromise';

/* ************************ */
/* Scripts
/* ************************ */

const btnRegistros = document.getElementById('registrosShow');
btnRegistros.addEventListener('click', async () => {
  //Animación de carga
  const divShow = document.querySelector('#tregistros tbody');
  divShow.innerHTML = `</tr>
  <td>Cargando...</td>
  <td class="mobile-fixTable">Cargando...</td>
  <td>Cargando...</td>
  </tr>`;

  //Consulta
  let res = await consultAjax('assets/php/consults/ajax_registros.php');

  //Verificar consulta
  if (res !== 'no_connect_file_php') {
    if (res.status !== 'error') {
      const table = document.querySelector('#tregistros tbody');
    
      //Preparar texto
      const text = prepareTextRegistros(res);

      //Insertar texto
      table.innerHTML = text;

      /* ************************ */
      /* Button table
      /* ************************ */
      const tableButton = document.querySelectorAll("#tregistros tbody button");
      tableButton.forEach(element => {
        element.addEventListener('click',() => {
          const inputSearch =  document.getElementById('search_estudi');
          inputSearch.value = element.dataset.cedula;
          
          //Disparar evento change
          const event = new Event('keyup');
          inputSearch.dispatchEvent(event);
        });
      });
      
      /* ************************ */
      /* Popad table
      /* ************************ */
      const tableEvent = document.querySelectorAll('#tregistros tbody tr .cedula');
      tableEvent.forEach(element => {
        element.addEventListener('click', () => {
          //Data
          const userData = element.dataset;
          
          //Popad titulo
          document.getElementById('popad-titulo').innerHTML = 'Registros';

          //Preparar texto
          let text = prepareTextRegistrosPopad(userData);
          
          //Insertar texto
          document.getElementById('popad-info').innerHTML = text;

          //Mostrar popad
          $("#popad").fadeIn(200).css("display", "flex");
        });
      });
    }else {
      //Errores normales
      if (res.message === 'token') {
        alerts("<strong>Error:</strong> Ex000001", "danger");
      }else if(res.message === 'internal_error') {
        alerts("<strong>Error:</strong> Ex000003", "danger");
      }
    }
  }else {
    //No connect
    alerts("Error al conectar con el servidor", "danger");
  }
});

/* ************************ */
/* Funcion para preparar el texto de la tabla
/* ************************ */
function prepareTextRegistros(res) {
  let text = '';
  for (let i = 0; i < res.length; i++) {
    //User
    const userData = res[i];
    //Data
    let data = `data-cedula='${userData.log_cedula}'
    data-user='${userData.log_user}'
    data-fecha='${userData.log_fecha}'
    data-accion='${userData.log_accion}'`;

    //Datos estudiante
    if (userData.log_usuario) {
      data += `data-curso='${userData.log_curso}'
      data-seccion='${userData.log_seccion}'
      data-pg='${userData.log_pg}'
      data-lista='${userData.log_lista}'`
    }

    //Datos baneo
    if (userData.log_bans) {
      data += `data-attemps='${userData.log_attemps}'
      data-locks='${userData.log_locks}'`
    }

    //Texto a insertar
    text += `<tr>
    <td class="cedula" ${data}>${userData.log_cedula}</td>
    <td class="mobile-fixTable">${userData.log_accion}</td>`;

    //Botones
    text += `<td>
    <button data-button="search" data-cedula='${userData.log_cedula}'>Buscar</button>`
    
    //Verificar boton desbloquear
    if (userData.log_bans) {
      text += `<button data-button="desblock" data-cedula='${userData.log_cedula}'>Desbloquear</button>`;
    }
    text += `</td>
    </tr>`;
  }

  //Regresar texto
  return text;
}

/* ************************ */
/* Funcion para preparar el texto del popad
/* ************************ */
function prepareTextRegistrosPopad(dataHTML) {
  let text = `Cedula: ${dataHTML.cedula}.</br>
  Usuario: ${dataHTML.user}.</br>
  Fecha: ${dataHTML.fecha}.</br>
  Acción: ${dataHTML.accion}`;

  if (dataHTML.curso) {
    text += `</br>Curso: ${dataHTML.curso}.</br>
    Sección: ${dataHTML.seccion}.</br>
    N° lista: ${dataHTML.lista}.</br>
    Profesor Guia: ${dataHTML.pg}.`
  }

  if (dataHTML.attemps > 0) {
    text += `</br>Errores Actuales: ${dataHTML.attemps}.</br>
    Bloqueos: ${dataHTML.locks}.`
  }
  return text;
}