//Se crea una acciรณn la cual serรก capturada
//por el reducer correspondiente.
const errorEmptyLogin = (input,message) => {
  return {
    type: "ERROR_LOGIN",
    payload: {
      input,
      message
    }
  }
}

export default errorEmptyLogin;