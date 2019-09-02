//Importar jquery
import $ from 'jquery';
//Alertas
import {alerts} from './../exports/alerts';
//Ajax
import {consultAjax, loadingAnimation} from './../exports/ajaxPromise';
//VerifyVar
import {verifyVar} from './../exports/funciones/verifyVar';
/*
Funciones de configuración
*/
const btnNotas = document.getElementById('n_boton');
const loadingNotas = document.getElementById('n_loading');
btnNotas.addEventListener('click', async e => {
  e.preventDefault();

  //Form
  const form = document.getElementById('form_configuracion');

  //Variables
  const user = document.getElementById('n_user').value;
  const curso = document.getElementById('n_grado').value;
  const seccion = document.getElementById('n_seccion').value;

  if (verifyVar(user, curso, seccion)) {
    //Animación
    loadingAnimation($, btnNotas, loadingNotas);

    //Datos
    const datos = new FormData(form);

    const res = await consultAjax('assets/php/consults/ajax_notas.php', datos);

    if (res !== 'no_connect_file_php') {
      //Animación
      loadingAnimation($, btnNotas, loadingNotas, 'inverse');

      //Variables
      let message;
      let color;

      //Mensajes
      if (res.message === 'token') {
        message = '<strong>Error:</strong> Ex000001';
        color = 'danger';
      }else if (res.message === 'consult_error') {
        message = '<strong>Error:</strong> Ex000002';
        color = 'danger';
      }else if (res.message === 'empty') {
        message = 'Debe rellenar todos los campos!';
        color = 'warning';
      }else if (res.message === 'no_found_sec') {
        message = 'La sección seleccionada no existe!';
        color = 'danger';
      }else if (res.message === 'no_found_user') {
        message = 'Usuario no registrado!';
        color = 'danger';
      }else if (res.message === 'no_changes') {
        message = 'No se han realizado cambios!';
        color = 'warning';
      }else if (res.message === 'ok') {
        message = 'Se han actualizado los cambios!';
        color = 'success';
      }else {
        message = '<strong>Error:</strong> Ex000003';
        color = 'danger';
      }

      alerts(message, color);
    }else {
      //Animación
      loadingAnimation($, btnNotas, loadingNotas, 'inverse');
      //Alert
      alerts('Error al conectar con el servidor!', 'danger');
    }
  }else {
    alerts('Debe rellenar todos los campos!', 'warning');
  }
});