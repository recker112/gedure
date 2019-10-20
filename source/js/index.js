//JQUERY
import $ from 'jquery';
/*
Importar archivos necesarios
*/
//SASS
import './../sass/index/main.sass';

//IMG
import './../img/farvicon.png';
import './../img/logo.png';
import './../img/loading.svg';
import './../img/fondo1.jpg';
import './../img/fondo2.jpg';
import './../img/fondo3.jpg';
import './../img/fondo4.jpg';
import './../img/fondo5.jpg';
import './../img/fondo6.jpg';
import './../img/fondo7.jpg';
import './../img/fondo8.jpg';


const slideshow = document.querySelector('#plaga');

setInterval(()=>{
  let i = 0;
  let num = getRandomInt(0,8);

  slideshow.querySelectorAll('img').forEach(element => {
    if(i == num) {
      $(element).removeClass('sliderShow-noview');
    }else {
      $(element).addClass('sliderShow-noview');
    }
    i++;
  });
}, 30000);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}