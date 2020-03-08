export function verifyDataPassword(passA, passN, passR, errorInfo) {
  let error = false;

  //Verificar datos
  if (passA === passN) {
    //Contraseña repetida
    errorInfo("passN", "Contraseña actual es igual al la nueva", "PASSWORD");
    error = true;
  }

  if (passN !== passR) {
    //Contraseña repetida
    errorInfo("passR", "La contraseña no coincide", "PASSWORD");
    error = true;
  }

  [{
    value: passA,
    name: "passA"
  }, {
    value: passN,
    name: "passN"
  }, {
    value: passR,
    name: "passR"
  },].map((input) => {
    if (input.value.length === 0) {
      //Empty
      errorInfo(input.name, "Campo obligatorio", "PASSWORD");
      error = true;
    }
    else if (input.value.length < 4) {
      //NO VALIDO
      errorInfo(input.name, "No válido", "PASSWORD");
      error = true;
    }
    return null;
  });

  return error;
}


export function verifyDataAvatar(file,errorInfo, enqueueSnackbar) {
  let error = false;

  //Verificar datos
  if (file.length === 0) {
    //No upload file
    enqueueSnackbar('Debe cargar algún archivo primero', {
      variant: 'warning'
    });
    error = true;
  }

  return error;
}