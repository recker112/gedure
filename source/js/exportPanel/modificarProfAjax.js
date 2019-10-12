/*
Funciones de modificar profesor
*/
//Importar jquery
import $ from 'jquery';
//Alertas
import {alerts} from './../exports/alerts';
//Ajax
import {consultAjax, loadingAnimation} from './../exports/ajaxPromise';

const btnProfM = document.getElementById('m-okP');
const loadingProfM = document.getElementById('m-loadingP');
btnProfM.addEventListener('click', async e => {
  e.preventDefault();

  //Form
  const form = document.getElementById('m-formP');

  //Variables
  const nombre = document.getElementById('m-nameP').value;
  const curso = document.getElementById('m-gradoP').value;
  const seccion = document.getElementById('m-seccionP').value;

  //Verificar variables vacias
  if (nombre != "" && curso != "" && seccion != "") {
    //Animación
    loadingAnimation($, btnProfM, loadingProfM);
    //Data
    const datos = new FormData(form);
    //Consulta
    let res = await consultAjax('assets/php/consults/ajax_profesores.php', datos);

    if (res !== 'no_connect_file_php') {
      let message;
      let color;
      if (res.message === 'token') {
        message = '<strong>Error:</strong> Ex000001';
        color = 'danger';
      }else if (res.message === 'consult_error') {
        message = '<strong>Error:</strong> Ex000002';
        color = 'danger';
      }else if (res.message === 'no_found_seccion') {
        message = '<strong>Error:</strong> La sección no existe!';
        color = 'danger';
      }else if (res.message === 'no_change') {
        message = 'No se han realizado cambios!';
        color = 'warning';
      }else if (res.message === 'ok') {
        message = 'Se actualizaron los datos!';
        color = 'success';
      }

      //Animación
      loadingAnimation($, btnProfM, loadingProfM, 'Inverse');
      //Alert
      alerts(message, color);
    }else {
      //Animación
      loadingAnimation($, btnProfM, loadingProfM, 'Inverse');
      //Mo connect
      alerts("Error al conectar con el servidor!", "danger");
    }
  }else {
    alerts("Debe rellenar todos los campos!", "warning");
  }
});