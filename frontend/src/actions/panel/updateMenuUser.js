//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const updateMenuUser = (open,option) => {
  return {
    type: "UPDATE_MENU_USER_DIALOG",
    payload: {
      open,
      option,
    }
  }
}

export default updateMenuUser;