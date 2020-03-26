export const consultAjax = async (consult, data=false) => {
  try {
    /*
		//Parametros del ajax
    let initFetch;
    if (data){
      initFetch = {
        method: 'POST',
        body: data
      }
    }else {
      initFetch = {
        method: 'POST'
      }
    }
		*/
    //Realizar ajax
    let resAjax = await fetch(consult);
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
      return 'no_connect';
    }
  } catch (e) {
    //Regresar error
    return e;
  }
}