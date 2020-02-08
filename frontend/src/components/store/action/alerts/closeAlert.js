//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const closeAlert = () => {
  return {
    type: "CLOSE_ALERT"
  }
}

export default closeAlert;