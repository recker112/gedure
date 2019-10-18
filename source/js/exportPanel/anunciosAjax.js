//Importar jquery
import $ from 'jquery';
//Alertas
import {alerts} from './../exports/alerts';
//Ajax
import {consultAjax, loadingAnimation} from './../exports/ajaxPromise';
//VerifyVar
import {verifyVar} from './../exports/funciones/verifyVar';
//StatusArea
import {contar_caracteres} from './../exports/funciones/textAreaStatus';

/* ************************ */
/* Funcion de publicar anuncio
/* ************************ */
const btnAnuncios = document.getElementById('an-ok');
const loadingAnuncios = document.getElementById('an-loading');
btnAnuncios.addEventListener('click',async e => {
  e.preventDefault();

  //Variables
  const title = document.getElementById('an-title').value;
  const content = document.getElementById('an-textarea').value;

  if (verifyVar(title,content)) {
    if (contar_caracteres(content) <= 250) {
      //Animación
      loadingAnimation($, btnAnuncios, loadingAnuncios);

      //Datos
      const datos = new FormData();

      datos.append('title', title);
      datos.append('content', content.replace (/\r?\n/g,"</br>"));
      
      //Consulta
      let res = await consultAjax('assets/php/consults/ajax_anuncios.php', datos);

      if (res !== 'no_connect_file_php') {
        //Animación
        loadingAnimation($, btnAnuncios, loadingAnuncios, 'Inverse');

        //Mensajes
        let message='';
        let color='';

        if (res.status === 'ok') {
          message='Anuncio publicado!';
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
      } else {
        //Animación
        loadingAnimation($, btnAnuncios, loadingAnuncios, 'Inverse');
        //No connect
        alerts("Error al conectar con el servidor!", "danger");
      }
    } else {
      alerts("Hay más de 250 carácteres!", "warning");
    }
  } else {
    alerts("Debe rellenar todos los campos!", "warning");
  }
});