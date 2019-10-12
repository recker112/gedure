//Importar jquery
import $ from 'jquery';
/* ************************ */
/* Funcion del selector del contenido
/* ************************ */
const selectorDivModifi = document.querySelectorAll("#c-contenido-modificar .window span");
selectorDivModifi.forEach(element => {
  element.addEventListener("click", () => {
    const selector = element.dataset.select;
    const boxUser = document.getElementById("m-divUser");
    const boxProf = document.getElementById("m-divProf");

    
    if (selector === 'prof') {
      boxUser.style.display = 'none';
      boxProf.style.display = 'block';
    }else {
      boxUser.style.display = 'block';
      boxProf.style.display = 'none';
    }

    //Efecto activo/desactivo
    selectorDivModifi.forEach(element => $(element).removeClass("active"));
    $(element).toggleClass("active");
  });
});

/* ************************ */
/* Funcion del selector del privilegio
/* ************************ */
const selectorModify = document.querySelectorAll('#selectU span');
selectorModify.forEach(element => {
  element.addEventListener("click", () => {
    document.querySelector("#selectU input").value = element.dataset.selector;

    //ejecutar evento CHANGE
    const event = new Event('change');
    document.querySelector('#m-SeletorU').dispatchEvent(event);

    //Efecto activo/desactivo
    selectorModify.forEach(element => $(element).removeClass("active"));
    $(element).toggleClass("active");
  });
});

/* ************************ */
/* Funcion del evento change en los privilegios
/* ************************ */
const selectorModifyInput = document.querySelector('#m-SeletorU');
selectorModifyInput.addEventListener('change', () => {
  const value = selectorModifyInput.value;

  //Obtener selects
  const selects = document.getElementById('m-selectsU');
  const curso = document.getElementById('m-gradoU');
  const seccion = document.getElementById('m-seccionU');

  //Acciones
  if (value === 'V-') {
    curso.value = '';
    seccion.value = '';
    $(selects).fadeIn(200);
  }else {
    $(selects).fadeOut(200);
    curso.value = '1';
    seccion.value = '1';
  }

  //Disparar evento para el selector de opciones
  document.getElementById('m-selectInsert').click();
});

/* ************************ */
/* Funcion del selector del selector de opciones
/* ************************ */
const selectorModifyOptions = document.querySelectorAll('#m-selectsOp span');
selectorModifyOptions.forEach(element => {
  element.addEventListener("click", () => {
    document.querySelector("#m-selectsOp input").value = element.dataset.selector;

    //ejecutar evento CHANGE
    const event = new Event('change');
    document.querySelector('#m-selectsOp input').dispatchEvent(event);

    //Efecto activo/desactivo
    selectorModifyOptions.forEach(element => $(element).removeClass("active"));
    $(element).toggleClass("active");
  });
});

/* ************************ */
/* Funcion del evento change en las opciones
/* ************************ */
const selectorModifyOptionsInput = document.getElementById('m-selectOptionsU');
selectorModifyOptionsInput.addEventListener('change', () => {
  const value = selectorModifyOptionsInput.value;
  const privilegio = selectorModifyInput.value;

  //Obtener selects
  const pass = document.getElementById('m-PassU');
  const name = document.getElementById('m-NombreU');

  //Acciones
  if (value === 'INSERT') {
    name.value = '';
    pass.value = '';
    $(name).fadeIn(200);
    $(pass).fadeIn(200);
  }else if (value === 'UPDATE') {
    name.value = '';
    pass.value = 'none';
    $(name).fadeIn(200);
    $(pass).fadeOut(200);
  }else {
    name.value = 'none';
    pass.value = 'none';
    $(name).fadeOut(200);
    $(pass).fadeOut(200);
  }
});

// /*
// Funcion select configuracion
// */
// const configSelector = document.getElementById('conf_selector');
// configSelector.addEventListener('change', () => {
//   //Selector
//   const select = configSelector.value;
//   //User
//   const user = document.getElementById('n_user');
//   //Grado
//   const grado = document.getElementById('n_grado');
//   //Seccion
//   const seccion = document.getElementById('n_seccion');
//   //Hidden
//   const hiddenVal = document.getElementById('n_hidden');
//   if (select === 'sec') {
//     user.value = 'none';
//     grado.value = '';
//     seccion.value = '';
//     $(user).hide();
// 		$(grado).fadeIn(200);
// 		$(seccion).fadeIn(200);
//     hiddenVal.value = 'sec';
//   }else {
//     grado.value = '1G';
//     seccion.value = 'A';
//     user.value = '';
//     $(grado).hide();
// 		$(seccion).hide();
// 		$(user).fadeIn(200);
//     hiddenVal.value = 'estu';
//   }
// });

// //FIX FLEX!!! !Hace que las cajas regresen a flex con la funcion fadeIn y no a block, como lo hace normalmente
// $("#form_modificar_prof, #form_modificar_block").hide();