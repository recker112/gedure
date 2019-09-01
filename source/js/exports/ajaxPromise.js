export const loadingAnimation = ($, btn, loading, status='normal') => {
  //Verificar si hay que invertir
  if (status=='normal') {
    $(btn).hide();
    $(loading).fadeIn(450);
  }else {
    $(loading).hide();
    $(btn).css("transition", "0").fadeIn(450);
  }
}

export const consultAjax = async (consult, data=false) => {
  try {
    //Parametros del ajax
    let initFetch;
    if (data){
      initFetch = {
        method: 'POST',
        body: data,
        headers: new Headers()
      }
    }else {
      initFetch = {
        method: 'POST',
        headers: new Headers()
      }
    }
    //Realizar ajax
    let resAjax = await fetch(consult, initFetch);
    //Variable del resultado
    let res;

    //Verificar estatus
    if (resAjax.ok) {
      //Obtener resultado
      await resAjax.json().then(result => {
        res = result;
      });
      //Regresar resultado
      return res;
    }else {
      //Error al no encontrar el archivo
      throw 'no_connect_file_php';
    }
  } catch (e) {
    //Regresar error
    return e;
  }
}
