/*
Importar archivos necesarios
*/
//SASS
import './../sass/login/main.sass';
//Importar jquery
import $ from 'jquery';
//Regenerator-Runtime async
import 'regenerator-runtime';
//Alertas
import {alerts} from './exports/alerts';
//Ajax
import {FormDataTransform} from './exportLogin/formDataTransform';

//Funciones para consultas
import {consultAjax, loadingAnimation} from './exports/ajaxPromise';


/*
Login
*/
const btnLogin = document.querySelector("#login_button");
btnLogin.addEventListener('click', async e => {
  e.preventDefault();

  //Constantes
  const user = document.getElementById('login_user').value;
  const pass = document.getElementById('login_password').value;
  const remember = document.getElementById('remember').checked;
  const token = document.getElementById('token').value;

  //Verificar variables vacias
  if (user != "" && user != " " && pass != "" && pass != " ") {
    //Realizar formato de data.
    const datos = new FormDataTransform(user, pass, remember, token).FormTransform();

    //Loading effect
    const loading = document.getElementById('login_loading');
    loadingAnimation($, btnLogin, loading);

    //Consulta
    let res = await consultAjax('assets/php/consults/ajax_check_login.php', datos);

    //Resultado
    if (res !== 'no_connect_file_php'){
      //Errores normales
      loadingAnimation($, btnLogin, loading, "invert");

      let message;
      let status;

      //Mensaje
      if  (res.status == 'fallido') {
        if  (res.message == 'token'){
          message = 'Error: Ex000001';
          status = 'danger';
        }else if  (res.message == 'consult_error1'){
          message = 'Error: Ex000002';
          status = 'danger';
        }else if  (res.message == 'consult_error2'){
          message = 'Error: Ex000002';
          status = 'danger';
        }else if  (res.message == 'consult_error3'){
          message = 'Error: Ex000002';
          status = 'danger';
        }else if  (res.message == 'no_encontrado'){
          message = 'El usuario y/o la contraseña es incorrecta.';
          status = 'warning';
        }else if  (res.message == 'banlist'){
          message = 'El usuario y/o la contraseña es incorrecta.';
          status = 'warning';
        }else if  (res.message == 'block'){
          message = '¡Tu cuenta esta bloqueada por 5 minutos!';
          status = 'danger';
        }else if  (res.message == 'block_perma'){
          message = '¡Tu cuenta fue bloqueada por seguridad!';
          status = 'danger';
        }else if  (res.message == 'unlock'){
          message = 'El usuario y/o la contraseña es incorrecta.';
          status = 'warning';
        }else if  (res.message == 'still_blocked'){
          message = 'Aún no pasan los 5 minutos, por favor espere.';
          status = 'warning';
        }else {
          message = 'Aún no pasan los 5 minutos, por favor espere.';
          status = 'danger';
        }

        alerts(message, status);
      }else if (res.status == 'exitoso') {
        $(btnLogin).prop("disabled", "disabled");
        alerts("¡Login validado correctamente!", "success");
        setTimeout("window.location.href = 'panel.php'", 2000);
      }
    }else {
      //Error al conectar con el servidor
      loadingAnimation($, btnLogin, loading, "invert");
      alerts("¡Error al conectar con el servidor!", "danger");
    }
  }else {
    alerts("¡Debe rellenar todos los campos!", "warning");
  }
});

/*
Cookies
*/
import './exports/cookies';

/*
Cerrar popad
*/
const cerrarPopad = document.getElementById('popad-cerrar');
cerrarPopad.addEventListener('click', () => {
  const popad = document.getElementById('popad');
  $(popad).fadeOut(200);
});