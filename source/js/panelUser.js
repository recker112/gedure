/*
Importar archivos necesarios
*/
//Importar jquery
import $ from 'jquery';
//Regenerator-Runtime async
import 'regenerator-runtime';

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