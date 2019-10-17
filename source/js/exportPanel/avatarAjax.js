//Importar jquery
import $ from 'jquery';
//Alertas
import {alerts} from './../exports/alerts';
//Ajax
import {consultAjax, loadingAnimation} from './../exports/ajaxPromise';
//VerifyVar
import {verifyVar} from './../exports/funciones/verifyVar';

const btnAvatar = document.getElementById('ava-ok');
const loadingAvatar = document.getElementById('ava-loading');
btnAvatar.addEventListener('click',async e => {
  e.preventDefault();

  const img = document.getElementById('ava-img');

  if (verifyVar(img.value)) {
    //Animación
    loadingAnimation($, btnAvatar, loadingAvatar);

    //Datos
    const datos = new FormData();

    datos.append("foto", img.files[0]);

    let res = await consultAjax('assets/php/consults/ajax_avatar.php', datos);

    if (res !== 'no_connect_file_php') {
      //Animación
      loadingAnimation($, btnAvatar, loadingAvatar, 'Inverse');

      //Mensajes
      let message;
      let color;

      if (res.status === 'ok') {
        message = 'Avatar actualizado!!';
        color = 'success';
        document.getElementById('WEB-avatar').src = res.avatar;
      }else {
        if (res.message === 'token') {
          message = '<strong>Error:</strong> Ex000001';
          color = 'danger';
        }else if (res.message === 'consult_error') {
          message = '<strong>Error:</strong> Ex000002';
          color = 'danger';
        }else if (res.message === 'empty') {
          message = 'Debe rellenar todos los campos!';
          color = 'warning';
        }else if (res.message === 'no_upload') {
          message = 'No se pudo cargar la imagen al servidor!';
          color = 'danger';
        }else if (res.message === 'no_size') {
          message = 'La imagen supera el máximo admitido!';
          color = 'warning';
        }else if (res.message === 'no_type') {
          message = 'Solo se admiten: .png, .jpg/.jpeg, .gif!';
          color = 'warning';
        }else if (res.message === 'no_move') {
          message = 'No se pudo mover la imagen al servidor!';
          color = 'danger';
        }
      }
      alerts(message, color);
    }else {
      //Animación
      loadingAnimation($, btnAvatar, loadingAvatar, 'Inverse');
      //No connect
      alerts("Error al conectar con el servidor!", "danger");
    }
  }else {
    alerts("Debe rellenar todos los campos!", "warning");
  }
});