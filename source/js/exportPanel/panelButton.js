//Importar Jquery
import $ from 'jquery';
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
      marginLeft: "0px"
    }, 400);
  }else {
    $("#panel").animate({
      left: "0px"
    }, 400, () => contadorP=0);
    if ($(window).width() > 720) {
      $("#contenido").animate({
        marginLeft: "248px"
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
    $("#contenido").find("div#c-contenido-"+archivo).fadeIn(300);
    //Fix en mobil
    if ($(window).width() <= 720) {
			$(panelButton).click();
		}
  });
});