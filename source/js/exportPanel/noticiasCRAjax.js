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
/* Funcion de publicación de noticia.
/* ************************ */
const btnNoticias = document.getElementById('cr-pnok');
const loadingNoticias = document.getElementById('cr-pnloading');
btnNoticias.addEventListener('click',async e=>{
  e.preventDefault();
  //Archivos
  const imgFiles = document.getElementById('cr-pnImg');
  //Variables
  const title = document.getElementById('cr-pnTitle').value;
  const content = document.getElementById('cr-pnTextarea').value;
  const img = document.getElementById('cr-pnImg').value;
  if (verifyVar(title,content,img)) {
    if (contar_caracteres(content) <= 1200) {
      //Animacion
      loadingAnimation($, btnNoticias, loadingNoticias);

      //Datos
      const datos = new FormData();

      //Variable de cantidad total de fotos
      const total = imgFiles.files.length;

      //Insetar img
      for (let i = 0; i < total; i++) {
        datos.append("archivo" + i, imgFiles.files[i]);
      }
      datos.append('title', title);
      datos.append('content', content.replace (/\r?\n/g,"</br>"));

      //Consulta
      let res = await consultAjax('assets/php/consults/ajax_noticias.php', datos);

      if (res !== 'no_connect_file_php') {
        //Animación
        loadingAnimation($, btnNoticias, loadingNoticias, 'Inverse');

        //Mensajes
        let message='';
        let color='';
        if (res.status === 'ok') {
          message='Noticia publicada!';
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
          }else if (res.message === 'no_load_img') {
            message = 'No se ha podido cargar una imagen!';
            color = 'danger';
          }else if (res.message === 'no_type') {
            message = 'Solo se admiten: .png, .jpg/.jpeg, .gif!';
            color = 'warning';
          }else if (res.message === 'no_upload') {
            message = 'No se ha podido cargar al servidor una imagen!';
            color = 'danger';
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
        //Animación
        loadingAnimation($, btnNoticias, loadingNoticias, 'Inverse');
        //No connect
        alerts("Error al conectar con el servidor!", "danger");
      }
    } else {
      alerts("Hay más de 1200 carácteres!", "warning");
    }
  }else {
    alerts("Debe rellenar todos los campos!", "warning");
  }
});