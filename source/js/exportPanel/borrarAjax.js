//Importar jquery
import $ from 'jquery';
//Alertas
import {alerts} from './../exports/alerts';
//Ajax
import {consultAjax, loadingAnimation} from './../exports/ajaxPromise';
//VerifyVar
import {verifyVar} from './../exports/funciones/verifyVar';

/*
Funciones de borrar
*/
const btnBorrar = document.getElementById('bo-ok');
const loadingBorrar = document.getElementById('bo-loading');
btnBorrar.addEventListener('click', async e => {
  e.preventDefault();

  //Form
  const form = document.getElementById('bo-form');

  //Variables
  const select = document.getElementById('bo-inputUser').value;
  const curso = document.getElementById('bo-curso').value;
  const seccion = document.getElementById('bo-seccion').value;

  if (verifyVar(select, curso, seccion)) {
    //Animación
    loadingAnimation($, btnBorrar, loadingBorrar);

    //Datos
    const datos = new FormData(form);

    //Consulta
    const res = await consultAjax('assets/php/consults/ajax_borrar.php', datos);

    if (res !== 'no_connect_file_php') {
      //Animación invertida
      loadingAnimation($, btnBorrar, loadingBorrar, 'inverse');

      //Variables
      let message = '';
      let color;
      let popad = false;

      //Mensajes
      if (res.message === 'token') {
        message = '<strong>Error:</strong> Ex000001';
        color = 'danger';
      }else if (res.message === 'no_delete_sec') {
        message = 'No hay estudiantes que borrar!';
        color = 'warning';
      }else if (res.message === 'ok_sec') {
        message = `Se han borrado ${res.borrados} estudiantes!`;
        color = 'success';
      }else if (res.message === 'ok_bol') {
        for (var i = 0; i < res.boletasDelete; i++) {
          const bol = res[i];
          message += `<strong>Archivo:</strong> ${bol.name}</br><strong>Estado:</strong> ${bol.message}</br></br>`;
        }
        message += `Número total de boletas borradas: ${res.boletasDelete}.`;
        popad = true;
      }else if (res.message === 'no_bol_delete') {
        message = 'No hay boletas que borrar!';
        color = 'warning';
      }else {
        message = '<strong>Error:</strong> Ex000003';
        color = 'danger';
      }

      if (!popad) {
        alerts(message, color);
      } else {
        //Mostrar popad
        document.getElementById('popad-titulo').innerHTML = 'Borrar';
        document.getElementById('popad-info').innerHTML = message;
        $("#popad").fadeIn(200).css("display", "flex");
      }
    }else {
      //Animación invertida
      loadingAnimation($, btnNotas, loadingNotas, 'inverse');
      //Alert
      alerts('Error al conectar con el servidor!', 'danger');
    }
  }else {
    alerts('Debe rellenar todos los campos!', 'warning');
  }
});