/*
Funciones de modificar
*/
//Importar jquery
import $ from 'jquery';
//Ajax
import {consultAjax, loadingAnimation} from './../exports/ajaxPromise';
//Alertas
import {alerts} from './../exports/alerts';
//VerifyVar
import {verifyVar} from './../exports/funciones/verifyVar';

//Button del form
const btnModify = document.getElementById('m_button_user');
const loadingModify = document.getElementById('m_loading_user');
btnModify.addEventListener('click', async e => {
  e.preventDefault();
  //Form
  const form = document.getElementById('form_modificar_user');

  //Variables
  const cedula = document.getElementById('m_cedula_user').value;
  const pass = document.getElementById('m_pass_user').value;
  const name = document.getElementById('m_name_user').value;
  //Verificar variables vacias
  if (verifyVar(cedula, pass, name)) {
    //Animación
    loadingAnimation($, btnModify, loadingModify);
    //Data
    const datos = new FormData(form);
    let res = await consultAjax('assets/php/consults/ajax_modificar.php', datos);

    if (res !== 'no_connect_file_php') {
      let message;
      let color;
      if (res.status !== 'error') {
        //Mensajes OK
        if (res.message === 'insert_ok') {
          message = "Usuario insertado!";
          color = 'success';
        }else if (res.message === 'update_ok') {
          message = "Usuario actualizado!";
          color = 'success';
        }else if (res.message === 'delete_ok') {
          message = "Usuario eliminado!";
          color = 'success';
        }
      }else {
        //Mensajes error
        if (res.message === 'token') {
          message = '<strong>Error:</strong> Ex000001';
          color = 'danger';
        }else if (res.message === 'internal_error') {
          message = '<strong>Error:</strong> Ex000002';
          color = 'danger';
        }else if (res.message === 'empty') {
          message = 'Debe rellenar todos los campos!';
          color = 'warning';
        }else if (res.message === 'no_found') {
          message = 'Usuario no existente!';
          color = 'danger';
        }else if (res.message === 'user_found') {
          message = 'Usuario existente!';
          color = 'danger';
        }else if (res.message === 'insert_error') {
          message = 'Error al insertar usuario!';
          color = 'danger';
        }else if (res.message === 'update_error') {
          message = 'No se han realizado cambios!';
          color = 'warning';
        }else if (res.message === 'delete_error') {
          message = 'Error al insertar usuario!';
          color = 'danger';
        }
      }
      
      //Mostrar alert
      alerts(message, color);
      //Animación invertida
      loadingAnimation($, btnModify, loadingModify, 'inverse');
    }else {
      //Animación
      loadingAnimation($, btnProfM, loadingProfM, 'Inverse');
      //No connect
      alerts("Error al conectar con el servidor!", "danger");
    }
  }else {
    alerts('Debe rellenar todos los campos!', "warning");
  }
});