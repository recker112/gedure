//Importar Jquery
import $ from 'jquery';
/*
Botones del panel
*/
const btnTitlePanel = document.querySelectorAll(".titulo-panel");
btnTitlePanel.forEach((element) => {
  element.addEventListener('click', () => {
    const selector = element.dataset.selector;
    let open = element.dataset.open;
    $(`#panel-content${selector}`).toggle(400);
    if (open == '>') {
      $(element).animate({
				opacity: 1
      }, 200);
      element.querySelector('span').classList.add('icon-chevron-left');
      element.querySelector('span').classList.remove('icon-chevron-right');
      element.dataset.open = '<';
    }else {
      $(element).animate({
				opacity: 0.7
      }, 200);
      element.querySelector('span').classList.remove('icon-chevron-left');
      element.querySelector('span').classList.add('icon-chevron-right');
      element.dataset.open = '>';
    }
  });
});

/*
Ocultar panel
*/
let contadorP = 0;
const panelButton = document.getElementById('button_panel');
panelButton.addEventListener('click', () => {
  if (contadorP == 0) {
    $("#panel").animate({
      left: "-252px"
    }, 400, () => contadorP=1);
    $("#contenido").animate({
      marginLeft: "18px"
    }, 400);
  }else {
    $("#panel").animate({
      left: "0px"
    }, 400, () => contadorP=0);
    if ($(window).width() > 720) {
      $("#contenido").animate({
        marginLeft: "272px"
      }, 400);
    }
  }
});

//Fix en mobiles
if ($(window).width() <= 720) {
  contadorP=1;
}

/*
Mostrar contenido
*/
const itemPanel = document.querySelectorAll('.item-panel');
itemPanel.forEach(element => {
  //Caja a mostrar
  const archivo = element.dataset.content;
  //Añadir eventos a todos los botones
  element.addEventListener('click', () => {
    //Ocultar cajas
    const caja = document.querySelectorAll('#contenido .c-caja');
    caja.forEach(element => {
      $(element).hide();
    });
    //Mostrar caja actual
    $("#contenido").find("span#c-titulo-"+archivo+", div#c-contenido-"+archivo).fadeIn(300);
    //Fix en mobil
    if ($(window).width() <= 720) {
			$(panelButton).click();
		}
  });
});