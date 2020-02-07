//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const updateAuth = (status) => {
  return {
    type: "UPDATE_AUTH",
    payload: status,
  }
}

export default updateAuth;