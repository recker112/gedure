/*
Importar archivos necesarios
*/
//Regenerator-Runtime async
import 'regenerator-runtime';
//TextAreaStuats
import {textAreaStatus} from './exports/funciones/textAreaStatus';

/*
Funciones de los botones del panel
*/
import './exportPanel/panelButton';

/* ************************ */
/* NOTICIAS
/* ************************ */

/*
Ajax Noticias
*/
import './exportPanel/noticiasCRAjax';

/*
Efecto statusArea
*/
const textarea = document.getElementById('cr-pnTextarea');
const statusArea = document.getElementById('cr-pnstatusArea');
textAreaStatus(textarea, statusArea, 1200);

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