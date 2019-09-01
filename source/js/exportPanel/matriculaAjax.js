/*
Funciones de matricula
*/
//Importar jquery
import $ from 'jquery';
//Ajax
import {consultAjax, loadingAnimation} from './../exports/ajaxPromise';
//Alertas
import {alerts} from './../exports/alerts';
//VerifyVar
import {verifyVar} from './../exports/funciones/verifyVar';

const btnMatricula = document.getElementById('matri_boton');
const loadingMatricula = document.getElementById('matri_loading');
btnMatricula.addEventListener('click', async e => {
  e.preventDefault();
  //Form
  const form = document.getElementById('form_matricula');
  //Variables
  let file = document.getElementById('matri_archivo').value;
  let curso = document.getElementById('matri_curso').value;
  let seccion = document.getElementById('matri_seccion').value;

  if (verifyVar(file, curso, seccion)) {
    //Animación
    loadingAnimation($, btnMatricula, loadingMatricula);

    //Data
    const datos = new FormData(form);

    let res = await consultAjax('assets/php/consults/ajax_matricula.php', datos);

    if (res !== 'no_connect_file_php') {
      let message;
      let color;
      if (res.status === 'ok') {
        if (res.message === 'update_ok') {
          message = `Estado del servidor: I${res.insert}/A${res.update}/E${res.error}!`;
          color = 'success';
        }
      }else {
        if (res.message === 'token') {
          message = '<strong>Error:</strong> Ex000001';
          color = 'danger';
        }else if (res.message === 'no_found_file') {
          message = '<strong>Error:</strong> No se encuentra el archivo!';
          color = 'danger';
        }else if (res.message === 'no_format_file') {
          message = '<strong>Error:</strong> Solo archivos .csv!';
          color = 'warning';
        }else if (res.message === 'no_size') {
          message = '<strong>Error:</strong> Tamaño máximo excedido!';
          color = 'warning';
        }else if (res.message === 'no_upload') {
          message = '<strong>Error:</strong> Fallo al cargar el archivo!';
          color = 'danger';
        }else {
          message = '<strong>Error:</strong> Ex000003';
          color = 'danger';
        }
      }
      
      //Animación
      loadingAnimation($, btnMatricula, loadingMatricula, 'inverse');
      //Alert
      alerts(message, color)
    }else {
      //Animación
      loadingAnimation($, btnMatricula, loadingMatricula, 'inverse');
      //Alert
      alerts('Error al conectar con el servidor!', 'danger');
    }
  }else {
    //Campos vacios
    alerts('Debe rellenar todos los campos!', 'warning');
  }
});