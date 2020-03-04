//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const updateUploadOption = (value) => {
  return {
    type: "UPDATE_INFO_INPUT_UPLOAD",
		payload: value
  }
}

export default updateUploadOption;