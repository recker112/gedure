/*
Importar archivos necesarios
*/
//Importar CSS AND IMG
import './../img/farvicon.png';
import './../img/logo.png';
import './../img/loading.svg';
//Importar jquery
import $ from 'jquery';
//Regenerator-Runtime async
import 'regenerator-runtime';
//Alertas
import {alerts} from './exports/alerts';
//Ajax
import {consultAjax, loadingAnimation} from './exports/ajaxPromise';

/*
Funciones de los botones del panel
*/
import './exportPanel/panelButton';

/*
Ajax cambiar contraeña
*/
import './exportPanel/changePasswordAjax';

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