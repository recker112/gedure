//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const Mmobile = (valor) => {
  return {
    type: "MOBILE_MODE",
    payload: valor
  }
}

export default Mmobile;