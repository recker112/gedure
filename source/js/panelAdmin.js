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
Ajax borrar
*/
import './exportPanel/publicAnuncios';

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