/*
Importar archivos necesarios
*/
//Importar CSS AND IMG
import './../sass/panel/main.sass';
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

// /*
// Funciones de los botones del panel
// */
// import './exportPanel/contentButton';

/*
Ajax buscador
*/
import './exportPanel/buscadorAjax';

/*
Ajax registros
*/
import './exportPanel/registrosAjax';

// /*
// Ajax modificar
// */
// import './exportPanel/modificarAjax';

// /*
// Ajax modificar prof
// */
// import './exportPanel/modificarProfAjax';

// /*
// Ajax matricula
// */
// import './exportPanel/matriculaAjax';

// /*
// Ajax boletas
// */
// import './exportPanel/boletasAjax';

// /*
// Ajax configuración
// */
// import './exportPanel/configuracionAjax';

// /*
// Ajax borrar
// */
// import './exportPanel/borrarAjax';

// /*
// Ajax cambiar contraeña
// */
// import './exportPanel/changePasswordAjax';

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