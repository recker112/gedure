//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const authUpdate = (payload) => {
  return {
    type: "AUTH_UPDATE",
    payload: payload
  }
}

export default authUpdate;
