//Se crea una acción la cual será capturada
//por el reducer correspondiente.
const updateInfoInput = (inputValue) => {
  return {
    type: "UPDATE_INFO_INPUT",
    payload: inputValue
  }
}

export default updateInfoInput;