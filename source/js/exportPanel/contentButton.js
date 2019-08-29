//Importar jquery
import $ from 'jquery';
/*
Funcion del selector del contenido modificar
*/
const selectorModify = document.getElementById('m_selector_id');
selectorModify.addEventListener('change', () => {
  //Obtener valor del selector
  const selectData = selectorModify.value;
  //Seleccionar todos los form dentro de #c-contenido-modificar
  const queryForm = document.querySelectorAll('#c-contenido-modificar form');
  //Seleccionar el contenido a mostrar
  const selectForm = document.getElementById('form_modificar_'+selectData);
  queryForm.forEach(element => {
    if  (element === selectForm) {
      $(element).fadeIn(300).css('display', 'flex');
    }else {
      $(element).hide();
    }
  });
});

/*
Funcion del privilegio en modificar
*/
const selectorUser = document.getElementById('m_selector_user');
selectorUser.addEventListener('change', () => {
  //Privilegio
  const privilegioID = selectorUser.value;
  //Input user
  const user = document.getElementById('m_name_user')
  //Input pass
  const pass = document.getElementById('m_pass_user');
  //Selector (Insert, Update, Remove)
  const selectNot = document.querySelector('#form_modificar_user select#m_option_user');
  //Verificar privilegio
  if (privilegioID == 'V-') {
    //Obtener selects
    const select = document.querySelectorAll('#form_modificar_user .m-options select');
    select.forEach(element => {
      if (element !== selectNot) {
        element.value = '';
        $(element).fadeIn(300);
      }
    });
  }else {
    //Obtener selects
    const select = document.querySelectorAll('#form_modificar_user .m-options select');
    select.forEach(element => {
      if (element !== selectNot) {
        element.value = '1';
        $(element).fadeOut(300);
      }
    });
  }
  //Cambios en los inputs
  selectNot.value = 'INSERT';
  user.value = '';
  $(user).fadeIn(300);
  pass.value = '';
  $(pass).fadeIn(300);
});

/*
Funcion selector (Insert, Update, Remove)
*/
const selectOption = document.getElementById('m_option_user');
selectOption.addEventListener('change', () => {
  const selectOp = selectOption.value;
  //Input user
  const user = document.getElementById('m_name_user')
  //Input pass
  const pass = document.getElementById('m_pass_user');
  if (selectorUser.value === 'V-') {
    //Obtener selects
    const select = document.querySelectorAll('#form_modificar_user .m-options select');
    user.value = 'none';
    pass.value = 'none';
    if (selectOp === 'UPDATE') {
      $(user).fadeIn(300);
      $(pass).fadeOut(300);
      user.value = '';
      select.forEach(element => {
        if (element !== selectOption) {
          element.value = '';
          $(element).fadeIn(300);
        }
      });
    }else if (selectOp === 'INSERT') {
      $(user).fadeIn(300);
      $(pass).fadeIn(300);
      user.value = '';
      pass.value = '';
      select.forEach(element => {
        if (element !== selectOption) {
          element.value = '';
          $(element).fadeIn(300);
        }
      });
    }else if (selectOp === 'DELETE') {
      $(user).fadeOut(300);
      $(pass).fadeOut(300);
      select.forEach(element => {
        if (element !== selectOption) {
          element.value = '1';
          $(element).fadeOut(300);
        }
      });
    }
  }else {
    //Obtener selects
    const select = document.querySelectorAll('#form_modificar_user .m-options select');
    user.value = 'none';
    pass.value = 'none';
    if (selectOp === 'INSERT') {
      $(user).fadeIn(300);
      $(pass).fadeIn(300);
      user.value = '';
      pass.value = '';
    }else if(selectOp === 'UPDATE') {
      $(user).fadeIn(300);
      $(pass).fadeOut(300);
      user.value = '';
      pass.value = 'none';
    }else if (selectOp === 'DELETE') {
      $(user).fadeOut(300);
      $(pass).fadeOut(300);
    }
  }
});


/*
Funcion select configuracion
*/
const configSelector = document.getElementById('conf_selector');
configSelector.addEventListener('change', () => {
  //Selector
  const select = configSelector.value;
  //User
  const user = document.getElementById('n_user');
  //Grado
  const grado = document.getElementById('n_grado');
  //Seccion
  const seccion = document.getElementById('n_seccion');
  //Hidden
  const hiddenVal = document.getElementById('n_hidden');
  if (select === 'sec') {
    user.value = 'none';
    grado.value = '';
    seccion.value = '';
    $(user).hide();
		$(grado).fadeIn(200);
		$(seccion).fadeIn(200);
    hiddenVal.value = 'sec';
  }else {
    grado.value = '1G';
    seccion.value = 'A';
    user.value = '';
    $(grado).hide();
		$(seccion).hide();
		$(user).fadeIn(200);
    hiddenVal.value = 'estu';
  }
});

//FIX FLEX!!! !Hace que las cajas regresen a flex con la funcion fadeIn y no a block, como lo hace normalmente
$("#form_modificar_prof, #form_modificar_block").hide();