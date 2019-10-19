//Importar jquery
import $ from 'jquery';
//Alertas
import {alerts} from './../exports/alerts';
//Ajax
import {consultAjax, loadingAnimation} from './../exports/ajaxPromise';
//VerifyVar
import {verifyVar} from './../exports/funciones/verifyVar';

/*
Funciones de cambiar contraseña
*/
const btnChangePass = document.getElementById('pc-ok');
const loadingChangePass = document.getElementById('pc-loading');
btnChangePass.addEventListener('click', async e => {
  e.preventDefault();

  //Form
  const form = document.getElementById('pc-form');

  //Variables
  const passAct = document.getElementById('pc-actual').value;
  const passNew = document.getElementById('pc-new').value;
  const passRep = document.getElementById('pc-newRepit').value;

  if (verifyVar(passAct, passNew, passRep)) {
    if (passAct !== passNew && passAct !== passRep) {
      if (passNew === passRep) {
        //Animación
        loadingAnimation($, btnChangePass, loadingChangePass);

        //Datos
        const datos = new FormData(form);

        //Consulta
        const res = await consultAjax('assets/php/consults/ajax_password.php', datos);

        if (res !== 'no_connect_file_php') {
          //Animación invertida
          loadingAnimation($, btnChangePass, loadingChangePass, 'inverse');

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
          }else if (res.message === 'time') {
            message = 'Acabas de cambiar tu contraseña, por favor espere un rato.';
            color = 'warning';
          }else if (res.message === 'old_pass') {
            message = 'La contraseña actual es incorrecta!';
            color = 'danger';
          }else if (res.message === 'ok') {
            message = 'La contraseña fue cambiada!';
            color = 'success';
          }else {
            message = '<strong>Error:</strong> Ex000003';
            color = 'danger';
          }

          //Mostrar alert
          alerts(message, color);
        }else {
          //Animación invertida
          loadingAnimation($, btnChangePass, loadingChangePass, 'inverse');
          //Alert
          alerts('Error al conectar con el servidor!', 'danger');
        }
      }else {
        alerts('Los campos de la nueva contraseña no coinciden!', 'warning');
      }
    }else {
      alerts('La contraseña actual es la misma que la nueva!', 'warning');
    }
  }else {
    alerts('Debe rellenar todos los campos!', 'warning');
  }
});