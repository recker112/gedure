//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const updateDataUser = (valor) => {
  return {
    type: "UPDATE_DATA_USER",
    payload: valor
  }
}

export default updateDataUser;