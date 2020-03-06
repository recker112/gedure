//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const verifyEmpty = (inputValue) => {
  return {
    type: "VERIFY_EMPTY",
    payload: inputValue
  }
}

export default verifyEmpty;