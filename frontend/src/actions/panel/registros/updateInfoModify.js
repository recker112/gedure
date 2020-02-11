//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const updateInfoModify = (value) => {
  return {
    type: "UPDATE_INFO_MODIFY",
    payload: value
  }
}

export default updateInfoModify;