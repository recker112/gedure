/*
Importar archivos necesarios
*/
//Importar jquery
import $ from 'jquery';
//Regenerator-Runtime async
import 'regenerator-runtime';
//TextAreaStuats
import {textAreaStatus} from './exports/funciones/textAreaStatus';

/*
Funciones de los botones del panel
*/
import './exportPanel/panelButton';

/*
Funciones de los botones del panel
*/
import './exportPanel/contentButton';

/*
Ajax buscador
*/
import './exportPanel/buscadorAjax';

/*
Ajax registros
*/
import './exportPanel/registrosAjax';

/*
Ajax modificar
*/
import './exportPanel/modificarAjax';

/*
Ajax modificar prof
*/
import './exportPanel/modificarProfAjax';

/*
Ajax matricula
*/
import './exportPanel/matriculaAjax';

/*
Ajax boletas
*/
import './exportPanel/boletasAjax';

/*
Ajax configuración
*/
import './exportPanel/configuracionAjax';

/*
Ajax borrar
*/
import './exportPanel/borrarAjax';

/* ************************ */
/* NOTICIAS
/* ************************ */

/*
Ajax Noticias
*/
import './exportPanel/noticiasCRAjax';

/*
Efecto statusArea Noticias
*/
const textareaN = document.getElementById('cr-pnTextarea');
const statusAreaN = document.getElementById('cr-pnstatusArea');
textAreaStatus(textareaN, statusAreaN, 1200);

/*
Efecto statusArea Anuncios
*/
const textareaA = document.getElementById('an-textarea');
const statusAreaA = document.getElementById('an-statusArea');
textAreaStatus(textareaA, statusAreaA, 250);

/* ************************ */
/* OPCIONES
/* ************************ */

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