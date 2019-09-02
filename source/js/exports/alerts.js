//Importar jquery
import $ from 'jquery';

export const alerts = (message, status, time=5000, Ahide=true) => {
  let areaAlert = document.querySelector('#areaAlert');
  $(areaAlert).append(`<div class="alert ${status}">
  <p class="aMessage">${message}</p>
  <span class="aClose">X</span>
  </div>`);
  /*
  Efecto FadeIn
  */
  const alertList = document.querySelectorAll(".alert");
  if (Ahide) {
    alertList.forEach((element,index,array)=>{
      if (index==(alertList.length - 1)) {
        $(element).css("display", "none").fadeIn(200);
        setTimeout(()=>{
          $(element).fadeOut(200);
        }, time);
        element.querySelector('.aClose').addEventListener('click', () => {
          $(element).fadeOut(200);
        });
      }
    });
  }else{
    alertList.forEach((element,index,array)=>{
      if (index==(alertList.length - 1)) {
        $(element).css("display", "none").fadeIn(200);
        element.querySelector('.aClose').addEventListener('click', () => {
          $(element).fadeOut(200);
        });
      }
    });
  }
}