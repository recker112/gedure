//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const reloginSuccess = (redirect) => {
  return {
    type: "RELOGIN_SUCCESS",
    payload: redirect
  }
}

export default reloginSuccess;