/*
Importar archivos necesarios
*/
//Importar CSS AND IMG
import './../sass/news/main.sass';
import './../img/farvicon.png';
import './../img/logo.png';
import './../img/loading.svg';
//Importar jquery
import $ from 'jquery';
//Regenerator-Runtime async
import 'regenerator-runtime';
//Alertas
import {alerts} from './exports/alerts';
//Ajax
import {consultAjax, loadingAnimation} from './exports/ajaxPromise';


let src = [];
const showImg = document.getElementById('showImg');
const showDiv = document.getElementById('show');
//Main obtención de img
document.querySelectorAll('article section').forEach(section => {
  //Obtener lista de todas los items en footer
  const imgAndSpan = section.querySelectorAll('footer img, footer .more');
  //Obtener todas las imagenes
  const img = section.querySelectorAll('footer img');
  //Añadir evento a cada una
  imgAndSpan.forEach(element => {
    if (element.className === 'more') {
      element.addEventListener('click', () => {
        //Imagen siguiente
        const spanImg = img[3];

        //Mostrar el visor de imagenes
        $(showImg).fadeIn(200).css('display', 'flex');
        //Insertar imagen actual
        showDiv.innerHTML = `<img src='${spanImg.src}'/>`;
        //Bindear opciones
        src=[img, parseInt(spanImg.dataset.actual)];
      })
    } else {
      element.addEventListener('click', () => {
        //Mostrar el visor de imagenes
        $(showImg).fadeIn(200).css('display', 'flex');
  
        //Insertar imagen actual
        showDiv.innerHTML = `<img src='${element.src}'/>`;
        //Bindear opciones
        src=[img, parseInt(element.dataset.actual)];
        
      });
    }
  });
});

const showLeft = document.getElementById('showLeft');
showLeft.addEventListener('click', ()=>{
  //Verificar si existe un archivo anterior en el array
  if (src[0][src[1]-1]) {
    showLeft.style.display = 'inline-block';
    const imgAnt = src[0][src[1]-1].src;
    //Insertar imagen anterior
    showDiv.innerHTML = `<img src='${imgAnt}'/>`;
    src[1] = src[1]-1;
  }
});

const showRight = document.getElementById('showRight');
showRight.addEventListener('click', ()=>{
  //Verificar si existe un archivo posterior en el array
  if (src[0][src[1]+1]) {
    const imgAnt = src[0][src[1]+1].src;
    //Insertar imagen anterior
    showDiv.innerHTML = `<img src='${imgAnt}'/>`;
    src[1] = src[1]+1;
  }
});

const showDownload = document.getElementById('showImgDownload');
showDownload.addEventListener('click', () => {
  const url = src[0][src[1]].src;
  console.log(url);
});

// const imgShow = document.querySelectorAll("footer img, footer .more");
// imgShow.forEach(e=>{
//   e.addEventListener('click', ()=>{
//     showManagerImg(imgShow, e.dataset.actual);
//   });
// });

// //Obtener todos los img y guardarlos en un array.
//   // const imgShow = e.querySelectorAll("footer img");
//   // imgShow.forEach((e,i)=>{
//   //   src[i]=e.src;
//   // });
// const showImg = document.getElementById('showImg');
// function showManagerImg(src, actual) {
//   $(showImg).fadeIn(200);
//   //Variables
//   let imgSrc = src[actual].src;
//   const showDiv = document.getElementById('show');
//   const left = document.getElementById('showLeft');
//   const right = document.getElementById('showRight');
//   actual = parseInt(actual);

//   showDiv.innerHTML = `<img src='${imgSrc}' />`;
//   console.log(imgSrc);

//   if (src[actual+1]) {
//     right.style.display = 'inline-block';
//     right.addEventListener('click', ()=>{
//       console.log('x');
//     });
//   }else {
//     console.log(src[actual], actual+1);
//     right.style.display = 'none';
//   }
// }


const show = document.getElementById('showImgClose');
show.addEventListener('click', ()=>{
  $('#showImg').fadeOut(200);
});



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