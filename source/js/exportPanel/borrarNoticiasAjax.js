//Importar jquery
import $ from 'jquery';
//Alertas
import {alerts} from './../exports/alerts';
//Ajax
import {consultAjax, loadingAnimation} from './../exports/ajaxPromise';
//VerifyVar
import {verifyVar} from './../exports/funciones/verifyVar';

/* ************************ */
/* Borrar Noticias
/* ************************ */
const btnBorrarNoticias = document.getElementById('boNot-ok');
const loadingBorrarNoticias = document.getElementById('boNot-loading');
btnBorrarNoticias.addEventListener('click',async e => {
  e.preventDefault();

  //form
  const form = document.getElementById('boNot-form');

  //Variables
  const ID = document.getElementById('boNot-id').value;

  if (verifyVar(ID)) {
    //Animación
    loadingAnimation($, btnBorrarNoticias, loadingBorrarNoticias);

    //Datos
    const datos = new FormData(form);

    //Consulta
    const res = await consultAjax('assets/php/consults/ajax_borrarNoticias.php', datos);

    if (res !== 'no_connect_file_php') {
      //Animación
      loadingAnimation($, btnBorrarNoticias, loadingBorrarNoticias, 'reversa');
      
      //Mensajes
      let message='';
      let color='';
      if (res.status === 'ok') {
        message='Noticias borradas';
        color='success';
      }else {
        if (res.message === 'token') {
          message='<strong>Error:</strong> Ex000001';
          color='danger';
        }else if (res.message === 'internal_error') {
          message = '<strong>Error:</strong> Ex000002';
          color = 'danger';
        }else if (res.message === 'empty') {
          message = 'Debe rellenar todos los campos!';
          color = 'warning';
        }else if (res.message === 'no_exist') {
          message = 'La noticia no existe.';
          color = 'warning';
        }else if (res.message === 'no_delete') {
          message = 'No se pudo borrar la noticias';
          color = 'danger';
        }else if (res.message === 'no_10') {
          message = 'No hay más de 10 noticias publicadas.';
          color = 'warning';
        }else if (res.message === 'consultError') {
          message = '<strong>Error:</strong> Ex000002';
          color = 'danger';
        }else if (res.message === 'errorInsert') {
          message = 'No se ha podido publicar la noticia!';
          color = 'danger';
        }else {
          message = '<strong>Error:</strong> Ex000003';
          color = 'danger';
        }
      }
      alerts(message, color);
    }else {
      //Animación invertida
      loadingAnimation($, btnBorrarNoticias, loadingBorrarNoticias, 'inverse');
      //Alert
      alerts('Error al conectar con el servidor!', 'danger'); 
    }
  }else {
    alerts('Debe rellenar todos los campos!', 'warning');
  }
})