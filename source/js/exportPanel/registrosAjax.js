/*
Funciones para consultas
*/
//Importar jquery
import $ from 'jquery';
//Ajax
import {consultAjax} from './../exports/ajaxPromise';

//Boton de registros en el panel
const btnRegistros = document.getElementById('registrosShow');
btnRegistros.addEventListener('click', async () => {
  //Animación de carga
  const divShow = document.querySelectorAll('#console tbody tr');
  divShow.forEach(element => {
    element.innerHTML = '<td>Cargando...</td><td>Cargando...</td>';
  });

  //Consulta
  let res = await consultAjax('assets/php/consults/ajax_registros.php');

  //Verificar consulta
  if (res !== 'no_connect_file_php') {
    if (res.status !== 'error') {
      const table = document.querySelector('#console tbody');
    
      //Preparar texto
      const text = prepareTextRegistros(res);

      //Insertar texto
      table.innerHTML = text;
      
      //Popad table
      const tableEvent = document.querySelectorAll('#console tbody tr .cedula');
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
    <td>${userData.log_accion}</td>
    </tr>`;
  }

  //Regresar texto
  return text;
}

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