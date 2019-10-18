//Importar jquery
import $ from 'jquery';
/* ************************ */
/* Función del selector ubicado en news
/* ************************ */
const mobile_selectDivsitosito = document.querySelectorAll("#mobile-selectDiv span");
mobile_selectDivsitosito.forEach(element => {
  element.addEventListener('click', () => {
    const value = element.dataset.select;
    const input = document.querySelector("#mobile-selectDiv input");

    input.value = value;

    //Disparar evento change
    const event = new Event('change');
    input.dispatchEvent(event);

    //Efecto activo/desactivo
    mobile_selectDivsitosito.forEach(element => $(element).removeClass("active"));
    $(element).toggleClass("active");
  });
});

/* ************************ */
/* Función del evento CHANGE en el input del selec DIVsito
/* ************************ */
const mobile_selectDivInput = document.getElementById('mobile-inputSelect');
mobile_selectDivInput.addEventListener('change', () => {
  const value = mobile_selectDivInput.value;

  if (value === 'anuncitos') {
    document.getElementById('NEWS-article').style.display = 'none';
    document.getElementById('NEWS-aside').style.display = 'flex';
  }else {
    document.getElementById('NEWS-article').style.display = 'block';
    document.getElementById('NEWS-aside').style.display = 'none';
  }
});