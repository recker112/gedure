//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const responseUpdateMenuUser = (responseText) => {
  return {
    type: "RESPONSE_MENU_USER_DIALOG",
    payload: {
      message: responseText
    }
  }
}

export default responseUpdateMenuUser;