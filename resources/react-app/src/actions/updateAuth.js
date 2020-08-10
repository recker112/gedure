//Se crea una acciรณn la cual serรก capturada
//por el reducer correspondiente.
const updateAuth = (payload) => {
  return {
    type: "AUTH_UPDATE",
    payload: payload
  }
}

export default updateAuth;
