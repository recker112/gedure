//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const loginSinceIndex = (status) => {
  return {
    type: "LOGIN_SINCE_INDEX",
    payload: status
  }
}

export default loginSinceIndex;