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

/* ************************ */
/* Funcion del selector estudiante/seccion de "configuración"
/* ************************ */
const selectConfigOption = document.querySelectorAll("#c-selectOption span");
selectConfigOption.forEach(element => {
  element.addEventListener('click', () => {
    const value = element.dataset.select;
    const input = document.querySelector("#c-selectOption input");
    
    input.value = value;

    //Disparar evento change
    const event = new Event('change');
    input.dispatchEvent(event);

    //Efecto activo/desactivo
    selectConfigOption.forEach(element => $(element).removeClass("active"));
    $(element).toggleClass("active");
  });
});

/* ************************ */
/* Funcion del evento change en el input hidden de "configuración"
/* ************************ */
const selectConfigOptionInput = document.querySelector("#c-selectOption input");
selectConfigOptionInput.addEventListener('change', () => {
  const value = selectConfigOptionInput.value;//Value
  const user = document.getElementById('c-user');//Input user
  const secGra = document.getElementById('c-secGra');//Input sección/grado
  const sec = document.getElementById('c-seccion');
  const grado = document.getElementById('c-grado');

  if (value === 'sec') {
    user.style.display = 'none';
    $(secGra).fadeIn(200);
    user.value = 'none';
    sec.value = '';
    grado.value = '';
  }else {
    secGra.style.display = 'none';
    $(user).fadeIn(200);
    user.value = '';
    sec.value = 'A';
    grado.value = '1';
  }
});

/* ************************ */
/* Funcion para el selector de "Borrar".
/* ************************ */
const selectBorrarOption = document.querySelectorAll("#bo-selectOption span");
selectBorrarOption.forEach(element => {
  element.addEventListener('click', () => {
    const value = element.dataset.select;
    const input = document.querySelector("#bo-selectOption input");

    input.value = value;

    //Efecto activo/desactivo
    selectBorrarOption.forEach(element => $(element).removeClass("active"));
    $(element).toggleClass("active");
  });
});

/* ************************ */
/* Funcion para el selector de "Borrar noticias".
/* ************************ */
const selectBorrarNoticiaOption = document.querySelectorAll("#boNot-selectOption span");
selectBorrarNoticiaOption.forEach(element => {
  element.addEventListener('click', () => {
    const value = element.dataset.select;
    const input = document.querySelector("#boNot-selectOption input");

    input.value = value;

    //Disparar evento change
    const event = new Event('change');
    input.dispatchEvent(event);

    //Efecto activo/desactivo
    selectBorrarNoticiaOption.forEach(element => $(element).removeClass("active"));
    $(element).toggleClass("active");
  });
});

/* ************************ */
/* Función para el evento change del input de "Borrar noticias".
/* ************************ */
const selectBorrarNoticiaInput = document.getElementById('boNot-option');
selectBorrarNoticiaInput.addEventListener('change', () => {
  const value = selectBorrarNoticiaInput.value;
  const inputID = document.getElementById('boNot-id');

  if (value === 'unsee') {
    $(inputID).fadeOut(200);
    inputID.value = "none";
  }else {
    $(inputID).fadeIn(200);
    inputID.value = "";
  }
});